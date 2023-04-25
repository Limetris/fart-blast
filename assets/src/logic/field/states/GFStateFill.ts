import { GFState } from "./GFState";
import EventManager from "../../EventManager";
import {GFStateIdle} from "./GFStateIdle";
import {GFStateGroups} from "./GFStateGroups";

export class GFStateFill extends GFState {
    static ID = GFStateFill.name;

    onEnter() {
        EventManager.dispatch(this.id);
    }

    next() {
        this.context.toState(GFStateGroups);
    }

    onExit() {

    }
}
