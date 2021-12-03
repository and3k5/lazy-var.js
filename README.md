# lazy-var.js
Lazy initialize values

## Idea
A way to lazy-initialize data. Executes the initializer first time calling .get() and returns the same value afterwards.
Supports both synchronous and asynchronous initializers.

The solution is inspired by [System.Lazy from dotnet](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1)

## Install
```console
dev@dingdong:~/my-project$ npm install lazy-var
```

## Usage 

```javascript
// Setup lazy variable
import { lazy } from "lazy-var";
import { heavyMethod } from "./lib/stuff.js";

var lazyData = lazy(async () => {
    console.log("Request for data");
    return await heavyMethod()
});

// Later on: Retrieve the data

var data = lazyData.get();
// outputs: "Request for data"
// returns: whatever data from heavyMethod

var data2 = lazyData.get();
// no output
// returns: same data as data
```