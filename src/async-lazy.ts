import { LazyBase } from "./base";
import { Blocker } from "./blocker";
import { AsyncInitializer } from "./types";

export class AsyncLazy<Value,Args extends []> extends LazyBase<Value,Args,AsyncInitializer<Value,Args>> {
    get isAsync() {
        return true;
    }
    private queue: any[];
    constructor(initializer: AsyncInitializer<Value,Args>) {
        super(initializer);
        this.queue = [];
    }
    async get(...args: Args) {
        const block = new Blocker<undefined>();
        const blockWait = Promise.all(this.queue);
        this.queue.push(block.promise);
        await blockWait;
        let value : Value | Promise<Value>;
        if (!this._initialized) {
            this._initialized = true;
            value = this._initializer.apply(null, args);
        }else{
            value = this._value;
        }

        while (value instanceof Promise) {
            value = await value;
        }
        this._value = value;
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