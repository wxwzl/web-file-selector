[file-selector](../README.md) / Options

# Interface: Options

## Table of contents

### Properties

- [accept](Options.md#accept)
- [capture](Options.md#capture)
- [fileTypeErrorText](Options.md#filetypeerrortext)
- [maxSize](Options.md#maxsize)
- [multiple](Options.md#multiple)
- [overSizeErrorText](Options.md#oversizeerrortext)

## Properties

### accept

• `Optional` **accept**: `string`

Defines accepted file types. It's a comma-separated list of file
extensions, mime-types or unique file type specifiers.

https://developer.mozilla.org/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers

**`example`** ```js
"image/*,video/*,.pdf,.doc,.docx,.xls"
```

#### Defined in

index.ts:26

___

### capture

• `Optional` **capture**: `string` \| `boolean`

Combined with `accept` property it specifies which camera to use for
capture of image or video. It was previously a Boolean value.

#### Defined in

index.ts:35

___

### fileTypeErrorText

• `Optional` **fileTypeErrorText**: `string`

Defines the text which can be show when the selected file's type is wrong.

#### Defined in

index.ts:15

___

### maxSize

• `Optional` **maxSize**: `number`

 Defines the max size of file that can be selected.

#### Defined in

index.ts:7

___

### multiple

• `Optional` **multiple**: `boolean`

Allow multiple files selection.

#### Defined in

index.ts:30

___

### overSizeErrorText

• `Optional` **overSizeErrorText**: `string`

Defines the text which can be show when the selected file's size is oversize.

#### Defined in

index.ts:11
