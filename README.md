# web-file-selector

封装了在浏览器中选择文件并获取特定格式的一个类 FileSelector。

## 安装

```bash
npm i web-file-selector -S
```

## 快速开始

```js
import WebFileSelector from "web-file-selector";

const fileSelector = new WebFileSelector({
  accept: "image/gif,image/jpeg,image/jpg,image/png",
  maxSize: 2,
  multiple: false,
});

fileSelector
  .on("oversize-error", (error, file) => {
    console.log(error.message);
  })
  .on("file-type-error", (error, file) => {
    console.log(error.message);
  })
  .once("select-file-success", (file) => {
    fileSelector.getFileInArrayBuffer().then((data) => {
      console.log(data[0]);
    });
  })
  .selectFile();
```

## 配置选项

构造 `WebFileSelector` 时支持的选项：

| 选项 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `accept` | `string` | 允许的文件 MIME 类型，支持通配符 `*/*`，多个用逗号分隔 | `"image/*,application/pdf"` |
| `acceptedFileExtensions` | `string` | 允许的文件扩展名，用于 `File.type` 为空时的补充校验 | `".pdf,.doc,.docx"` |
| `maxSize` | `number` | 文件大小上限，单位 MB | `8` |
| `multiple` | `boolean` | 是否允许多选 | `false` |
| `capture` | `string \| boolean` | 调用摄像头/麦克风，移动端生效 | `"user"` |
| `overSizeErrorText` | `string` | 文件超大时的自定义错误提示 | - |
| `fileTypeErrorText` | `string` | MIME 类型校验失败时的自定义错误提示 | - |
| `fileExtensionErrorText` | `string` | 扩展名校验失败时的自定义错误提示 | - |

### 通配符支持

`accept` 支持通配符写法，例如 `image/*` 会匹配 `image/jpeg`、`image/png`、`image/gif` 等所有 image 类型。

```js
const fileSelector = new WebFileSelector({
  accept: "image/*",
  maxSize: 2,
});
```

## 方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `selectFile()` | `this` | 打开文件选择框 |
| `setAccept(accept)` | `this` | 动态设置允许的文件类型 |
| `setAcceptedFileExtensions(extensions)` | `this` | 动态设置允许的扩展名 |
| `setMaxSize(maxSize)` | `this` | 动态设置文件大小限制 |
| `setMultiple(multiple)` | `this` | 动态设置是否多选 |
| `setCapture(capture)` | `this` | 动态设置 capture |
| `getFileInBlob()` | `Promise<Blob[]>` | 获取选中的文件列表 |
| `getFileInDataUrl(files?)` | `Promise<string[]>` | 读取为 Data URL |
| `getFileInBinaryString(files?)` | `Promise<string[]>` | 读取为二进制字符串 |
| `getFileInArrayBuffer(files?)` | `Promise<ArrayBuffer[]>` | 读取为 ArrayBuffer |
| `getFileInText(files?)` | `Promise<string[]>` | 读取为文本 |
| `destroy()` | `void` | 销毁内部 input 节点 |

## 事件

所有事件都通过 `.on(eventName, callback)` 注册。

| 事件名 | 回调参数 | 触发时机 |
| --- | --- | --- |
| `select-file-success` | `(file)` | 单个文件通过所有校验 |
| `select-file-end` | `(files)` | 所有选中文件处理完毕 |
| `file-type-error` | `(error, file)` | `accept` MIME 类型校验失败 |
| `file-extension-error` | `(error, file)` | `acceptedFileExtensions` 扩展名校验失败 |
| `oversize-error` | `(error, file)` | 文件大小超过 `maxSize` |

## 按扩展名校验

因为浏览器和系统无法识别所有软件开发的文件格式，因此一些特殊软件开发的特殊的文件格式的文件在操作系统或浏览器中无法被正确识别，导致 `File.type` 为空字符串，此时如果想简单通过扩展名来校验可以参考此。

```js
const fileSelector = new WebFileSelector({
  acceptedFileExtensions: ".pdf,.doc,.docx",
  maxSize: 8,
});

fileSelector
  .on("file-extension-error", (error, file) => {
    console.log(error.message || "文件扩展名有误");
  })
  .on("select-file-success", (file) => {
    console.log("validFile:", file.name, file.size, file.type);
  })
  .selectFile();
```

