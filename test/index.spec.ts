/**
 * @jest-environment jsdom
 */
import WebFileSelector from "../src/index";

test("selectFile", () => {
  let fileSelector = new WebFileSelector({
    accept: "image/gif,image/jpeg,image/jpg,image/png",
    maxSize: 2,
  });
  fileSelector
    .on("oversize-error", (error, file) => {
      console.log(error.message || "文件大小超出了", file);
    })
    .on("file-type-error", (error, file) => {
      console.log(error.message || "文件类型有误", file);
    })
    .once("select-file-success", (file) => {
      fileSelector.getFileInArrayBuffer().then((data) => {
        console.log(data[0]);
      });
    })
    .selectFile();
});

test("acceptedFileExtensions validates by extension", () => {
  const fileSelector = new WebFileSelector({
    acceptedFileExtensions: ".pdf,.doc,.docx",
  });
  const successSpy = jest.fn();
  const errorSpy = jest.fn();

  fileSelector
    .on("select-file-success", successSpy)
    .on("file-extension-error", errorSpy);

  // MIME type empty, extension matches
  fileSelector["files"] = [new File([""], "report.PDF", { type: "" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);

  expect(successSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy).toHaveBeenCalledTimes(0);

  // MIME type empty, extension does not match
  fileSelector["files"] = [new File([""], "report.xls", { type: "" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);

  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy.mock.calls[0][0].message).toContain("文件后缀只允许为");
});

test("accept and acceptedFileExtensions both validated", () => {
  const fileSelector = new WebFileSelector({
    accept: "image/png",
    acceptedFileExtensions: ".pdf",
  });
  const successSpy = jest.fn();
  const fileTypeErrorSpy = jest.fn();
  const fileExtensionErrorSpy = jest.fn();

  fileSelector
    .on("select-file-success", successSpy)
    .on("file-type-error", fileTypeErrorSpy)
    .on("file-extension-error", fileExtensionErrorSpy);

  // fails accept (type is empty), so file-type-error should fire
  fileSelector["files"] = [new File([""], "doc.pdf", { type: "" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);
  expect(fileTypeErrorSpy).toHaveBeenCalledTimes(1);
  expect(fileExtensionErrorSpy).toHaveBeenCalledTimes(0);

  // passes accept (image/png), fails extension
  fileSelector["files"] = [new File([""], "image.png", { type: "image/png" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);
  expect(fileExtensionErrorSpy).toHaveBeenCalledTimes(1);

  // passes both
  fileSelector["files"] = [new File([""], "doc.pdf", { type: "image/png" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);
  expect(successSpy).toHaveBeenCalledTimes(1);
});

test("setAcceptedFileExtensions updates validation", () => {
  const fileSelector = new WebFileSelector({});
  fileSelector.setAcceptedFileExtensions(".jpg");

  const errorSpy = jest.fn();
  fileSelector.on("file-extension-error", errorSpy);

  fileSelector["files"] = [new File([""], "pic.png", { type: "" })];
  (fileSelector as any).onChange({ target: { files: fileSelector["files"] } } as any);

  expect(errorSpy).toHaveBeenCalledTimes(1);
});
