import EventEmitter from "@wxwzl/eventemitter";

export interface Options {
  /**
   *  Defines the max size of file that can be selected.uint:MB
   */
  maxSize?: number;
  /**
   * Defines the text which can be show when the selected file's size is oversize.
   */
  overSizeErrorText?: string;
  /**
   * Defines the text which can be show when the selected file's type is wrong.
   */
  fileTypeErrorText?: string;
  /**
   * Defines accepted file types. It's a comma-separated list of file
   * extensions, mime-types or unique file type specifiers.
   *
   * https://developer.mozilla.org/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
   *
   * @example ```js
   * "image/*,video/*,.pdf,.doc,.docx,.xls"
   * ```
   */
  accept?: string;
  /**
   * Defines accepted file extensions. It's a comma-separated list of
   * file extensions (each starts with a dot). Used when the browser or
   * system cannot identify the file's MIME type and leaves `File.type`
   * empty.
   *
   * @example ```js
   * ".pdf,.doc,.docx"
   * ```
   */
  acceptedFileExtensions?: string;
  /**
   * Defines the text which can be show when the selected file's
   * extension is not in the accepted list.
   */
  fileExtensionErrorText?: string;
  /**
   * Allow multiple files selection.
   */
  multiple?: boolean;
  /**
   * Combined with `accept` property it specifies which camera to use for
   * capture of image or video. It was previously a Boolean value.
   */
  capture?: string | boolean;
}
const defaultConfig: Options = {
  maxSize: 8,
  multiple: false,
};
export default class WebFileSelector extends EventEmitter {
  public inputNode!: HTMLInputElement & {
    capture?: boolean | string;
  };
  public option: Options;
  private files: any;
  private acceptTypes: Array<string> = [];
  private acceptedFileExtensions: Array<string> = [];
  private overSizeErrorText = "";
  private fileTypeErrorText = "";
  private fileExtensionErrorText = "";
  constructor(option: Options = defaultConfig) {
    super();
    this.option = option;
    this.createInputElement();

    this.setAccept(option.accept);
    this.setAcceptedFileExtensions(option.acceptedFileExtensions);

    if (!this.option.overSizeErrorText) {
      this.overSizeErrorText = `上传的文件大小不能超过 ${this.option.maxSize}MB!`;
    } else {
      this.overSizeErrorText = this.option.overSizeErrorText;
    }
    if (!this.option.fileTypeErrorText) {
      this.fileTypeErrorText = `文件类型只允许为：${this.option.accept}`;
    } else {
      this.fileTypeErrorText = this.option.fileTypeErrorText;
    }
    if (!this.option.fileExtensionErrorText) {
      this.fileExtensionErrorText = `文件后缀只允许为：${this.option.acceptedFileExtensions}`;
    } else {
      this.fileExtensionErrorText = this.option.fileExtensionErrorText;
    }
  }
  private createInputElement() {
    this.inputNode = document.createElement("input");
    this.inputNode.style.display = "none";
    this.inputNode.type = "file";
    this.inputNode.capture = this.option.capture as string;
    this.inputNode.multiple = this.option.multiple ? true : false;
    this.inputNode.onchange = this.onChange.bind(this);
    document.body.appendChild(this.inputNode);
  }
  private onChange(event: Event) {
    this.files = (event.target as any).files;
    this.walkFiles((file) => {
      this.checkFile(file);
    });
    this.emit("select-file-end", this.files);
  }
  walkFiles(callBack: (file: File) => boolean | void, context?: any) {
    const array = this.files;
    const len = array.length;
    for (let i = 0; i < len; i++) {
      const stop: boolean | void = callBack && callBack.call(context, array[i]);
      if (stop) {
        return;
      }
    }
  }
  checkFile(file: File) {
    if (this.option.maxSize) {
      const isLt8M = file.size / 1024 / 1024 <= this.option.maxSize;
      if (!isLt8M) {
        this.emitError("oversize-error", this.overSizeErrorText, file);
        return false;
      }
    }
    if (this.option.accept && !this.acceptTypes.includes(file.type)) {
      this.emitError("file-type-error", this.fileTypeErrorText, file);
      return false;
    }
    if (
      this.acceptedFileExtensions.length > 0 &&
      !this.acceptedFileExtensions.includes(this.getFileExtension(file.name))
    ) {
      this.emitError(
        "file-extension-error",
        this.fileExtensionErrorText,
        file
      );
      return false;
    }
    this.emit("select-file-success", file);
    return true;
  }
  emitError(eventName: string, errMsg: string = "", ...rest: Array<any>) {
    this.emit(eventName, new Error(errMsg), ...rest);
    return this;
  }

