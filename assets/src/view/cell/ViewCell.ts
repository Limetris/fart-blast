import { _decorator, Component, Node, UITransform, Sprite, Button, log, Vec2, Vec3, tween, v2, v3 } from 'cc';
import { CellBack } from './CellBack';
import {Cell} from "../../logic/cell/Cell";
import {GameFieldIcons} from "../game/GameFieldIcons";
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
    gameFiledView: GameFieldIcons;

    init(gameFiledView: GameFieldIcons, cell: Cell) {
        this.gameFiledView = gameFiledView;
        this.cell = cell;
        this._createIcons();
    }

    private _createIcons() {
        this.cell.tiles.forEach(tile => this._createIcon(tile));
    }

    private _createIcon(tile: Tile): Icon {
        let icon = IconFactory.instance.create(tile);
        icon.gameFiledView = this.gameFiledView;
        icon.node.setParent(this.node);
        return icon;
    }

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
        this.cell.subscribe(CellTilesEvent.create, this.onCreateTile.bind(this), this);
        this.cell.subscribe(CellTilesEvent.insert, this.onAddTile.bind(this), this);
        this.cell.subscribe(CellTilesEvent.replace, this.onReplaceTile.bind(this), this);
    }

    onDestroy() {
        this.node.children.forEach((iconNode: Node) => {
            let icon = iconNode.getComponent(Icon);
            if(icon)
                icon.destroy();
        });
        this.node.removeAllChildren();

        this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
        this.cell.unsubscribeTag(this);
    }

    onCreateTile(tile: Tile) {
        this._createIcon(tile);
    }

    onAddTile(tile: Tile) {

    }

    onReplaceTile(tile: Tile) {
        this.node.removeAllChildren();
        this._createIcon(tile);
    }

    onClick(event) {
        if(this.cell.isHole)
            return;
        const tile = this.cell.tile;
        if(!tile)
            return;

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
            Promise.all(promises).then(()=> { resolve(this) } );
        });
    }

}

