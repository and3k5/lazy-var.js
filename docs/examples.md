---
outline: deep
---

# Examples

Here are some examples on how it can be used

## Async

```typescript
import { lazy } from "lazy-var";

async function heavyWork() {
    // simulate doing something async
    await heavyFetching();
    return 42;
}

var lazyAsyncData = lazy(async () => {
    return await heavyWork();
});

const result = await lazyAsyncData.get();
console.log(result); // => 42
```

## Sync

```typescript
import { lazy } from "lazy-var";

var lazyAsyncData = lazy(() => {
    return 42;
});

const result = lazyAsyncData.get();
console.log(result); // => 42
```

## With parameters

```typescript
import { lazy } from "lazy-var";

var lazyAsyncData = lazy((n) => {
    return n + 1;
});

const result = lazyAsyncData.get(41);
console.log(result); // => 42
```

# LazyObject

The object returned from lazy(...)

## .clear()

Clear the stored value

## .get()

Gets the value stored in the lazy object. Call's the initializer if this is the first time calling.

## .isAsync

Gets if the LazyObject is created as an async initializer

## .initialized

Gets if the initializer has been called (from .get()) before.

## .initializer

Gets the initializer method
