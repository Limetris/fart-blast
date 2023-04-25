import { _decorator, Component, Node, UITransform, Sprite, Button, log, Vec2, Vec3, tween, v2, v3 } from 'cc';
import { CellBack } from './CellBack';
import {Cell} from "../../logic/cell/Cell";
import {ViewGameField} from "../game/ViewGameField";
import {Tile, TileEvent} from "../../logic/tiles/Tile";
import {IconFactory} from "../tiles/factory/IconFactory";
import EventManager from "../../logic/EventManager";
import {Icon} from "../tiles/Icon";
import {CellTilesEvent} from "../../logic/cell/CellTiles";
const { ccclass, property } = _decorator;

export enum ViewCellEvent {
    click = 'ViewCellClick'
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

    private _createIcon(tile: Tile): Icon {
        let icon = IconFactory.instance.create(tile);
        icon.viewGameFiled = this.viewGameFiled;
        icon.node.setParent(this.node);
        return icon;
    }

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
        this.cell.subscribe(CellTilesEvent.create, this.onCreateTile.bind(this), this);
        this.cell.subscribe(CellTilesEvent.insert, this.onAddTile.bind(this), this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
        this.cell.unsubscribeTag(this);
    }

    onCreateTile(tile: Tile) {
        this._createIcon(tile);
    }

    onAddTile(tile: Tile) {

    }

    onClick(event) {
        if(this.cell.isHole)
            return;

        const tile = this.cell.tile;
        log(`cell [${this.cell.x},${this.cell.y}] click: ${tile.typeString}`);
        EventManager.dispatch(ViewCellEvent.click, this);
    }

    get icon(): Icon | undefined {
        let node = this.node.children[0];
        return node?.getComponent(Icon);
    }

    async drop(delay: number = 0): Promise<ViewCell> {
        let promises = [];
        this.node.children.forEach((iconNode: Node) => {
            let icon = iconNode.getComponent(Icon);
            promises.push(icon.drop(delay));
        });

        return new Promise(resolve => {
            Promise.all(promises).then(()=> {resolve(this)} );
        });
    }

}

