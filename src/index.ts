import { Blocker } from "./blocker";

interface Initializer<Value> {
    (...args : any[]): Value;
}

abstract class LazyBase<Value> {
    protected _initializer: Initializer<Value>;
    protected _value : Value = null as unknown as Value;
    protected _initialized = false;

    constructor(initializer: Initializer<Value>) {
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

export class AsyncLazy<Value> extends LazyBase<Value> {
    get isAsync() {
        return true;
    }
    private queue: any[];
    constructor(initializer: Initializer<Value>) {
        super(initializer);
        this.queue = [];
    }
    async get(...args: any[]) {
        const block = new Blocker<undefined>();
        await Promise.all(this.queue);
        this.queue.push(block.promise);
        if (!this._initialized) {
            this._initialized = true;
            this._value = this._initializer.apply(null, args);
        }

        while (this._value instanceof Promise) {
            this._value = await this._value;
        }
        block.unblock(undefined);
        this.queue.splice(this.queue.indexOf(block.promise), 1);
        return this._value;
    }
    async clear() {
        const block = new Blocker<undefined>();
        await Promise.all(this.queue);
        this.queue.push(block.promise);
        this._initialized = false;
        this._value = null as unknown as Value;
        block.unblock(undefined);
        this.queue.splice(this.queue.indexOf(block.promise), 1);
        return this._value;
    }
}


export class SyncLazy<Value> extends LazyBase<Value> {
    get isAsync(): boolean {
        return false;
    }
    get(...args: any[]) {
        if (!this._initialized) {
            this._initialized = true;
            this._value = this._initializer.apply(null, args);
        }

        return this._value;
    }
    clear() {
        this._initialized = false;
        this._value = null as unknown as Value;

        return this._value;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = (async () => { }).constructor;

function isAsyncFunction<Value>(fnc: Initializer<Value>) {
    return (fnc instanceof AsyncFunction && AsyncFunction !== Function) === true;
}

export function lazy<Value>(initializer: Initializer<Value>) {
    const lazy = isAsyncFunction(initializer) ? new AsyncLazy(initializer) : new SyncLazy(initializer);
    return lazy;
}