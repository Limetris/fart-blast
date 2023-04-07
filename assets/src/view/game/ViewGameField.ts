import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2 } from 'cc';
import {IGameFieldData} from "../../logic/entities/EntityGame";
import {GameField} from "../../logic/field/GameField";
import {IconFactory} from "../IconFactory";
import {Cell} from "../../logic/cell/Cell";
import { CellBack } from './CellBack';
const { ccclass, property } = _decorator;

@ccclass('ViewGameField')
export class ViewGameField extends Component {

    @property(Prefab)
    prefabCell: Prefab;

    @property(Size)
    cellSize: Size = size(100, 100);

    private _gameField: GameField;
    private _gameFieldTransform: UITransform;
    private _offset: Vec2 = Vec2.ZERO;

    init(filedData: IGameFieldData) {
        this._gameField = new GameField(filedData);
    }

    onLoad() {
        this._gameFieldTransform = this.getComponent(UITransform);
        this._offset = v2(this.cellSize.width, this._gameFieldTransform.height - this.cellSize.height);
        this._createTiles();
    }

    private _createTiles() {
        this._gameField.columns.forEach((column) => {
            column.cells.forEach((cell) => {
                this._createCell(cell);

            });
        });
    }

    private _createCell(cell: Cell): CellBack {
        let node = instantiate(this.prefabCell);
        const transform = node.getComponent(UITransform);
        node.setParent(this.node);
        node.setSiblingIndex(0);
        node.setPosition(cell.x * this.cellSize.width + this._offset.x, -cell.y * this.cellSize.height + this._offset.y);

        let cellBack = node.getComponent(CellBack);
        cellBack.init(cell);
        return cellBack;
    }

}

