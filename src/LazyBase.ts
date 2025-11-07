export abstract class LazyBase<TValue, T> {
    protected _initializer: T;
    protected _value: TValue = null as unknown as TValue;
    protected _initialized = false;

    constructor(initializer: T) {
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
