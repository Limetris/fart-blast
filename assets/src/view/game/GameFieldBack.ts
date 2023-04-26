import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2 } from 'cc';
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import {CellBack} from "../cell/CellBack";
const { ccclass, property, requireComponent } = _decorator;

@ccclass('GameFieldBack')
@requireComponent(UITransform)
export class GameFieldBack extends Component {
    // TODO:  похоже на GameFieldIcons

    @property(Prefab)
    prefabCellBack: Prefab;

    // TODO: size можно читать напрямую с префаба
    @property(Size)
    cellSize: Size = size(100, 100);

    private _gameField: GameFieldLogic;
    private _transform: UITransform;
    private _offset: Vec2 = Vec2.ZERO;

    init(gameField: GameFieldLogic) {
        this._gameField = gameField;
    }

    onLoad() {
        this._transform = this.getComponent(UITransform);
        this._offset = this._getOffset();
        this._createBacks();
    }

    private _getOffset(): Vec2 {
        const transform = this.getComponent(UITransform);
        return v2(
            -this._gameField.columnCount / 2 * this.cellSize.width,
            transform.height - this.cellSize.height * 0.5
        );
    }

    private _createBacks() {
        for(let x = 0; x < this._gameField.columnCount + 1; x++) {
            for(let y = 0; y < this._gameField.rowCount + 1; y++) {
                this._createCell(x, y);
            }
        }
    }

    private _createCell(x: number, y: number): CellBack {
        let node = instantiate(this.prefabCellBack);
        node.setParent(this.node);
        node.setSiblingIndex(0);
        this._cellInitPosition(node, x, y);

        let cellBack = node.getComponent(CellBack);
        cellBack.init(x, y, this._gameField);
        return cellBack;
    }

    private _cellInitPosition (node: Node, x: number, y: number) {
        node.setPosition(x * this.cellSize.width + this._offset.x, - y * this.cellSize.height + this._offset.y);
    }
}

