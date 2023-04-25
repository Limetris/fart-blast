import {CellType, ICellData} from "../entities/EntityCell";
import {GameFieldCells} from "../field/GameFieldCells";
import {Events} from "../Events";

export class CellBase extends Events implements ICellData {

    gameField: GameFieldCells;

    readonly type: CellType;
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super();
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
