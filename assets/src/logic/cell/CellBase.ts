import {CellType, ICellData} from "../entities/EntityCell";
import {GameFieldCells} from "../field/GameFieldCells";
import {Events} from "../Events";
import {CellGroup} from "../tiles/CellGroup";

export class CellBase extends Events implements ICellData {


    readonly type: CellType;
    readonly x: number;
    readonly y: number;

    private _group: CellGroup;
    private _gameField: GameFieldCells;

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
    }

    get isHole(): boolean { return this.type === CellType.hole; }

    get gameField(): GameFieldCells { return this._gameField; };
    setGameField(gameField: GameFieldCells) { this._gameField = gameField; }

    get group(): CellGroup { return this._group; };
    setGroup(group: CellGroup) { this._group = group; }
    resetGroup() { this._group = undefined; }

}
