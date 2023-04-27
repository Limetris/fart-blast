import {TileType} from "../entities/EntityTile";
import {TileBase} from "./TileBase";
import {CellTiles} from "../cell/CellTiles";

export enum TileEvent {
    hit,
    destroy,
    resetCell,
    setCell,
    changeCell
}

export type TilesHit = Tile[][];

export class Tile extends  TileBase {

    protected hp: number = 1;
    get isAlive(): boolean { return this.hp > 0; }

    constructor(type: TileType) {
        super(type);
    }

    hit(): TilesHit {
        this.hp--;
        this.dispatch(TileEvent.hit, this);
        return [[this]];
    }

    destroy() {
        this.hp = 0;
        this.dispatch(TileEvent.destroy, this);
        this.resetCell();
    }

    drop() {
        let column = this.gameField.getColumn(this.x);
        let cell: CellTiles;
        for(let y = this.y + 1; y < column.cells.length; y++) {
            let cellNext = column.cells[y];
            if (cellNext.isHole)
                continue;
            if (cellNext.isEmpty)
                cell = cellNext;
            else
                break;
        }
        if (cell) {
            this.rebind(cell);
        }
    }

    rebind(cell: CellTiles) {
        let prevCell = this.cell;
        prevCell.remove(this);
        cell.insert(this);
        this.dispatch(TileEvent.changeCell, this, prevCell, cell);
    }

    static tilesHitMerge(tilesSrc: TilesHit, tilesDst: TilesHit) {
        tilesSrc.forEach((valuesSrc, i) => {
            let valueDst = tilesDst[i];
            if (!valueDst) {
                valueDst = [];
                tilesDst.push(valueDst);
            }
            valueDst.push(...valuesSrc);
        })
    }
}
