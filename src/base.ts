import { Initializer } from "./types";

export abstract class LazyBase<Value, Args extends [], TInitializer extends Initializer<Value,Args>> {
    protected _initializer: TInitializer;
    protected _value : Value = null as unknown as Value;
    protected _initialized = false;

    constructor(initializer: TInitializer) {
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

export function isAsyncFunction(fnc: Initializer<unknown, []>) {
    return fnc.constructor.name === "AsyncFunction";
}