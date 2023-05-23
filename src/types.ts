export type SyncInitializer<Value, Args extends []> = (this: null, ...args : Args) => Value;
export type AsyncInitializer<Value, Args extends []> = (this: null, ...args: Args) => Promise<Value>

export type Initializer<Value,Args extends []> = SyncInitializer<Value, Args> | AsyncInitializer<Value, Args>;