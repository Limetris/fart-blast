import {BonusType, ColorType, TileType} from "../entities/EntityTile";
import { CellDataAsUnion } from "../entities/EntityCell";
import {Events} from "../Events";
import {CellTiles} from "../cell/CellTiles";
import {GameFieldCells} from "../field/GameFieldCells";
import {TileEvent} from "./Tile";

export abstract class TileBase extends Events {
    readonly type: TileType;
    get typeString(): CellDataAsUnion { return; };
    get isBonus(): boolean { return this.typeString in BonusType; }
    get isColor(): boolean { return this.typeString in ColorType; }

    private _x: number;
    private _y: number;
    private _cell: CellTiles;
    private _gameField: GameFieldCells;

    get x(): number { return this._x; };
    get y(): number { return this._y; };
    get cell(): CellTiles { return this._cell; };
    get gameField(): GameFieldCells { return this._gameField; };

    protected constructor(type: TileType) {
        super();
        this.type = type;
    }

    setGameField(gameField: GameFieldCells) {
        this._gameField = gameField;
    }

    setCell(cell: CellTiles) {
        this._cell = cell;
        this._x = this._cell.x;
        this._y = this._cell.y;
        this.dispatch(TileEvent.setCell, this);
    }

    resetCell() {
        this._cell = undefined;
    }

}
