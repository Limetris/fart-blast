import {GameFieldData} from "./GameFieldData";
import {ColumnData, IGameFieldData} from "../entities/EntityGame";
import {Cell} from "../cell/Cell";
import {Column} from "./Column";
import { CellCallback } from "../cell/CellTiles";

export class GameFieldCells extends  GameFieldData {

    private _columns: Column[];

    constructor(gameFieldData: IGameFieldData) {
        super(gameFieldData);

        this._parse();
    }

    get columns(): Column[] {
        return this._columns;
    }

    getCell(x: number, y: number): Cell {
        return this._columns[x]?.getCell(y);
    }

    getColumn(columnIndex: number): Column {
        return this._columns[columnIndex];
    }

    eachCell(callback: CellCallback) {
        if(!callback)
            return;
        this._columns.forEach((column, x) => {
            column.eachCell(callback);
        });
    }

    fill () {
        this._columns.forEach((column, x) => {
            column.fill();
        });
    }

    private _parse () {
        this._columns = [];

        this.gameData.field.forEach((columnData, x) => {
            let column = this._createColumn(x, columnData);
            this._columns.push(column);
        });
    }

    private _createColumn(x: number, columnData: ColumnData): Column {
        return new Column(this, x, columnData);
    }


}

