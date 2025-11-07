import { describe, it, expect } from "vitest";

import { lazy } from "../lib/es/index";

describe("lazy (compiled, es)", () => {
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
        var value = lazy(() => 20);
        var outputValue = value.get();
        expect(outputValue).toBe(20);
    });

    it("can lazy load with args", function () {
        var value = lazy((x: number) => x + 20);
        var outputValue = value.get(10);
        expect(outputValue).toBe(30);
    });

    it("can lazy load when async", async function () {
        var value = lazy(async () => 20);
        var outputValue = await value.get();
        expect(outputValue).toBe(20);
    });

    it("does not call twice", function () {
        var i = 0;
        var value = lazy(() => i++);
        var outputValue1 = value.get();
        var outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    });

    it("does not call twice when async", async function () {
        var i = 0;
        var value = lazy(async () => i++);
        var outputValue1 = await value.get();
        var outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    });

    const wait = async function (n: number) {
        return new Promise<void>((res, rej) => {
            setTimeout(() => res(), n);
        });
    };

    it("can handle multiple calls", function () {
        var i = 0;
        var value = lazy(() => i++);

        var asyncFunc = async function () {
            var v = value.get();
            await wait(50);
            return v;
        };
        var p1 = asyncFunc();
        var p2 = asyncFunc();

        p1.then((v) => expect(v).toBe(0));
        p2.then((v) => expect(v).toBe(0));
    });

    it("can handle multiple calls when async", async function () {
        var i = 0;
        var value = lazy(async () => {
            await wait(50);
            return i++;
        });
        var outputValue1 = value.get();
        var outputValue2 = value.get();
        await wait(50);
        var values = await Promise.all([outputValue1, outputValue2]);
        expect(values[0]).toBe(0);
        expect(values[1]).toBe(0);
    });

    it("can clear and call once again", function () {
        var i = 0;
        var value = lazy(() => i++);
        var outputValue1 = value.get();
        value.clear();
        var outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    });

    it("can clear and call once again when async", async function () {
        var i = 0;
        var value = lazy(async () => i++);
        var outputValue1 = await value.get();
        await value.clear();
        var outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    });
});
