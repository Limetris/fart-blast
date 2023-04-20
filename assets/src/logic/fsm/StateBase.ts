export abstract class StateBase {
    id: string;
    abstract context: any;

    abstract onEnter    (...args: any[]): any;
    abstract activate   (...args: any[]): any;
    abstract onExit     (...args: any[]): any;
}
