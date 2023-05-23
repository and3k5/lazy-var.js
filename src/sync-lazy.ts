import { LazyBase } from "./base";
import { SyncInitializer } from "./types";

export class SyncLazy<Value,Args extends []> extends LazyBase<Value,Args,SyncInitializer<Value,Args>> {
    get isAsync(): boolean {
        return false;
    }
    get(...args: Args) {
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