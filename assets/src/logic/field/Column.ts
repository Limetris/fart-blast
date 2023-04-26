import {ColumnData} from "../entities/EntityGame";
import {Cell} from "../cell/Cell";
import {CellType, CellDataAsUnion} from "../entities/EntityCell";
import {GameFieldCells} from "./GameFieldCells";
import {CellCallback, CellTiles} from "../cell/CellTiles";
import {Events} from "../Events";
import EventManager from "../EventManager";
import {ShortToTileType} from "../entities/EntityTile";

export enum ColumnEvent {
    fill= 'ColumnFill'
}

export type ColumnCallback = (column: Column) => void;

export class Column extends Events {
    readonly gameField: GameFieldCells;
    readonly x: number;
    private _cells: Cell[];

    constructor(gameField: GameFieldCells, x: number, columnData: ColumnData) {
        super();
        this.gameField = gameField;
        this.x = x;
        this._parse(columnData);
        this.fill();
    }

    get cells (): Cell[] {
        return this._cells;
    }

    get topCell(): Cell | undefined {
        return this._cells.find(cell => !cell.isHole);
    }

    getCell(y: number): Cell {
        return this._cells[y];
    }

    eachCell(callback: CellCallback) {
        if(!callback)
            return;
        this._cells.forEach((cell, y) => {
            callback(cell);
        });
    }

    fill () {
        let fillCells: Cell[] = [];
        this._cells.forEach((cell, y) => {
            if (cell.fill())
                fillCells.push(cell);
        });
        EventManager.dispatch(ColumnEvent.fill, this, fillCells);
    }

    drop() {
        for(let y = this._cells.length - 1; y >= 0; y--) {
            let cell = this._cells[y];
            if(!cell.isEmpty)
                cell.tile.drop();
        }
    }

    private _parse (columnData: ColumnData) {
        this._cells = [];
        columnData.forEach((obj, y) => {
            let cell = this._createCell(ShortToTileType[obj], this.x, y);
            this._cells.push(cell);
        });
    }

    private _createCell(obj: CellDataAsUnion, x: number, y: number): Cell {
        let cell: Cell;
        if (obj === CellType[CellType.hole]) {
            cell = new Cell(x, y, CellType.hole);
            return cell;
        }
        cell = new Cell(x, y);
        cell.setGameField(this.gameField);
        cell.create(obj);
        return cell;
    }



}

