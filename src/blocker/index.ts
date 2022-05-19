export class Blocker<T> {
    private res?: (value: T) => void;
    private rej?: (reason?: any) => void;
    public promise: Promise<T>;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.res = resolve;
            this.rej = reject;
        });
    }

    public unblock(val: T) {
        if (this.res == null)
            throw new Error("Can't unblock");
        this.res(val);
    }

    public throw(reason?: any) {
        if (this.rej == null)
            throw new Error("Can't unblock");
        this.rej(reason);
    }
}
