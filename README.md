# web-file-selector

封装了在浏览器中选择文件并获取特定格式的一个类 FileSelector。

## 安装

`npm i web-file-selector -S`

## 使用

```js
import WebFileSelector from "web-file-selector";

let fileSelector = new WebFileSelector({
  accept: "image/gif,image/jpeg,image/jpg,image/png",
  maxSize: 2,
  multiple: false,
});
fileSelector
  .on("oversize-error", (error, file) => {
    console.log(error.message || "文件大小超出了");
  })
  .on("file-type-error", (error, file) => {
    console.log(error.message || "文件类型有误");
  })
  .once("select-file-success", (file) => {
    fileSelector.getFileInArrayBuffer().then((data) => {
      console.log(data[0]);
    });
  })
  .selectFile();

fileSelector
  .setAccept("image/gif")
  .setMaxSize(8)
  .setCapture(true)
  .setMultiple(false);
```

## 按扩展名校验

因为浏览器和系统无法识别所有软件开发的文件格式，因此一些特殊软件开发的特殊的文件格式的文件在操作系统或浏览器中无法被正确识别，导致 `File.type` 为空字符串，此时如果想简单通过扩展名来校验可以参考此。

```js
let fileSelector = new WebFileSelector({
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

```js
let fileSelector = new WebFileSelector({
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
let fileSelector = new FileSelector({
  accept: "image/gif,image/jpeg,image/jpg,image/png",
  maxSize: 2,
  multiple: true,
});

let invalidFileList = [];
let validFileList = [];
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

在线体验地址：[GitHub Pages](https://wxwzl.github.io/web-file-selector/playground/)

本地预览：

```bash
pnpm run playground
```

## 注意事项

- 建议将 `image/jpeg`、`image/jpg` 这两种格式同时允许或同时不允许，因为两者格式在电脑上常常出现名字是 jpg 实际上是 jpeg 格式。
- 在部分 Android 手机系统不支持同时多选文件，这是受系统限制的，不是包问题。
- 包内部采用了 HTML 原生的 `<input type="file" />` 标签访问文件系统，能否访问到文件取决于当前系统和浏览器的兼容性、权限等问题。
- `capture` 属性在桌面浏览器上通常只会弹出文件选择框，不会直接调用摄像头；请在移动设备或支持 capture 的浏览器上测试拍照/录像功能。

## 文档

[Documentation generated from source files by Typedoc](./docs/README.md).
