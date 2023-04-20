import {CellType, ICellData} from "../entities/EntityCell";
import {GameFieldCells} from "../field/GameFieldCells";

export class CellBase implements ICellData {

    gameField: GameFieldCells;

    readonly type: CellType;
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    get isHole(): boolean {
        return this.type === CellType.hole;
    }

    setGameField(gameField: GameFieldCells) {
        this.gameField = gameField;
    }
}
