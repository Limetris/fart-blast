import { _decorator, Component, Node, instantiate, UITransform, Prefab, Vec2, Size, size, v2, log, Vec3, v3 } from 'cc';
import {Cell} from "../../logic/cell/Cell";
import {ViewCell, ViewCellEvent} from '../cell/ViewCell';
import EventManager from "../../logic/EventManager";
import {GFStateClick} from "../../logic/field/states/GFStateClick";
import {GFStateHit} from "../../logic/field/states/GFStateHit";
import {Tile} from "../../logic/tiles/Tile";
import {GFStateIdle} from "../../logic/field/states/GFStateIdle";
import {GFStateGroups} from "../../logic/field/states/GFStateGroups";
import {Icon} from "../tiles/Icon";
import {GFStateDrop} from "../../logic/field/states/GFStateDrop";
import {GFStateMerge} from "../../logic/field/states/GFStateMerge";
import {Column, ColumnEvent} from "../../logic/field/Column";
import {GameFieldIcons} from "./GameFieldIcons";
import {GFStateShuffle} from "../../logic/field/states/GFStateShuffle";
const { ccclass, property } = _decorator;


export type ViewCellCallback = (cell: ViewCell) => void;

@ccclass('GameFieldView')
export class GameFieldView extends GameFieldIcons {

    onLoad() {
        super.onLoad();
        this._initListeners();
        this._onStateGroups();
    }

    onDestroy() {
        super.onDestroy();
        EventManager.unsubscribeTag(this);
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
        EventManager.subscribe(GFStateShuffle.ID, this._onStateShuffle.bind(this), this);
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


    private _onStateShuffle() {
        let promises = [];
        this._cells.forEach((viewColumn)=> {
            for(let y = viewColumn.length - 1; y >= 0; y--) {
                let viewCell = viewColumn[y];
                let icon = viewCell.icon;
                if (icon)
                    promises.push(icon.flyToHome());
            }
        });
        log('wait shuffle...');
        Promise.all(promises).then(()=> {
            this._gameField.state.next();
        } );
    }


}

