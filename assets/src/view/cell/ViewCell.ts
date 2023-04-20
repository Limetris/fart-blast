import { _decorator, Component, Node, UITransform, Sprite, Button, log } from 'cc';
import { CellBack } from './CellBack';
import {Cell} from "../../logic/cell/Cell";
import {ViewGameField} from "../game/ViewGameField";
import {Tile} from "../../logic/tiles/Tile";
import {IconFactory} from "../tiles/factory/IconFactory";
import EventManager from "../../logic/EventManager";
const { ccclass, property } = _decorator;

export enum ViewCellEvent {
    click
}

@ccclass('ViewCell')
export class ViewCell extends Component {

    cell: Cell;
    viewGameFiled: ViewGameField;

    init(viewGameField: ViewGameField, cell: Cell) {
        this.viewGameFiled = viewGameField;
        this.cell = cell;
        this._createIcons();
    }

    private _createIcons() {
        this.cell.tiles.forEach(tile => this._createIcon(tile));
    }

    private _createIcon(tile: Tile) {
        let icon = IconFactory.instance.create(tile);
        icon.node.setParent(this.node);
        // icon.start();
    }

    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
    }

    onClick(event) {
        if(this.cell.isHole)
            return;

        const tile = this.cell.tile;
        log(`cell [${this.cell.x},${this.cell.y}] click: ${tile.typeString}`);
        EventManager.dispatch(ViewCellEvent.click, this);
    }

}

