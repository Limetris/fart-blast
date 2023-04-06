import { _decorator, Component, Node, instantiate, UITransform, Prefab } from 'cc';
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

    private _gameField: GameField;

    init(filedData: IGameFieldData) {
        this._gameField = new GameField(filedData);
    }

    onLoad() {
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
        // node.setPosition(cell.x , cell.y );
        node.setPosition(cell.x * transform.width, cell.y * transform.height);

        let cellBack = node.getComponent(CellBack);
        cellBack.init(cell);
        return cellBack;
    }

}

