import { SyncInitializer } from "./Initializer";
import { LazyBase } from "./LazyBase";

export class SyncLazy<Value, TArgs extends unknown[]> extends LazyBase<
    Value,
    SyncInitializer<Value, Value, TArgs>
> {
    get isAsync(): boolean {
        return false;
    }
    get(...args: TArgs) {
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
