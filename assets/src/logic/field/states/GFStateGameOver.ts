import {GFState} from "./GFState";
import EventManager from "../../EventManager";

export class GFStateGameOver extends GFState {
    static ID = 'GFStateGameOver';

    onEnter() {

        EventManager.dispatch(this.id);
    }

    next() {
        // this.context.toState(GFStateGroups);
    }

    onExit() {

    }
}
