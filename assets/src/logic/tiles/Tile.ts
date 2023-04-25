import {BonusType, ColorType, TileType} from "../entities/EntityTile";
import {TileBase} from "./TileBase";
import {CellGroup} from "./CellGroup";
import {CellTiles} from "../cell/CellTiles";
import {GameFieldCells} from "../field/GameFieldCells";
import { Cell } from "../cell/Cell";

export enum TileEvent {
    hit,
    destroy,
    resetCell,
    setCell,
    changeCell
}

export class Tile extends  TileBase {

    protected hp: number = 1;

    private _x: number;
    private _y: number;
    private _cell: CellTiles;
    private _gameField: GameFieldCells;

    get x(): number { return this._x; };
    get y(): number { return this._y; };
    get cell(): CellTiles { return this._cell; };
    get gameField(): GameFieldCells { return this._gameField; };

    constructor(type: TileType) {
        super(type);
    }

    setGameField(gameField: GameFieldCells) {
        this._gameField = gameField;
    }

    setCell(cell: CellTiles) {
        this._cell = cell;
        this._x = this._cell.x;
        this._y = this._cell.y;
        this.dispatch(TileEvent.setCell, this);
    }

    resetCell() {
        this._cell = undefined;
    }

    hit(): Tile[] {
        this.hp--;
        this.dispatch(TileEvent.hit, this);
        return [this];
    }

    destroy() {
        this.hp = 0;
        this.dispatch(TileEvent.destroy, this);
        this.resetCell();
    }

    drop() {
        let column = this._gameField.getColumn(this._x);
        let cell: CellTiles;
        for(let y = this._y + 1; y < column.cells.length; y++) {
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
        let prevCell = this._cell;
        prevCell.remove(this);
        cell.insert(this);
        this.dispatch(TileEvent.changeCell, this, prevCell, cell);
    }

    get isAlive(): boolean {
        return this.hp > 0;
    }

    get isBonus(): boolean {
        return this.typeString in BonusType;
    }

    get isColor(): boolean {
        return this.typeString in ColorType;
    }
}
