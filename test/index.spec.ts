/**
 * @jest-environment jsdom
 */
 import WebFileSelector from "../src/index";
 test("selectFile", () => {
    let fileSelector = new WebFileSelector({ accept: "image/gif,image/jpeg,image/jpg,image/png", maxSize: 2 });
    fileSelector
      .on("oversize-error", (error,file) => {
        console.log(error.message || "文件大小超出了",file);
      })
      .on("file-type-error", (error,file) => {
        console.log(error.message || "文件类型有误",file);
      })
      .once("select-file-success", (file) => {
        fileSelector.getFileInArrayBuffer().then((data) => {
          console.log(data[0]);
        });
      })
      .selectFile()
 });
