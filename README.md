# web-file-selector

封装了在浏览器中选择文件并获取特定格式的一个类 FileSelector。

## 安装

` npm i web-file-selector -S`

## 使用

```
  import FileSelector from "web-file-selector";

  let fileSelector = new WebFileSelector({ accept: "image/gif,image/jpeg,image/jpg,image/png", maxSize: 2, multiple: true });
  fileSelector
    .on("oversize-error", (error) => {
      console.log(error.message || "文件大小超出了");
    })
    .on("file-type-error", (error) => {
      console.log(error.message || "文件类型有误");
    })
    .once("select-file-success", (file) => {
      fileSelector.getFileInArrayBuffer().then((data) => {
        console.log(data[0]);
      });
    })
    .selectFile();
    
   fileSelector.setAccept("image/gif").setMaxSize(8).setCapture(true).setMultiple(false);

```

## 可运行示例

见./test/test.html;

## 文档

[Documentation generated from source files by Typedoc](./docs/README.md).
