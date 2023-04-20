import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";

export class GFStateMerge extends GFState {
    static ID = GFStateMerge.name;

    onEnter(cell: Cell) {
        if (cell.canHit) {
            if (cell.group.canMerge) {
                this.context.toState(GFStateIdle);
            }
            else if (cell.group.canHit){
                cell.group.hit(cell);
                cell.tile.hit();
            }
        }
        else {
            this.context.toState(GFStateIdle);
        }
        EventManager.dispatch(this.id);
    }

    activate(cell: Cell) {

    }

    onExit() {

    }
}
