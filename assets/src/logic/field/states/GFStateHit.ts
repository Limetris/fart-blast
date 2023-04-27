import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile, TilesHit} from "../../tiles/Tile";

export class GFStateHit extends GFState {
    static ID = 'GFStateHit';

    private _hitTiles: TilesHit = [];

    onEnter(cell: Cell) {
        if (cell.group)
            this._hitTiles = cell.group.hit(cell);
        else if(cell.canHit)
            this._hitTiles = cell.hit();

        EventManager.dispatch(this.id, this._hitTiles);
    }

    next(cell: Cell) {
        this.context.toState(GFStateDrop.ID);
    }

    onExit() {

    }
}
