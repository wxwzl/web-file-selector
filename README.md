# web-file-selector

封装了在浏览器中选择文件并获取特定格式的一个类 FileSelector。

## 安装

`npm i web-file-selector -S`

## 使用

```
  import WebFileSelector from "web-file-selector";


  let fileSelector = new WebFileSelector({ accept: "image/gif,image/jpeg,image/jpg,image/png", maxSize: 2, multiple: false });
  fileSelector
    .on("oversize-error", (error,file) => {
      console.log(error.message || "文件大小超出了");
    })
    .on("file-type-error", (error,file) => {
      console.log(error.message || "文件类型有误");
    })
    .once("select-file-success", (file) => {
      fileSelector.getFileInArrayBuffer().then((data) => {
        console.log(data[0]);
      });
    })
    .selectFile();

   fileSelector.setAccept("image/gif").setMaxSize(8).setCapture(true).setMultiple(false);


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
          .once("select-file-success", (file) => {
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

## 可运行示例

见./test/test.html;

## 注意事项

- 建议将 image/jpeg,image/jpg，这两种格式同时允许或同时不允许，因为两者格式在电脑上常常出现名字是 jpg 实际上是 jpeg 格式。
- 在部分 android 手机系统不支持同时多选文件，这是受系统限制的，不是包问题。
- 包内部是采用了 HTML 原生的 `<input type="file" />` 标签访问文件系统，能否访问到文件取决于当前系统和浏览器的兼容性、权限等问题。

## 文档

[Documentation generated from source files by Typedoc](./docs/README.md).
