import { AsyncLazy } from "./AsyncLazy";
import { AsyncInitializer, SyncInitializer } from "./Initializer";
import { isAsyncFunction } from "./isAsyncFunction";
import { SyncLazy } from "./SyncLazy";

type NeverPromise<T> = T extends Promise<unknown> ? never : T;

export function lazy<
    TActualValue,
    TValue extends Promise<TActualValue>,
    TArgs extends unknown[],
>(
    initializer: AsyncInitializer<TActualValue, TValue, TArgs>,
): AsyncLazy<TActualValue, TValue, TArgs>;
export function lazy<
    TActualValue,
    TValue extends NeverPromise<TActualValue>,
    TArgs extends unknown[],
>(
    initializer: SyncInitializer<TActualValue, TValue, TArgs>,
): SyncLazy<TValue, TArgs>;
export function lazy<
    TActualValue,
    TValue extends Promise<TActualValue> | NeverPromise<TActualValue>,
    TArgs extends unknown[],
>(
    initializer:
        | AsyncInitializer<TActualValue, TValue, TArgs>
        | SyncInitializer<TActualValue, TValue, TArgs>,
) {
    if (isAsyncFunction(initializer)) {
        return new AsyncLazy(
            initializer as AsyncInitializer<TActualValue, TValue, TArgs>,
        );
    } else {
        return new SyncLazy(
            initializer as unknown as SyncInitializer<
                TActualValue,
                TActualValue,
                TArgs
            >,
        );
    }
}
