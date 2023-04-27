export abstract class StateBase {
    readonly id: string;
    abstract context: any;

    abstract onEnter    (...args: any[]): any;
    abstract next       (...args: any[]): any;
    abstract onExit     (...args: any[]): any;
}
