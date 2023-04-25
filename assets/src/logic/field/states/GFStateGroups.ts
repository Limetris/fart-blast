import { GFState } from "./GFState";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";

export class GFStateGroups extends GFState {
    static ID = GFStateGroups.name;

    onEnter() {
        this.context.searchGroups();
        EventManager.dispatch(this.id);
        this.context.toState(GFStateIdle);
    }

    next() {

    }

    onExit() {

    }
}
