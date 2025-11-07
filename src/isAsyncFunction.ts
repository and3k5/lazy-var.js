import { AsyncFunctionConstructor } from "./AsyncFunctionConstructor";
import { SyncFunctionConstructor } from "./SyncFunctionConstructor";

export function isAsyncFunction(fnc: typeof AsyncFunctionConstructor): true;
export function isAsyncFunction(fnc: typeof SyncFunctionConstructor): false;
export function isAsyncFunction(
    fnc: typeof AsyncFunctionConstructor | typeof SyncFunctionConstructor,
): boolean {
    return (
        (fnc instanceof AsyncFunctionConstructor &&
            AsyncFunctionConstructor !== Function) === true
    );
}
