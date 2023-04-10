import {ColumnData} from "../entities/EntityGame";
import {Cell} from "../cell/Cell";
import {CellType, CellDataAsUnion} from "../entities/EntityCell";
import {GameField} from "./GameField";

export class Column {
    readonly gameField: GameField;
    readonly x: number;
    private _cells: Cell[];

    constructor(gameField: GameField, x: number, columnData: ColumnData) {
        this.gameField = gameField;
        this.x = x;
        this._parse(columnData);
        this.fill();
    }

    get cells (): Cell[] {
        return this._cells;
    }

    getCell(y: number): Cell {
        return this._cells[y];
    }

    fill () {
        this._cells.forEach((cell, y) => {
            cell.fill();
        });
    }

    private _parse (columnData: ColumnData) {
        this._cells = [];
        columnData.forEach((obj, y) => {
            let cell = this._createCell(obj, this.x, y);
            this._cells.push(cell);
        });
    }

    private _createCell(obj: CellDataAsUnion, x: number, y: number): Cell {
        let cell: Cell;
        if (obj === CellType[CellType.hole]) {
            cell = new Cell(this.gameField, x, y, CellType.hole);
            return cell;
        }
        cell = new Cell(this.gameField, x, y);
        cell.add(obj);
        return cell;
    }



}

