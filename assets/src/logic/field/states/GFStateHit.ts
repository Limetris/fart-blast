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
        this.hitTiles = cell.group.hit(cell);
        console.log(this.hitTiles);
        EventManager.dispatch(this.id, this.hitTiles);
    }

    activate(cell: Cell) {


        this.context.toState(GFStateDrop.ID);
    }

    onExit() {

    }
}
