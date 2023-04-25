import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile} from "../../tiles/Tile";
import {CellGroup} from "../../tiles/CellGroup";
import {BonusType} from "../../entities/EntityTile";
import {CellDataAsUnion} from "../../entities/EntityCell";

export class GFStateMerge extends GFState {
    static ID = GFStateMerge.name;

    tiles: Tile[] = [];
    cell: Cell;
    newTile: Tile;

    onEnter(cell: Cell) {
        this.cell = cell;
        this.tiles = cell.group.tiles;
        this.newTile = cell.group.merge(cell);
        EventManager.dispatch(this.id, this.tiles);
    }

    next() {
        this.tiles.forEach(tile => {
            tile.destroy();
        });

        this.context.toState(GFStateDrop);
    }

    onExit() {

    }
}
