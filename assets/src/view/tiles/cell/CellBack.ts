import {_decorator, Component, Sprite, UITransform} from 'cc';
import {CellBackSprite, CellBackType} from "./CellBackSprite";
import {Cell} from "../../../logic/cell/Cell";
import {CellBackFactory, CellMap} from "../../CellBackFactory";
import {GameField} from "../../../logic/field/GameField";

const { ccclass, requireComponent, property } = _decorator;

@ccclass('CellBack')
@requireComponent(UITransform)
@requireComponent(Sprite)
export class CellBack extends Component {

    init(cell: Cell) {
        if(cell.isHole)
            return;

        const cellBackType = this._getMapIndex(cell);
        const cellBackSprite = CellBackFactory.instance.get(cellBackType);
        this._setBack(cellBackSprite);
    }

    private _getMapIndex(cell: Cell): CellBackType {
        const index = this._getIndex(
            cell.gameField.getCell(cell.x - 1, cell.y),
            cell.gameField.getCell(cell.x, cell.y - 1),
            cell.gameField.getCell(cell.x + 1, cell.y),
            cell.gameField.getCell(cell.x, cell.y + 1)
        );
        return index;
    }

    private _getIndex(cellLeft: Cell, cellTop: Cell, cellRight: Cell, cellBottom: Cell): number {
        return  this._cellExists(cellLeft)           |
                this._cellExists(cellTop)       << 1 |
                this._cellExists(cellRight)     << 2 |
                this._cellExists(cellBottom)    << 3;
    }

    private _cellExists(cell: Cell): number {
        return (cell && !cell.isHole) ? 1 : 0;
    }

    private _setBack(cellBackSprite: CellBackSprite){
        if(!cellBackSprite)
            return;

        let sprite = this.getComponent(Sprite);
        sprite.spriteFrame = cellBackSprite.spriteFrame;
        sprite.node.setPosition(cellBackSprite.offset.x, cellBackSprite.offset.y);
    }

}

