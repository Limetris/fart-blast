import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {Tile} from "../tiles/Tile";
import TileFactory from "../TileFactory";
import {CellTiles} from "./CellTiles";
import {CellGroup} from "../tiles/CellGroup";

export class Cell extends CellTiles {

    private _group: CellGroup;
    get group(): CellGroup { return this._group; };

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super(x, y, type);
    }

    get canHit(): boolean {
        return !this.isHole && !this.isEmpty && this.tile.isAlive;
    }

    hit(): Tile[] {
        let tiles = this.tile?.hit();
        this.pop();
        return tiles;
    }

    setGroup(group: CellGroup) {
        this._group = group;
    }

    resetGroup() {
        this._group = undefined;
    }

}
