import {GFState} from "./GFState";
import EventManager from "../../EventManager";
import {GFStateGroups} from "./GFStateGroups";

export class GFStateInit extends GFState {
    static ID = 'GFStateInit';

    onEnter() {
        this._initGoals();
        EventManager.dispatch(this.id);
    }

    next() {
        this.context.toState(GFStateGroups);
    }

    onExit() {

    }

    private _initGoals() {
        this.context.steps = this.context.gameData.steps;
        this.context.points = 0;
    }
}
