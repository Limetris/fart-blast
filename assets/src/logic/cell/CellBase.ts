import {CellType, ICellData} from "../entities/EntityCell";
import {GameField} from "../field/GameField";

export class CellBase implements ICellData{

    readonly gameField: GameField;
    readonly type: CellType;
    readonly x: number;
    readonly y: number;

    constructor(gameField: GameField, x: number, y: number, type: CellType = CellType.cell) {
        this.gameField = gameField;
        this.x = x;
        this.y = y;
        this.type = type;
    }

    get isHole(): boolean {
        return this.type === CellType.hole;
    }
}
