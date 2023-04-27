import { GFState } from "./GFState";
import EventManager from "../../EventManager";

export class GFStateIdle extends GFState {
    static ID = 'GFStateIdle';

    onEnter() {
        EventManager.dispatch(this.id);
    }

    next() {

    }

    onExit() {

    }
}
