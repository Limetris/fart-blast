import { GFState } from "./GFState";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateShuffle} from "./GFStateShuffle";

export class GFStateGroups extends GFState {
    static ID = GFStateGroups.name;

    onEnter() {
        this.context.searchGroups();
        EventManager.dispatch(this.id);
    }

    next() {
        if (this.context.groups.length > 0)
            this.context.toState(GFStateIdle);
        else
            this.context.toState(GFStateShuffle);
    }

    onExit() {

    }
}
