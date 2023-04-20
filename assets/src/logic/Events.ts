interface IListener {
    callback: Function,
    tag?: any
}
type EventListeners = Map<any, IListener[]>;

export class Events {

    private _events: EventListeners = new Map<any, IListener[]>();

    constructor() {

    }

    subscribe (event: any, callback: Function, tag?: any) {
        if (!callback)
            return;
        let listener: IListener = {
            callback: callback,
            tag: tag
        };
        let listeners = this._events.get(event) || [];
        listeners.push(listener);
        this._events.set(event, listeners);
    }

    dispatch (event: any, ...args: any[]) {
        const listeners = this._events.get(event);
        if (!listeners)
            return false;
        console.log(`event: ${event}`);
        listeners.forEach(listener => listener.callback.apply(null, args));
    }

    hasEvent(event: any){
        return this._events.has(event);
    }

    unsubscribe (event: any, callback: Function) {
        let listeners = this._events.get(event);
        if (!listeners) {
            console.warn(`This event: ${event} does not exist`);
            return false;
        }
        listeners.filter!(listener => (listener && listener.callback !== callback));
    }

    unsubscribeTag (tag: any) {
        if (!tag) {
            console.warn(`This tag: ${tag} is undefined`);
            return false;
        }
        this._events.forEach((listeners, event) => {
            listeners.filter!(listener => (listener && listener.tag !== tag));
        });
    }
}

