import { GFState } from "./GFState";
import EventManager from "../../EventManager";

export class GFStateIdle extends GFState {
    static ID = GFStateIdle.name;

    onEnter() {
        EventManager.dispatch(this.id);
    }

    activate() {

    }

    onExit() {

    }
}
