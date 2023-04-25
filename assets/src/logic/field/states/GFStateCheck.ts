import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";

export class GFStateCheck extends GFState {
    static ID = GFStateCheck.name;

    onEnter(cell: Cell) {
        cell.group.hit(cell);

        EventManager.dispatch(this.id);
    }

    next() {


        this.context.toState(GFStateDrop.ID);
    }

    onExit() {

    }
}
