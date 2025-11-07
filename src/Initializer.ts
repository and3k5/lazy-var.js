export type Initializer<TActualValue, Value, TArgs extends unknown[]> =
    Value extends Promise<TActualValue>
        ? AsyncInitializer<TActualValue, Value, TArgs>
        : SyncInitializer<TActualValue, Value, TArgs>;

export type InitializerType<TActualValue, Value, Targs extends unknown[]> =
    | AsyncInitializer<TActualValue, Value, Targs>
    | SyncInitializer<TActualValue, Value, Targs>;

export type AsyncInitializer<TActualValue, Value, TArgs extends unknown[]> =
    Value extends Promise<TActualValue>
        ? (...args: TArgs) => Promise<TActualValue>
        : never;

export type SyncInitializer<TActualValue, Value, TArgs extends unknown[]> =
    Value extends Promise<TActualValue> ? never : (...args: TArgs) => Value;
