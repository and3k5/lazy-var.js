## Call Signature

```ts
function lazy<TActualValue, TValue, TArgs>(initializer): AsyncLazy<TActualValue, TValue, TArgs>;
```

Defined in: [index.ts:8](https://github.com/and3k5/lazy-var.js/blob/52c86ac402037e5b03616c6689d70a42b65b5e5d/src/index.ts#L8)

### Type Parameters

#### TActualValue

`TActualValue`

#### TValue

`TValue` *extends* `Promise`\<`TActualValue`\>

#### TArgs

`TArgs` *extends* `unknown`[]

### Parameters

#### initializer

`AsyncInitializer`\<`TActualValue`, `TValue`, `TArgs`\>

### Returns

`AsyncLazy`\<`TActualValue`, `TValue`, `TArgs`\>

## Call Signature

```ts
function lazy<TActualValue, TValue, TArgs>(initializer): SyncLazy<TValue, TArgs>;
```

Defined in: [index.ts:15](https://github.com/and3k5/lazy-var.js/blob/52c86ac402037e5b03616c6689d70a42b65b5e5d/src/index.ts#L15)

### Type Parameters

#### TActualValue

`TActualValue`

#### TValue

`TValue`

#### TArgs

`TArgs` *extends* `unknown`[]

### Parameters

#### initializer

`SyncInitializer`\<`TActualValue`, `TValue`, `TArgs`\>

### Returns

`SyncLazy`\<`TValue`, `TArgs`\>
