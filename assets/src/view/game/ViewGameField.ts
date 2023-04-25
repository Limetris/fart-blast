import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2, log, Vec3, v3 } from 'cc';
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
import {GFStateDrop} from "../../logic/field/states/GFStateDrop";
import {CellTiles} from "../../logic/cell/CellTiles";
import {GFStateMerge} from "../../logic/field/states/GFStateMerge";
import {Column, ColumnEvent} from "../../logic/field/Column";
import {GFStateSequenceHit} from "../../logic/field/states/GFStateSequenceHit";
const { ccclass, property } = _decorator;


export type ViewCellCallback = (cell: ViewCell) => void;

@ccclass('ViewGameField')
export class ViewGameField extends Component {

    @property(Prefab)
    prefabCell: Prefab;

    @property(GameFieldBack)
    background: GameFieldBack;

    @property(Node)
    cellsNode: Node;

    // TODO: size можно читать напрямую с префаба
    @property(Size)
    cellSize: Size = size(100, 100);

    private _gameField: GameFieldLogic;
    private _offset: Vec2 = Vec2.ZERO;
    private _cells: ViewCell[][] = [];

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
        const transform = this.cellsNode.getComponent(UITransform);
        return v2(
            -this._gameField.columnCount / 2 * this.cellSize.width + this.cellSize.width * 0.5,
            transform.height - this.cellSize.height
        );
    }

    private _createTiles() {
        this._cells = [];
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

    private _initListeners() {
        EventManager.subscribe(ViewCellEvent.click, this._onCellClick.bind(this), this);
        EventManager.subscribe(ColumnEvent.fill, this._onColumnFill.bind(this), this);

        EventManager.subscribe(GFStateGroups.ID, this._onStateGroups.bind(this), this);
        EventManager.subscribe(GFStateIdle.ID, this._onStateIdle.bind(this), this);
        EventManager.subscribe(GFStateClick.ID, this._onStateClick.bind(this), this);

        EventManager.subscribe(GFStateHit.ID, this._onStateHit.bind(this), this);
        EventManager.subscribe(GFStateMerge.ID, this._onStateMerge.bind(this), this);
        EventManager.subscribe(GFStateDrop.ID, this._onStateDrop.bind(this), this);
    }

    private _getStartColumnWorldCoordinate(x: number): Vec2 | undefined {
        const column = this._gameField.columns[x];
        if(!column)
            return;
        const topCell = column.topCell;
        const topViewCell = this.getCell(x, topCell.y);
        let worldPos = topViewCell.node.worldPosition;
        return v2(worldPos.x, worldPos.y + this.cellSize.height * 0.5);
    }

    private _onColumnFill(column: Column, cells: Cell[]) {

        let startPos = this._getStartColumnWorldCoordinate(column.x);
        cells.forEach((cell, i) => {
            let viewCell = this.getCell(cell.x, cell.y);
            let icon = viewCell.icon;
            if (icon)
                icon.node.setWorldPosition(startPos.x, startPos.y + (cells.length - i) * this.cellSize.height, 0);
        });
    }

    private _onStateGroups() {
        // this.eachCell((viewCell) => {
        //     viewCell.node.children.forEach((iconNode) => {
        //         let icon = iconNode.getComponent(Icon);
        //         icon.alpha(viewCell.cell?.group?.canHit ? 1 : 0.2);
        //     });
        // });
    }

    private _onStateIdle() {

    }


    private _onCellClick(viewCell: ViewCell) {
        this._gameField.click(viewCell.cell);
    }

    private _onStateClick() {

    }

    private _onStateHit(tiles: Tile[]) {
        // TODO: очередь сгорания должна быть группами, чтобы более правильно отраатывать бомбы и ракеты
        let promises = [];
        let delay = 0;
        tiles.forEach((tile)=> {
            let viewCell = this.getCell(tile.x, tile.y);
            let icon = viewCell.icon;
            let promise = new Promise( resolve => setTimeout(() => {
                icon.tile.destroy();
                resolve();
            }, delay * 1000) );
            delay += 0.015;
            promises.push(promise);
        });
        log('wait hit...');
        Promise.all(promises).then(()=> {
            this._gameField.state.next();
        } );
    }


    private _onStateMerge(cell: Cell, tiles: Tile[]) {
        let promises = [];
        let viewCellTarget = this.getCell(cell.x, cell.y);
        tiles.forEach((tile)=> {
            let viewCell = this.getCell(tile.x, tile.y);
            let icon = viewCell.icon;
            promises.push(icon.flyTo(viewCellTarget.node));
        });
        log('wait merging...');
        Promise.all(promises).then(()=> {
            this._gameField.state.next();
        } );
    }


    private _onStateDrop() {
        let promises = [];
        this._cells.forEach((viewColumn)=> {
            let delay = 0;
            for(let y = viewColumn.length - 1; y >= 0; y--) {
                let viewCell = viewColumn[y];
                if(viewCell.cell.isHole)
                    delay += this.cellSize.height / Icon.DROP_SPEED;
                else
                    promises.push(viewCell.drop(delay));

                delay += Icon.DROP_DELAY;
            }
        });
        log('wait dropping...');
        Promise.all(promises).then(()=> {
            this._gameField.state.next();
        } );
    }


}

