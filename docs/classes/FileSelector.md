[file-selector](../README.md) / FileSelector

# Class: FileSelector

## Table of contents

### Constructors

- [constructor](FileSelector.md#constructor)

### Properties

- [acceptTypes](FileSelector.md#accepttypes)
- [eventEmitter](FileSelector.md#eventemitter)
- [files](FileSelector.md#files)
- [inputNode](FileSelector.md#inputnode)
- [option](FileSelector.md#option)

### Methods

- [checkFile](FileSelector.md#checkfile)
- [createInputElement](FileSelector.md#createinputelement)
- [destroy](FileSelector.md#destroy)
- [emit](FileSelector.md#emit)
- [emitError](FileSelector.md#emiterror)
- [getFileInArrayBuffer](FileSelector.md#getfileinarraybuffer)
- [getFileInBinaryString](FileSelector.md#getfileinbinarystring)
- [getFileInBlob](FileSelector.md#getfileinblob)
- [getFileInDataUrl](FileSelector.md#getfileindataurl)
- [getFileInText](FileSelector.md#getfileintext)
- [off](FileSelector.md#off)
- [on](FileSelector.md#on)
- [onChange](FileSelector.md#onchange)
- [once](FileSelector.md#once)
- [selectFile](FileSelector.md#selectfile)
- [setAccept](FileSelector.md#setaccept)
- [transformFiles](FileSelector.md#transformfiles)
- [walkFiles](FileSelector.md#walkfiles)

## Constructors

### constructor

• **new FileSelector**(`option?`)

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

• `Private` **inputNode**: `HTMLInputElement` & { `capture?`: `string` \| `boolean`  }

#### Defined in

index.ts:42

___

### option

• `Private` **option**: [`Options`](../interfaces/Options.md)

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

index.ts:98

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

index.ts:146

___

### emit

▸ **emit**(`eventName`, ...`arg`): [`FileSelector`](FileSelector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `...arg` | `any`[] |

#### Returns

[`FileSelector`](FileSelector.md)

#### Defined in

index.ts:115

___

### emitError

▸ **emitError**(`eventName`, `errMsg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `errMsg` | `string` |

#### Returns

`void`

#### Defined in

index.ts:112

___

### getFileInArrayBuffer

▸ **getFileInArrayBuffer**(): `Promise`<`ArrayBuffer`[]\>

#### Returns

`Promise`<`ArrayBuffer`[]\>

#### Defined in

index.ts:172

___

### getFileInBinaryString

▸ **getFileInBinaryString**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:165

___

### getFileInBlob

▸ **getFileInBlob**(): `Promise`<`Blob`[]\>

#### Returns

`Promise`<`Blob`[]\>

#### Defined in

index.ts:151

___

### getFileInDataUrl

▸ **getFileInDataUrl**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:158

___

### getFileInText

▸ **getFileInText**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

index.ts:180

___

### off

▸ **off**(`eventName`, `listener`): [`FileSelector`](FileSelector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`FileSelector`](FileSelector.md)

#### Defined in

index.ts:120

___

### on

▸ **on**(`eventName`, `listener`): [`FileSelector`](FileSelector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`FileSelector`](FileSelector.md)

#### Defined in

index.ts:128

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

▸ **once**(`eventName`, `listener`): [`FileSelector`](FileSelector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`arg`: `any`[]) => `void` |

#### Returns

[`FileSelector`](FileSelector.md)

#### Defined in

index.ts:124

___

### selectFile

▸ **selectFile**(): [`FileSelector`](FileSelector.md)

#### Returns

[`FileSelector`](FileSelector.md)

#### Defined in

index.ts:132

___

### setAccept

▸ **setAccept**(`accept`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

index.ts:140

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

index.ts:188

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