## MIME + 扩展名同时校验

当 `accept` 和 `acceptedFileExtensions` 同时配置时，两者都会校验，任一不通过即拒绝。

```js
const fileSelector = new WebFileSelector({
  accept: "image/png",
  acceptedFileExtensions: ".pdf",
  maxSize: 8,
});

fileSelector
  .on("file-type-error", (error, file) => {
    console.log("MIME 类型校验失败:", error.message);
  })
  .on("file-extension-error", (error, file) => {
    console.log("扩展名校验失败:", error.message);
  })
  .selectFile();
```

## 多文件选择与分类

```js
const fileSelector = new FileSelector({
  accept: "image/gif,image/jpeg,image/jpg,image/png",
  maxSize: 2,
  multiple: true,
});

const invalidFileList = [];
const validFileList = [];
let allSelectFileList = [];

fileSelector
  .on("oversize-error", (error, file) => {
    invalidFileList.push(file);
    console.log("invalidFile:", file.name, file.size, file.type);
  })
  .on("file-type-error", (error, file) => {
    invalidFileList.push(file);
    console.log("invalidFile:", file.name, file.size, file.type);
  })
  .on("select-file-success", (file) => {
    validFileList.push(file);
    console.log("validFile:", file.name, file.size, file.type);
    fileSelector.getFileInArrayBuffer([file]).then((data) => {
      console.log(data[0]);
    });
  })
  .once("select-file-end", (files) => {
    allSelectFileList = files;
    console.log("allSelectFileList", allSelectFileList);
    console.log("invalidFileList", invalidFileList);
    console.log("validFileList", validFileList);
  })
  .selectFile();
```

## Playground

在线体验地址：[GitHub Pages](https://wxwzl.github.io/web-file-selector/)

本地预览：

```bash
pnpm run playground
```

## 注意事项

- 建议将 `image/jpeg`、`image/jpg` 这两种格式同时允许或同时不允许，因为两者格式在电脑上常常出现名字是 jpg 实际上是 jpeg 格式
- 在部分 Android 手机系统不支持同时多选文件，这是受系统限制的，不是包问题
- 包内部采用了 HTML 原生的 `<input type="file" />` 标签访问文件系统，能否访问到文件取决于当前系统和浏览器的兼容性、权限等问题
- `capture` 属性在桌面浏览器上通常只会弹出文件选择框，不会直接调用摄像头；请在移动设备或支持 capture 的浏览器上测试拍照/录像功能

## 文档

[Documentation generated from source files by Typedoc](./docs/README.md).

## 浏览器兼容性

### 支持矩阵

| 浏览器 | 最低版本 | 支持状态 | 备注 |
| --- | --- | --- | --- |
| Chrome | 49+ | 完整支持 | - |
| Firefox | 45+ | 完整支持 | - |
| Safari | 9+ | 完整支持 | - |
| Edge | 12+ | 完整支持 | 新版 Chromium Edge 全部支持 |
| IE | 11 | 需 polyfill | 语法可运行，但需补充 Promise 等 polyfill |
| IE | 10 | 有限支持 | 需 polyfill，且部分功能可能受限 |
| IE | 9 及以下 | 不支持 | 缺少 File API |

### IE 兼容说明

当前打包产物由 `tsconfig.json` 的 `target: "es5"` 生成，语法层面可在 IE 11 运行，但代码中使用了以下现代 API，需要额外引入 polyfill：

- `Promise`
- `Array.prototype.includes`
- `String.prototype.startsWith`
- `String.prototype.endsWith`

例如通过 CDN 引入 `core-js`：

```html
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3/minified.js"></script>
```

或在项目中使用 `@babel/preset-env` + `core-js` 按需注入。

### 关键 API 依赖

本库依赖浏览器的以下原生 API：

| API | IE 支持情况 |
| --- | --- |
| `<input type="file">` | IE 9+ |
| `FileReader` | IE 10+ |
| `File` / `FileList` | IE 10+ |
| `Promise` | 不支持 |
| `Array.prototype.includes` | 不支持 |
| `String.prototype.startsWith` / `endsWith` | 不支持 |