  public selectFile() {
    this.inputNode.value = "";
    setTimeout(() => {
      this.inputNode.click();
    }, 0);
    return this;
  }
  setAccept(accept: string | undefined) {
    this.inputNode.accept = accept || "";
    if (accept) {
      this.option.accept = accept;
      this.acceptTypes = accept.replace(/\s/g, "").split(",");
      if (!this.option.fileTypeErrorText) {
        this.fileTypeErrorText = `文件类型只允许为：${this.option.accept}`;
      }
    }
    return this;
  }
  private getFileExtension(fileName: string): string {
    const dotIndex = fileName.lastIndexOf(".");
    return dotIndex === -1 ? "" : fileName.slice(dotIndex).toLowerCase();
  }
  setAcceptedFileExtensions(extensions: string | undefined) {
    if (extensions) {
      this.option.acceptedFileExtensions = extensions;
      this.acceptedFileExtensions = extensions
        .replace(/\s/g, "")
        .split(",")
        .map((ext) => ext.toLowerCase());
      if (!this.option.fileExtensionErrorText) {
        this.fileExtensionErrorText = `文件后缀只允许为：${this.option.acceptedFileExtensions}`;
      }
    }
    return this;
  }

  setMultiple(multiple: boolean) {
    this.option.multiple = multiple;
    this.inputNode.multiple = multiple;
    return this;
  }
  setMaxSize(maxSize: number) {
    this.option.maxSize = maxSize;
    if (!this.option.overSizeErrorText) {
      this.overSizeErrorText = `上传的文件大小不能超过 ${this.option.maxSize}MB!`;
    }
    return this;
  }

  setCapture(capture: string | boolean) {
    this.option.capture = capture;
    this.inputNode.capture = capture as string;
    return this;
  }
  destroy() {
    if (this.inputNode && this.inputNode.parentNode) {
      this.inputNode.parentNode.removeChild(this.inputNode);
    }
    (this.inputNode as unknown) = undefined;
  }

  getFileInBlob(): Promise<Array<Blob>> {
    if (this.files) {
      return Promise.resolve(this.files);
    } else {
      return Promise.reject(null);
    }
  }
  getFileInDataUrl(files?: Array<File>): Promise<Array<string>> {
    if (files) {
      return this.transformFiles(files, "binaryString") as Promise<
        Array<string>
      >;
    }
    if (this.files) {
      return this.transformFiles(this.files, "dataUrl") as Promise<
        Array<string>
      >;
    } else {
      return Promise.reject(null);
    }
  }
  getFileInBinaryString(files?: Array<File>): Promise<Array<string>> {
    if (files) {
      return this.transformFiles(files, "binaryString") as Promise<
        Array<string>
      >;
    }
    if (this.files) {
      return this.transformFiles(this.files, "binaryString") as Promise<
        Array<string>
      >;
    } else {
      return Promise.reject(null);
    }
  }
  getFileInArrayBuffer(files?: Array<File>): Promise<Array<ArrayBuffer>> {
    if (files) {
      return this.transformFiles(files, "arrayBuffer") as Promise<
        Array<ArrayBuffer>
      >;
    }
    if (this.files) {
      return this.transformFiles(this.files, "arrayBuffer") as Promise<
        Array<ArrayBuffer>
      >;
    } else {
      return Promise.reject(null);
    }
  }

  getFileInText(files?: Array<File>): Promise<Array<string>> {
    if (files) {
      return this.transformFiles(files, "text") as Promise<Array<string>>;
    }
    if (this.files) {
      return this.transformFiles(this.files, "text") as Promise<Array<string>>;
    } else {
      return Promise.reject(null);
    }
  }

  transformFiles(files: Array<File>, type: string) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let readFile: (file: Blob) => void;
      switch (type) {
        case "text":
          readFile = (file: Blob) => {
            reader.readAsText(file);
          };
          break;
        case "arrayBuffer":
          readFile = (file: Blob) => {
            reader.readAsArrayBuffer(file);
          };
          break;
        case "binaryString":
          readFile = (file: Blob) => {
            reader.readAsBinaryString(file);
          };
          break;
        default:
          readFile = (file: Blob) => {
            reader.readAsDataURL(file);
          };
          break;
      }
      const result: Array<any> = [];
      let len = files.length;
      reader.onload = function () {
        const data = reader.result as string;
        result.push(data);
        if (len > 0) {
          len--;
          readFile(files[len]);
        } else {
          resolve(result);
        }
      };
      reader.onerror = (e) => {
        reject(e);
      };
      len--;
      readFile(files[len]);
    });
  }
}
