import {GFState} from "./GFState";
import EventManager from "../../EventManager";

export class GFStateWin extends GFState {
    static ID = 'GFStateWin';

    onEnter() {

        EventManager.dispatch(this.id);
    }

    next() {
        // this.context.toState(GFStateGroups);
    }

    onExit() {

    }
}
