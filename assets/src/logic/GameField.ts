import {GameFieldData} from "./GameFieldData";
import {IGameFieldData} from "./entities/EntityGame";
import {Cell} from "./cell/Cell";
import {CellType, CellDataAsUnion} from "./entities/EntityCell";

export class GameField extends  GameFieldData{

    private _cells: Cell[][];

    constructor(gameFieldData: IGameFieldData) {
        super(gameFieldData);

        this._parse();
    }

    get cells (): Cell[][] {
        return this._cells;
    }

    getCell(x: number, y: number): Cell {
        return this._cells[x][y];
    }

    getColumn(columnIndex: number): Cell[] {
        return this._cells[columnIndex];
    }

    private _parse () {
        this._cells = [];

        this.gameData.matrix.forEach((columnData, x) => {
            let column: Cell[] = [];

            columnData.forEach((obj, y) => {
                let cell = this._createCell(obj, x, y);
                column.push(cell);
            });
            this._cells.push(column);
        });
    }

    private _createCell(obj: CellDataAsUnion, x: number, y: number): Cell {
        let cell: Cell;
        if (obj === CellType[CellType.hole]) {
            cell = new Cell(x, y, CellType.hole);
            return cell;
        }
        cell = new Cell(x, y);
        cell.add(obj);
        return cell;
    }
}

