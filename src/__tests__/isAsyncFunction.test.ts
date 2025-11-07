import { describe, expect, test } from "vitest";
import { isAsyncFunction } from "../isAsyncFunction";

describe("isAsyncFunction", () => {
    test("returns true for async functions", () => {
        const asyncFunc = async () => {
            return 42;
        };
        expect(isAsyncFunction(asyncFunc)).toBe(true);
    });

    test("returns false for sync functions", () => {
        const syncFunc = () => {
            return 42;
        };
        expect(isAsyncFunction(syncFunc)).toBe(false);
    });
});
