import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile} from "../../tiles/Tile";
import {BonusGroup} from "../../tiles/BonusGroup";
import {GFStateSequenceHit} from "./GFStateSequenceHit";

export class GFStateMerge extends GFState {
    static ID = GFStateMerge.name;

    tiles: Tile[] = [];
    cell: Cell;
    newTiles: Tile[] = [];

    isBonusGroup: boolean = false;

    onEnter(cell: Cell) {
        this.cell = cell;
        this.tiles = cell.group.tiles;
        this.isBonusGroup = (this.cell.group instanceof BonusGroup);

        EventManager.dispatch(this.id, this.cell, this.tiles);
    }

    next() {
        this.newTiles = this.cell.group.merge(this.cell);
        this.tiles.forEach(tile => {
            tile.destroy();
        });

        if (this.isBonusGroup) {
            this.context.sequenceHitTiles = this.newTiles;
            this.context.toState(GFStateSequenceHit);
        }
        else
            this.context.toState(GFStateDrop);
    }

    onExit() {

    }
}
