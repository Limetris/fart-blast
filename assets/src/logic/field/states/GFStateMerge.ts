import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile} from "../../tiles/Tile";
import {BonusGroup} from "../../tiles/BonusGroup";
import {GFStateSequenceHit} from "./GFStateSequenceHit";

export class GFStateMerge extends GFState {
    static ID = 'GFStateMerge';

    private _cell: Cell;
    private _tiles: Tile[] = [];
    private _newTiles: Tile[] = [];
    private _isBonusGroup: boolean = false;

    onEnter(cell: Cell) {
        this._cell = cell;
        this._tiles = cell.group.tiles;
        this._isBonusGroup = (this._cell.group instanceof BonusGroup);

        EventManager.dispatch(this.id, this._cell, this._tiles);
    }

    next() {
        this._newTiles = this._cell.group.merge(this._cell);
        this._tiles.forEach(tile => {
            tile.destroy();
        });

        if (this._isBonusGroup) {
            this.context.sequenceHitTiles = this._newTiles;
            this.context.toState(GFStateSequenceHit);
        }
        else
            this.context.toState(GFStateDrop);
    }

    onExit() {

    }
}
