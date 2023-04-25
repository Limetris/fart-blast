import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile} from "../../tiles/Tile";

export class GFStateHit extends GFState {
    static ID = GFStateHit.name;

    hitTiles: Tile[] = [];

    onEnter(cell: Cell) {
        if (cell.group)
            this.hitTiles = cell.group.hit(cell);
        else if(cell.canHit)
            this.hitTiles = cell.hit();

        console.log(this.hitTiles);
        EventManager.dispatch(this.id, this.hitTiles);
    }

    next(cell: Cell) {
        this.context.toState(GFStateDrop.ID);
    }

    onExit() {

    }
}
