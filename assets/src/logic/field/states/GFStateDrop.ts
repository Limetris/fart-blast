import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";

export class GFStateDrop extends GFState {
    static ID = GFStateDrop.name;

    onEnter(cell: Cell) {
        if (cell.canHit) {
            if (cell.group) {
                cell.group.hit(cell);
                this.context.toState(GFStateIdle.ID);
            }
            else if (cell.tile.isBonus){
                cell.tile.hit();
            }
        }
        else {
            this.context.toState(GFStateIdle.ID);
        }
        EventManager.dispatch(this.id);
    }

    activate() {

    }

    onExit() {

    }
}
