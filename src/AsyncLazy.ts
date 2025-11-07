import { AsyncInitializer } from "./Initializer";
import { LazyBase } from "./LazyBase";

export class AsyncLazy<
    TActualValue,
    Value extends Promise<TActualValue>,
    TArgs extends unknown[],
> extends LazyBase<
    Promise<TActualValue>,
    AsyncInitializer<TActualValue, Value, TArgs>
> {
    get isAsync() {
        return true;
    }
    constructor(initializer: AsyncInitializer<TActualValue, Value, TArgs>) {
        super(initializer);
    }
    private getOrCreatePromise(...args: TArgs) {
        if (!this._initialized) {
            this._initialized = true;
            const result = this._initializer.apply(null, args);
            this._value = result;
            return result;
        } else {
            return this._value;
        }
    }
    async get(...args: TArgs) {
        const promise = await this.getOrCreatePromise(...args);
        return promise;
    }
    async clear() {
        if (this._initialized) {
            await this._value;
        }
        this._initialized = false;
        this._value = null as unknown as Value;
    }
}
