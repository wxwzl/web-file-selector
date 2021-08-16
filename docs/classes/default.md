[web-file-selector](../README.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [acceptTypes](default.md#accepttypes)
- [eventEmitter](default.md#eventemitter)
- [files](default.md#files)
- [inputNode](default.md#inputnode)
- [option](default.md#option)

### Methods

- [checkFile](default.md#checkfile)
- [createInputElement](default.md#createinputelement)
- [destroy](default.md#destroy)
- [emit](default.md#emit)
- [emitError](default.md#emiterror)
- [getFileInArrayBuffer](default.md#getfileinarraybuffer)
- [getFileInBinaryString](default.md#getfileinbinarystring)
- [getFileInBlob](default.md#getfileinblob)
- [getFileInDataUrl](default.md#getfileindataurl)
- [getFileInText](default.md#getfileintext)
- [off](default.md#off)
- [on](default.md#on)
- [onChange](default.md#onchange)
- [once](default.md#once)
- [selectFile](default.md#selectfile)
- [setAccept](default.md#setaccept)
- [setCapture](default.md#setcapture)
- [setMaxSize](default.md#setmaxsize)
- [setMultiple](default.md#setmultiple)
- [transformFiles](default.md#transformfiles)
- [walkFiles](default.md#walkfiles)

## Constructors

### constructor

• **new default**(`option?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [`Options`](../interfaces/Options.md) |

#### Defined in

index.ts:49

## Properties

### acceptTypes

• `Private` **acceptTypes**: `string`[] = `[]`

#### Defined in

index.ts:48

___

### eventEmitter

• `Private` **eventEmitter**: `EventEmitter`

#### Defined in

index.ts:46

___

### files

• `Private` **files**: `any`

#### Defined in

index.ts:47

___

### inputNode

• **inputNode**: `HTMLInputElement` & { `capture?`: `string` \| `boolean`  }

#### Defined in

index.ts:42

___

### option

• **option**: [`Options`](../interfaces/Options.md)

#### Defined in

index.ts:45

## Methods

### checkFile

▸ **checkFile**(`file`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `Blob` |

#### Returns

`boolean`

#### Defined in

index.ts:94

___

### createInputElement

▸ `Private` **createInputElement**(): `void`

#### Returns

`void`

#### Defined in

index.ts:62

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

index.ts:160

___

### emit

▸ **emit**(`eventName`, ...`arg`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `...arg` | `any`[] |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:112

___

### emitError

▸ **emitError**(`eventName`, `errMsg?`): [`default`](default.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `eventName` | `string` | `undefined` |
| `errMsg` | `string` | `""` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:108

___

### getFileInArrayBuffer

▸ **getFileInArrayBuffer**(): `Promise`<`ArrayBuffer`[]\>

#### Returns

`Promise`<`ArrayBuffer`[]\>

#### Defined in

index.ts:186

___

### getFileInBinaryString

▸ **getFileInBinaryString**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:179

___

### getFileInBlob

▸ **getFileInBlob**(): `Promise`<`Blob`[]\>

#### Returns

`Promise`<`Blob`[]\>

#### Defined in

index.ts:165

___

### getFileInDataUrl

▸ **getFileInDataUrl**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:172

___

### getFileInText

▸ **getFileInText**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:194

___

### off

▸ **off**(`eventName`, `listener`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:117

___

### on

▸ **on**(`eventName`, `listener`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:125

___

### onChange

▸ `Private` **onChange**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

index.ts:70

___

### once

▸ **once**(`eventName`, `listener`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:121

___

### selectFile

▸ **selectFile**(): [`default`](default.md)

#### Returns

[`default`](default.md)

#### Defined in

index.ts:129

___

### setAccept

▸ **setAccept**(`accept`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `undefined` \| `string` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:137

___

### setCapture

▸ **setCapture**(`capture`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `capture` | `string` \| `boolean` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:155

___

### setMaxSize

▸ **setMaxSize**(`maxSize`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxSize` | `number` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:150

___

### setMultiple

▸ **setMultiple**(`multiple`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `multiple` | `boolean` |

#### Returns

[`default`](default.md)

#### Defined in

index.ts:145

___

### transformFiles

▸ **transformFiles**(`type`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:202

___

### walkFiles

▸ **walkFiles**(`callBack`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callBack` | (`file`: `Blob`) => `boolean` |
| `context?` | `any` |

#### Returns

`void`

#### Defined in

index.ts:84
