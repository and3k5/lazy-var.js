export { SyncLazy } from "./sync-lazy"
export { AsyncLazy } from "./async-lazy"

import { AsyncLazy } from "./async-lazy";
import { isAsyncFunction } from "./base";
import { SyncLazy } from "./sync-lazy";
import { AsyncInitializer, Initializer, SyncInitializer } from "./types";


export function lazy<Value,Args extends []>(initializer: AsyncInitializer<Value, Args>) : AsyncLazy<Value, Args>
export function lazy<Value,Args extends []>(initializer: SyncInitializer<Value, Args>) : SyncLazy<Value, Args>
export function lazy<Value,Args extends []>(initializer: Initializer<Value, Args>) {
    const lazy = isAsyncFunction(initializer) ? new AsyncLazy(initializer as AsyncInitializer<Value,Args>) : new SyncLazy(initializer as SyncInitializer<Value,Args>);
    return lazy;
}