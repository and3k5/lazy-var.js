import { describe, it, expect } from "vitest";

import { lazy } from "../";

describe("lazy (src)", () => {
    it("should properly initialize and get value async", async () => {
        const getter = lazy(async () => {
            return 42;
        });
        expect(getter.initialized).toBe(false);
        expect(getter.isAsync).toBe(true);
        expect(await getter.get()).toBe(42);
        expect(getter.initialized).toBe(true);
        await getter.clear();
        expect(getter.initialized).toBe(false);
    });

    it("should properly initialize and get value sync", () => {
        const getter = lazy(() => {
            return 42;
        });
        expect(getter.initialized).toBe(false);
        expect(getter.isAsync).toBe(false);
        expect(getter.get()).toBe(42);
        expect(getter.initialized).toBe(true);
        getter.clear();
        expect(getter.initialized).toBe(false);
    });

    it("can lazy load", function () {
        const value = lazy(() => 20);
        const outputValue = value.get();
        expect(outputValue).toBe(20);
    });

    it("can lazy load with args", function () {
        const value = lazy((x: number) => x + 20);
        const outputValue = value.get(10);
        expect(outputValue).toBe(30);
    });

    it("can lazy load when async", async function () {
        const value = lazy(async () => 20);
        const outputValue = await value.get();
        expect(outputValue).toBe(20);
    });

    it("does not call twice", function () {
        let i = 0;
        const value = lazy(() => i++);
        const outputValue1 = value.get();
        const outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    });

    it("does not call twice when async", async function () {
        let i = 0;
        const value = lazy(async () => i++);
        const outputValue1 = await value.get();
        const outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    });

    const wait = async function (n: number) {
        return new Promise<void>((res) => {
            setTimeout(() => res(), n);
        });
    };

    it("can handle multiple calls", function () {
        let i = 0;
        const value = lazy(() => i++);

        const asyncFunc = async function () {
            const v = value.get();
            await wait(50);
            return v;
        };
        const p1 = asyncFunc();
        const p2 = asyncFunc();

        p1.then((v) => expect(v).toBe(0));
        p2.then((v) => expect(v).toBe(0));
    });

    it("can handle multiple calls when async", async function () {
        let i = 0;
        const value = lazy(async () => {
            await wait(50);
            return i++;
        });
        const outputValue1 = value.get();
        const outputValue2 = value.get();
        await wait(50);
        const values = await Promise.all([outputValue1, outputValue2]);
        expect(values[0]).toBe(0);
        expect(values[1]).toBe(0);
    });

    it("can clear and call once again", function () {
        let i = 0;
        const value = lazy(() => i++);
        const outputValue1 = value.get();
        value.clear();
        const outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    });

    it("can clear and call once again when async", async function () {
        let i = 0;
        const value = lazy(async () => i++);
        const outputValue1 = await value.get();
        await value.clear();
        const outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    });
});
