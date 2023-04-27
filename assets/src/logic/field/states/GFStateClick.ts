import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateHit} from "./GFStateHit";
import {GFStateMerge} from "./GFStateMerge";

export class GFStateClick extends GFState {
    static ID = 'GFStateClick';

    onEnter(cell: Cell) {
        if (cell.canHit && cell.group) {
            if(cell.group.canMerge) {
                this.context.steps--;
                this.context.toState(GFStateMerge, cell);
            }
            else if (cell.group.canHit) {
                this.context.steps--;
                this.context.toState(GFStateHit, cell);
            }
            else
                this.context.toState(GFStateIdle);
        }
        else {
            this.context.toState(GFStateIdle);
        }
    }

    next(cell: Cell) {

    }

    onExit() {

    }
}
