import {GFState} from "./GFState";
import EventManager from "../../EventManager";
import {GFStateGroups} from "./GFStateGroups";

export class GFStateInit extends GFState {
    static ID = 'GFStateInit';

    onEnter() {
        EventManager.dispatch(this.id);
    }

    next() {
        this.context.toState(GFStateGroups);
    }

    onExit() {

    }
}
