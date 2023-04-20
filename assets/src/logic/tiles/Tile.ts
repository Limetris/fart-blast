import {BonusType, TileType} from "../entities/EntityTile";
import {TileBase} from "./TileBase";
import {CellGroup} from "./CellGroup";
import {CellTiles} from "../cell/CellTiles";

export enum TileEvent {
    hit,
    destroy
}
export class Tile extends  TileBase {

    protected hp: number = 1;

    private _cell: CellTiles;
    get cell(): CellTiles { return this._cell; };

    constructor(type: TileType) {
        super(type);
    }


    setCell(cell: CellTiles) {
        this._cell = cell;
    }

    resetCell() {
        this._cell = undefined;
    }

    hit(): Tile[] {
        this.hp--;
        this.dispatch(TileEvent.hit, this, this.cell);
        return [this];
    }

    destroy() {
        this.hp = 0;
        this.dispatch(TileEvent.destroy, this, this.cell);
        this.resetCell();
    }

    get isAlive(): boolean {
        return this.hp > 0;
    }

    get isBonus(): boolean {
        return this.type in BonusType;
    }
}
