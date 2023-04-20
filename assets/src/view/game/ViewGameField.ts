import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2 } from 'cc';
import {IGameFieldData} from "../../logic/entities/EntityGame";
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import {Cell} from "../../logic/cell/Cell";
import { GameFieldBack } from './GameFieldBack';
import {ViewCell, ViewCellEvent} from '../cell/ViewCell';
import EventManager from "../../logic/EventManager";
import {GFStateClick} from "../../logic/field/states/GFStateClick";
import {GFStateHit} from "../../logic/field/states/GFStateHit";
import {Tile} from "../../logic/tiles/Tile";
import {GFStateIdle} from "../../logic/field/states/GFStateIdle";
import {GFStateGroups} from "../../logic/field/states/GFStateGroups";
import {Icon} from "../tiles/Icon";
const { ccclass, property } = _decorator;

@ccclass('ViewGameField')
export class ViewGameField extends Component {

    @property(Prefab)
    prefabCell: Prefab;

    @property(GameFieldBack)
    background: GameFieldBack;

    @property(Node)
    cells: Node;

    // TODO: size можно читать напрямую с префаба
    @property(Size)
    cellSize: Size = size(100, 100);

    private _gameField: GameFieldLogic;
    private _offset: Vec2 = Vec2.ZERO;

    init(filedData: IGameFieldData) {
        this._gameField = new GameFieldLogic(filedData);
        this.background?.init(this._gameField);
    }

    onLoad() {
        this._offset = this._getOffset();
        this._createTiles();
        this._initListeners();
        this._onStateGroups();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    private _getOffset(): Vec2 {
        const transform = this.cells.getComponent(UITransform);
        return v2(
            -this._gameField.columnCount / 2 * this.cellSize.width + this.cellSize.width * 0.5,
            transform.height - this.cellSize.height
        );
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
        this._cellInitPosition(node, cell.x, cell.y);

        let viewCell = node.getComponent(ViewCell);
        viewCell.init(this, cell);
        return viewCell;
    }

    private _cellInitPosition (node: Node, x: number, y: number) {
        node.setPosition(x * this.cellSize.width + this._offset.x, - y * this.cellSize.height + this._offset.y);
    }


    private _initListeners() {
        EventManager.subscribe(ViewCellEvent.click, this._onCellClick.bind(this), this);

        EventManager.subscribe(GFStateGroups.ID, this._onStateGroups.bind(this), this);
        EventManager.subscribe(GFStateIdle.ID, this._onStateIdle.bind(this), this);
        EventManager.subscribe(GFStateClick.ID, this._onStateClick.bind(this), this);
        EventManager.subscribe(GFStateHit.ID, this._onStateHit.bind(this), this);
    }

    private _onStateGroups() {
        this.cells.children.forEach((node) => {
            let viewCell = node.getComponent(ViewCell);
            if(!viewCell.cell?.group?.canHit) {
                node.children.forEach((iconNode) => {
                    let icon = iconNode.getComponent(Icon);
                    icon.alpha(0.2);
                });
            }
        });
    }

    private _onStateIdle() {

    }


    private _onCellClick(viewCell: ViewCell) {
        this._gameField.click(viewCell.cell);
    }

    private _onStateClick() {

    }

    private _onStateHit(tiles: Tile[]) {

    }


}

