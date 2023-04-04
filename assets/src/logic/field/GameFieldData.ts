import {IGameFieldData} from "../entities/EntityGame";
import { assert } from "chai";

export class GameFieldData {
    readonly columnCount: number;
    readonly rowCount: number;
    readonly gameData: IGameFieldData;

    constructor(gameData: IGameFieldData) {
        GameFieldData.validate(gameData);

        this.gameData = gameData;
        this.gameData.matrix = this.gameData.matrix[0].map((col, colIndex) => this.gameData.matrix.map(row => row[colIndex]));
        this.columnCount = this.gameData.matrix.length;
        this.rowCount = this.gameData.matrix[0].length;
    }

    static validate(gameData: IGameFieldData) {
        assert(gameData.matrix.length > 0, 'game data rowCount are cell');
        const columns = gameData.matrix[0].length;
        assert(columns > 0, 'columns are cell');
        const rowError = gameData.matrix.find((row) => { return row.length !== columns; });
        assert(!rowError, 'rowCount length are not equal');
    }
}

