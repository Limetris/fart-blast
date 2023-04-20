import {IGameFieldData} from "../entities/EntityGame";
import { assert } from "chai";
import { GameFieldFSM } from "./GameFieldFSM";

export class GameFieldData extends GameFieldFSM {
    readonly columnCount: number;
    readonly rowCount: number;
    readonly gameData: IGameFieldData;

    constructor(gameData: IGameFieldData) {
        super();
        GameFieldData.validate(gameData);

        this.gameData = gameData;
        this.gameData.field = this.gameData.field[0].map((col, colIndex) => this.gameData.field.map(row => row[colIndex]));
        this.columnCount = this.gameData.field.length;
        this.rowCount = this.gameData.field[0].length;
    }

    static validate(gameData: IGameFieldData) {
        assert(gameData.field.length > 0, 'game data rowCount are cell');
        const columns = gameData.field[0].length;
        assert(columns > 0, 'columns are cell');
        const rowError = gameData.field.find((row) => { return row.length !== columns; });
        assert(!rowError, 'rowCount length are not equal');
    }
}

