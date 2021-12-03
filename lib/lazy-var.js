; (function (g) {
    'use strict';

    const blocker = function () {
        let res, rej;
        var promise = new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
        });
        return {
            unblock: function (...args) {
                res.apply(null, args);
            },
            throw: function (...args) {
                rej.apply(null, args);
            },
            promise: promise,
        }
    }

    function lazy(initializer) {
        var lazy = {};
        var isAsync = initializer[Symbol.toStringTag] === 'AsyncFunction';

        Object.defineProperty(lazy, 'isAsync', {
            value: isAsync,
            writable: false
        });

        var value = null;
        var initialized = false;

        Object.defineProperty(lazy, 'initializer', {
            value: initializer,
            writable: false
        });

        Object.defineProperty(lazy, 'initialized', {
            get: function () {
                return initialized;
            },
        });

        var queue = [];

        const get = isAsync ? async function () {
            var block = blocker();
            await Promise.all(queue);
            queue.push(block.promise);
            if (!initialized) {
                initialized = true;
                value = lazy.initializer();
            }

            while (value instanceof Promise) {
                value = await value;
            }
            block.unblock();
            queue.splice(queue.indexOf(block.promise), 1);
            return value;
        } : function () {
            if (!initialized) {
                initialized = true;
                value = lazy.initializer();
            }

            return value;
        }

        Object.defineProperty(lazy, 'get', {
            value: get,
            writable: false
        });


        const clear = isAsync ? async function () {
            var block = blocker();
            await Promise.all(queue);
            queue.push(block.promise);
            initialized = false;
            value = null;
            block.unblock();
            queue.splice(queue.indexOf(block.promise), 1);
            return value;
        } : function () {
            initialized = false;
            value = null;

            return value;
        }

        Object.defineProperty(lazy, 'clear', {
            value: clear,
            writable: false
        });

        return lazy;
    };

    const createGlobal = function (v, name) {
        if (typeof (exports) === 'object') {
            // node export
            if (module.exports == null)
                module.exports = {};
            module.exports[name] = v;
        } else if (typeof define === 'function' && define.amd) {
            // amd export
            define(function () {
                var obj = {};
                obj[name] = v;
                return obj;
            });
        } else {
            // browser global
            g[name] = v;
        }
    };

    createGlobal(lazy, "lazy");
}(this));