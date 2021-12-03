# Documentation

## Basic usage

### Import / require
```javascript
import { lazy } from "lazy-var";
// or 
const { lazy } = require("lazy-var")
```
### lazy()
```javascript
var lazyData = lazy(initializerMethod);
```

**Parameters**  
- `initializerMethod`: a function/method callback that returns a value  
Example:  
```javascript
 [async] function () { return 1234 };
 ```
**Returns**  
LazyObject

## LazyObject

### .get() 
Gets the value stored in the lazy object. Call's the initializer if this is the first time calling.

### .isAsync
Gets if the LazyObject is created as an async initializer

### .initialized
Gets if the initializer has been called (from .get()) before.

### .initializer
Gets the initializer method

