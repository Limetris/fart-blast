import { StateBase } from './StateBase';

type MapState = Map<any, StateBase>;

// TODO: добавить transitions или использовать готовый пакет
export abstract class FSM  {
    private _states: MapState = new Map<any, StateBase>();
    private _state: StateBase;

    protected constructor() {

    }

    protected addState(ClassState: any, defaultState: boolean = false): StateBase {
        let state: StateBase = new ClassState();
        state.id = ClassState.ID;
        state.context = this;
        this._states.set(state.id, state);
        if (defaultState)
            this.toState(state.id);
        return state;
    }


    private _enterState(state: StateBase, ...args: any[]) {
        if (!state)
            return;
        console.log(`enter state: ${state.id}`);
        state?.onEnter.apply(state, ...args);
    }

    private _exitState(state: StateBase, ...args: any[]) {
        if (!state)
            return;
        console.log(` exit state: ${state.id}`);
        state?.onExit.apply(state, ...args);
    }

    private _getState(id: any): StateBase {
        return this._states.get(id);
    }

    get state (): StateBase {
        return this._state;
    }

    toState(id: any, ...args: any[]) {
        if (typeof id !== 'string')
            id = id.ID;

        const state = this._getState(id);
        if (state) {
            this._exitState(this._state, args);
            this._state = state;
            this._enterState(this._state, args);
        }
    }

}

