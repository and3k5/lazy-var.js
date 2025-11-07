# lazy-var.js

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/and3k5/lazy-var.js/Node.js%20Package)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/lazy-var)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/lazy-var)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/and3k5/lazy-var.js)
![npm](https://img.shields.io/npm/dt/lazy-var)
![GitHub](https://img.shields.io/github/license/and3k5/lazy-var.js)

Lazy initialize values

## Idea

A way to lazy-initialize data. Executes the initializer first time calling .get() and returns the same value afterwards.
Supports both synchronous and asynchronous initializers.

The solution is inspired by [System.Lazy from dotnet](https://docs.microsoft.com/en-us/dotnet/api/system.lazy-1)

## Install

### npm

[lazy-var @ npm](https://www.npmjs.com/package/lazy-var)

or install with npm cli

```console
dev@dingdong:~/my-project$ npm install lazy-var
```

or yarn

```console
dev@dingdong:~/my-project$ yarn add lazy-var
```

## Usage

[Try it on runkit](https://runkit.com/embed/w6gp16njqx8f)

```javascript
// Setup lazy variable
import { lazy } from "lazy-var";
import { heavyMethod } from "./lib/stuff.js";

var lazyData = lazy(async () => {
    console.log("Request for data");
    return await heavyMethod();
});

// Later on: Retrieve the data

var data = await lazyData.get();
// outputs: "Request for data"
// returns: whatever data from heavyMethod

var data2 = await lazyData.get();
// no output
// returns: same data as data
```
