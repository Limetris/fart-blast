import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2, log, Vec3, v3 } from 'cc';
import {IGameFieldData} from "../../logic/entities/EntityGame";
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import {Cell} from "../../logic/cell/Cell";
import { GameFieldBack } from './GameFieldBack';
import {ViewCell, ViewCellEvent} from '../cell/ViewCell';
import EventManager from "../../logic/EventManager";
const { ccclass, property } = _decorator;


export type ViewCellCallback = (cell: ViewCell) => void;

@ccclass('GameFieldIcons')
export class GameFieldIcons extends Component {

    @property(Prefab)
    prefabCell: Prefab;

    @property(GameFieldBack)
    background: GameFieldBack;

    @property(Node)
    cellsNode: Node;

    // TODO: size можно читать напрямую с префаба
    @property(Size)
    cellSize: Size = size(100, 100);

    protected _gameField: GameFieldLogic;
    protected _offset: Vec2 = Vec2.ZERO;
    protected _cells: ViewCell[][] = [];

    get gameField(): GameFieldLogic { return this._gameField };

    init(filedData: IGameFieldData) {
        this._gameField = new GameFieldLogic(filedData);
        this.background?.init(this._gameField);
        this._offset = this._getOffset();
        this._createTiles();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    private _getOffset(): Vec2 {
        const transform = this.cellsNode.getComponent(UITransform);
        return v2(
            -this._gameField.columnCount / 2 * this.cellSize.width + this.cellSize.width * 0.5,
            transform.height - this.cellSize.height
        );
    }

    private _clearCells() {
        this.eachCell(viewCell => viewCell.destroy());
        this.cellsNode.removeAllChildren();
        this._cells = [];
    }

    private _createTiles() {
        this._clearCells();
        this._gameField.columns.forEach((column) => {
            let viewColumn: ViewCell[] = [];
            column.cells.forEach((cell) => {
                viewColumn.push(this._createCell(cell));
            });
            this._cells.push(viewColumn);
        });
    }

    private _createCell(cell: Cell): ViewCell {
        let node = instantiate(this.prefabCell);
        const transform = node.getComponent(UITransform);
        node.setParent(this.cellsNode);
        node.setSiblingIndex(0);
        this._cellInitPosition(node, cell.x, cell.y);

        let viewCell = node.getComponent(ViewCell);
        viewCell.init(this, cell);
        return viewCell;
    }

    private _cellInitPosition (node: Node, x: number, y: number) {
        node.setPosition(this.getCellPosition(x, y));
    }

    getCellPosition (x: number, y: number): Vec3 {
        return v3(x * this.cellSize.width + this._offset.x, - y * this.cellSize.height + this._offset.y, 0);
    }

    getColumn(x: number): ViewCell[] | undefined {
        return this._cells[x];
    }

    getCell(x: number, y: number): ViewCell | undefined {
        let column = this.getColumn(x);
        if (!column)
            return;
        return column[y];
    }

    eachCell(callback: ViewCellCallback) {
        if (!callback)
            return;
        this._cells.forEach((viewColumn)=> {
            viewColumn.forEach((viewCell)=>{
                callback(viewCell);
            })
        });
    }


    protected _getStartColumnWorldCoordinate(x: number): Vec2 | undefined {
        const column = this._gameField.columns[x];
        if(!column)
            return;
        const topCell = column.topCell;
        const topViewCell = this.getCell(x, topCell.y);
        let worldPos = topViewCell.node.worldPosition;
        return v2(worldPos.x, worldPos.y + this.cellSize.height * 0.5);
    }
}

