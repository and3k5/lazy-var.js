import { Blocker } from "./blocker";

abstract class LazyBase {
    protected _initializer: Function;
    protected _value: any = null;
    protected _initialized: boolean = false;

    constructor(initializer: Function) {
        this._initializer = initializer;
    }
    abstract get isAsync(): boolean;
    get initializer() {
        return this._initializer;
    }
    get initialized() {
        return this._initialized;
    }
}

export class AsyncLazy extends LazyBase {
    get isAsync() {
        return true;
    }
    private queue: any[];
    constructor(initializer: Function) {
        super(initializer);
        this.queue = [];
    }
    async get() {
        var block = new Blocker<undefined>();
        await Promise.all(this.queue);
        this.queue.push(block.promise);
        if (!this._initialized) {
            this._initialized = true;
            this._value = this._initializer();
        }

        while (this._value instanceof Promise) {
            this._value = await this._value;
        }
        block.unblock(undefined);
        this.queue.splice(this.queue.indexOf(block.promise), 1);
        return this._value;
    }
    async clear() {
        var block = new Blocker<undefined>();
        await Promise.all(this.queue);
        this.queue.push(block.promise);
        this._initialized = false;
        this._value = null;
        block.unblock(undefined);
        this.queue.splice(this.queue.indexOf(block.promise), 1);
        return this._value;
    }
}


export class SyncLazy extends LazyBase {
    get isAsync(): boolean {
        return false;
    }
    get() {
        if (!this._initialized) {
            this._initialized = true;
            this._value = this._initializer();
        }

        return this._value;
    }
    clear() {
        this._initialized = false;
        this._value = null;

        return this._value;
    }
}

const AsyncFunction = (async () => { }).constructor;

function isAsyncFunction(fnc: Function) {
    return (fnc instanceof AsyncFunction && AsyncFunction !== Function) === true;
}

export function lazy(initializer: Function) {
    var lazy = isAsyncFunction(initializer) ? new AsyncLazy(initializer) : new SyncLazy(initializer);
    return lazy;
};