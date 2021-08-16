import EventEmitter from "wolfy87-eventemitter";

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
export default class WebFileSelector {
  public inputNode!: HTMLInputElement & {
    capture?: boolean | string;
  };
  public option: Options;
  private eventEmitter: EventEmitter = new EventEmitter();
  private files: any;
  private acceptTypes: Array<string> = [];
  constructor(option: Options = defaultConfig) {
    this.option = option;
    this.createInputElement();

    this.setAccept(option.accept);

    if (!this.option.overSizeErrorText) {
      this.option.overSizeErrorText = `上传的文件大小不能超过 ${this.option.maxSize}MB!`;
    }
    if (!this.option.fileTypeErrorText) {
      this.option.fileTypeErrorText = `请选择正确的文件类型!`;
    }
  }
  private createInputElement() {
    this.inputNode = document.createElement("input");
    this.inputNode.style.display = "none";
    this.inputNode.type = "file";
    this.inputNode.capture = this.option.capture;
    this.inputNode.multiple = this.option.multiple ? true : false;
    this.inputNode.onchange = this.onChange.bind(this);
  }
  private onChange(event: Event) {
    this.files = (event.target as any).files;
    let flag = true;
    this.walkFiles((file) => {
      flag = this.checkFile(file);
      if (!flag) {
        return true;
      }
      return false;
    });
    if (flag) {
      this.emit("select-file-success", this.files);
    }
  }
  walkFiles(callBack: (file: Blob) => boolean, context?: any) {
    const array = this.files;
    const len = array.length;
    for (let i = 0; i < len; i++) {
      const stop: boolean = callBack && callBack.call(context, array[i]);
      if (stop) {
        return;
      }
    }
  }
  checkFile(file: Blob) {
    if (this.option.maxSize) {
      const isLt8M = file.size / 1024 / 1024 < this.option.maxSize;
      if (!isLt8M) {
        this.emitError("oversize-error", this.option.overSizeErrorText);
        return false;
      }
    }
    if (this.option.accept && !this.acceptTypes.includes(file.type)) {
      this.emitError("file-type-error", this.option.fileTypeErrorText);
      return false;
    }
    return true;
  }
  emitError(eventName: string, errMsg: string = "") {
    this.emit(eventName, new Error(errMsg));
    return this;
  }
  emit(eventName: string, ...arg: Array<any>) {
    this.eventEmitter.emit(eventName, ...arg);
    return this;
  }

  off(eventName: string, listener: (...arg: Array<any>) => void) {
    this.eventEmitter.off(eventName, listener);
    return this;
  }
  once(eventName: string, listener: (...arg: Array<any>) => void) {
    this.eventEmitter.once(eventName, listener);
    return this;
  }
  on(eventName: string, listener: (...arg: Array<any>) => void) {
    this.eventEmitter.on(eventName, listener);
    return this;
  }
  public selectFile() {
    this.inputNode.value = "";
    setTimeout(() => {
      const event = new MouseEvent("click");
      this.inputNode.dispatchEvent(event);
    }, 0);
    return this;
  }
  setAccept(accept: string | undefined) {
    this.inputNode.accept = accept || "";
    if (accept) {
      this.acceptTypes = accept.replace(/\s/g, "").split(",");
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
    return this;
  }

  setCapture(capture: string | boolean) {
    this.option.capture = capture;
    this.inputNode.capture = capture;
    return this;
  }
  destroy() {
    // document.body.removeChild(this.inputNode);
    (this.inputNode as unknown) = undefined;
  }

  getFileInBlob(): Promise<Array<Blob>> {
    if (this.files) {
      return Promise.resolve(this.files);
    } else {
      return Promise.reject(null);
    }
  }
  getFileInDataUrl(): Promise<Array<string>> {
    if (this.files) {
      return this.transformFiles("dataUrl") as Promise<Array<string>>;
    } else {
      return Promise.reject(null);
    }
  }
  getFileInBinaryString(): Promise<Array<string>> {
    if (this.files) {
      return this.transformFiles("binaryString") as Promise<Array<string>>;
    } else {
      return Promise.reject(null);
    }
  }
  getFileInArrayBuffer(): Promise<Array<ArrayBuffer>> {
    if (this.files) {
      return this.transformFiles("arrayBuffer") as Promise<Array<ArrayBuffer>>;
    } else {
      return Promise.reject(null);
    }
  }

  getFileInText(): Promise<Array<string>> {
    if (this.files) {
      return this.transformFiles("text") as Promise<Array<string>>;
    } else {
      return Promise.reject(null);
    }
  }

  transformFiles(type: string) {
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
      const files: Array<any> = this.files;
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
