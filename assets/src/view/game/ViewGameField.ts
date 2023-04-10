import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2 } from 'cc';
import {IGameFieldData} from "../../logic/entities/EntityGame";
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import {IconFactory} from "../IconFactory";
import {Cell} from "../../logic/cell/Cell";
import {CellBack} from "../tiles/cell/CellBack";
import {ViewCell} from "../tiles/cell/ViewCell";
const { ccclass, property } = _decorator;

@ccclass('ViewGameField')
export class ViewGameField extends Component {

    @property(Prefab)
    prefabCell: Prefab;

    @property(Node)
    background: Node;

    @property(Node)
    cells: Node;

    @property(Size)
    cellSize: Size = size(100, 100);

    private _gameField: GameFieldLogic;
    private _gameFieldTransform: UITransform;
    private _offset: Vec2 = Vec2.ZERO;

    init(filedData: IGameFieldData) {
        this._gameField = new GameFieldLogic(filedData);
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

    private _createCell(cell: Cell): ViewCell {
        let node = instantiate(this.prefabCell);
        const transform = node.getComponent(UITransform);
        node.setParent(this.cells);
        node.setSiblingIndex(0);
        node.setPosition(cell.x * this.cellSize.width + this._offset.x, -cell.y * this.cellSize.height + this._offset.y);

        let viewCell = node.getComponent(ViewCell);
        viewCell.init(this, cell);
        return viewCell;
    }

}

