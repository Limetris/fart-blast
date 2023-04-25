import {_decorator, Component, Sprite, UITransform} from 'cc';
import {CellBackSprite, CellBackType} from "./CellBackSprite";
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import { CellBackFactory } from './CellBackFactory';
import { Cell } from '../../logic/cell/Cell';

const { ccclass, requireComponent, property } = _decorator;

@ccclass('CellBack')
@requireComponent(UITransform)
@requireComponent(Sprite)
export class CellBack extends Component {

    private _x: number;
    private _y: number;
    private _gameField: GameFieldLogic;


    init(x: number, y: number, gameField: GameFieldLogic) {
        this._x = x;
        this._y = y;
        this._gameField = gameField;

        const cellBackType = this._getMapIndex();
        const cellBackSprite = CellBackFactory.instance.get(cellBackType);
        this._setBack(cellBackSprite);
    }

    private _getMapIndex(): CellBackType {
        const index = this._getIndex(
            this._gameField.getCell(this._x - 1, this._y - 1),
            this._gameField.getCell(this._x, this._y - 1),
            this._gameField.getCell(this._x - 1, this._y),
            this._gameField.getCell(this._x, this._y)
        );
        return index;
    }

    // order index cellsNode
    // [ 0, 1 ]
    // [ 2, 3 ]
    private _getIndex(cellLeftTop: Cell, cellRightTop: Cell, cellLeftBottom: Cell, cellRightBottom: Cell): number {
        return  this._cellExists(cellLeftTop)             |
                this._cellExists(cellRightTop)       << 1 |
                this._cellExists(cellLeftBottom)     << 2 |
                this._cellExists(cellRightBottom)    << 3;
    }

    private _cellExists(cell: Cell): number {
        return (cell && !cell.isHole) ? 1 : 0;
    }

    private _setBack(cellBackSprite: CellBackSprite){
        if(!cellBackSprite)
            return;

        let sprite = this.getComponent(Sprite);
        sprite.spriteFrame = cellBackSprite.spriteFrame;
        let pos = sprite.node.getPosition();
        sprite.node.setPosition(pos.x + cellBackSprite.offset.x, pos.y + cellBackSprite.offset.y);
    }

}

