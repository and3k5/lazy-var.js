const { execPath } = require("process");
const { lazy } = require("../lib");

describe("lazy-var", function () {

    it("can lazy load", function () {
        var value = lazy(() => 20);
        expect(value.isAsync).toBe(false);
        var outputValue = value.get();
        expect(outputValue).toBe(20);
    })

    it("can lazy load with args", function () {
        var value = lazy((x) => x + 20);
        expect(value.isAsync).toBe(false);
        var outputValue = value.get(10);
        expect(outputValue).toBe(30);
    })

    it("can lazy load when async", async function () {
        var value = lazy(async () => 20);
        expect(value.isAsync).toBe(true);
        var outputValue = await value.get();
        expect(outputValue).toBe(20);
    })

    it("does not call twice", function () {
        var i = 0;
        var value = lazy(() => i++);
        expect(value.isAsync).toBe(false);
        var outputValue1 = value.get();
        var outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    })

    it("does not call twice when async", async function () {
        var i = 0;
        var value = lazy(async () => i++);
        expect(value.isAsync).toBe(true);
        var outputValue1 = await value.get();
        var outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(0);
    })

    const wait = async function (n) {
        return new Promise((res, rej) => {
            setTimeout(() => res(), n)
        });
    }

    it("can handle multiple calls", function () {
        var i = 0;
        var value = lazy(() => i++);
        expect(value.isAsync).toBe(false);

        var asyncFunc = async function () {
            var v = value.get();
            await wait(50);
            return v;
        };
        var p1 = asyncFunc();
        var p2 = asyncFunc();

        p1.then((v) => expect(v).toBe(0));
        p2.then((v) => expect(v).toBe(0));
    })

    it("can handle multiple calls when async", async function () {
        var i = 0;
        var value = lazy(async () => {
            await wait(50);
            return i++
        });
        expect(value.isAsync).toBe(true);
        var outputValue1 = value.get();
        var outputValue2 = value.get();
        expect(outputValue1 instanceof Promise).toBe(true);
        expect(outputValue2 instanceof Promise).toBe(true);
        await wait(50);
        var values = await Promise.all([outputValue1, outputValue2]);
        expect(values[0]).toBe(0);
        expect(values[1]).toBe(0);
    })

    it("can clear and call once again", function () {
        var i = 0;
        var value = lazy(() => i++);
        expect(value.isAsync).toBe(false);
        var outputValue1 = value.get();
        value.clear();
        var outputValue2 = value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    })

    it("can clear and call once again when async", async function () {
        var i = 0;
        var value = lazy(async () => i++);
        expect(value.isAsync).toBe(true);
        var outputValue1 = await value.get();
        await value.clear();
        var outputValue2 = await value.get();
        expect(outputValue1).toBe(0);
        expect(outputValue2).toBe(1);
    })
})