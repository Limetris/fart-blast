import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateFill} from "./GFStateFill";

export class GFStateDrop extends GFState {
    static ID = GFStateDrop.name;

    onEnter() {
        this.context.drop();
        this.context.fill();
        EventManager.dispatch(this.id);
    }

    next() {
        this.context.toState(GFStateFill);
    }

    onExit() {

    }
}
