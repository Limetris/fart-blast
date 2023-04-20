import { GFState } from "./GFState";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";

export class GFStateGroups extends GFState {
    static ID = GFStateGroups.name;

    onEnter() {
        this.context.searchGroups();
        this.context.toState(GFStateIdle);
        EventManager.dispatch(this.id);
    }

    activate() {

    }

    onExit() {

    }
}
