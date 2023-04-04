import {IGameFieldData} from "./entities/EntityGame";
import { assert } from "chai";

export class GameFieldData {
    readonly columns: number;
    readonly rows: number;
    readonly gameData: IGameFieldData;

    constructor(gameData: IGameFieldData) {
        GameFieldData.validate(gameData);

        this.gameData = gameData;
        this.gameData.matrix = this.gameData.matrix[0].map((col, colIndex) => this.gameData.matrix.map(row => row[colIndex]));
        this.columns = this.gameData.matrix.length;
        this.rows = this.gameData.matrix[0].length;
    }

    static validate(gameData: IGameFieldData) {
        assert(gameData.matrix.length > 0, 'game data rows are cell');
        const columns = gameData.matrix[0].length;
        assert(columns > 0, 'columns are cell');
        const rowError = gameData.matrix.find((row) => { return row.length !== columns; });
        assert(!rowError, 'rows length are not equal');
    }
}

