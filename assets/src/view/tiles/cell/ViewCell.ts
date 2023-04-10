import { _decorator, Component, Node, UITransform, Sprite } from 'cc';
import {Cell} from "../../../logic/cell/Cell";
import {Tile} from "../../../logic/tiles/Tile";
import {IconFactory} from "../../IconFactory";
import {CellBackSprite} from "./CellBackSprite";
import { CellBack } from './CellBack';
import {ViewGameField} from "../../game/ViewGameField";
const { ccclass, property } = _decorator;

@ccclass('ViewCell')
export class ViewCell extends Component {

    @property(CellBack)
    back: CellBack = undefined;

    cellData: Cell;
    viewGameFiled: ViewGameField;

    init(viewGameField: ViewGameField, cell: Cell) {
        this.viewGameFiled = viewGameField;
        this.cellData = cell;
        this._initBack();
        this._createIcons();
    }

    private _initBack() {
        if (!this.back)
            return;
        this.back.init(this.cellData);
        const worldPos = this.back.node.worldPosition;
        this.back.node.setParent(this.viewGameFiled.background);
        this.back.node.setWorldPosition(worldPos);
        this.back.node.setSiblingIndex(0);
    }

    private _createIcons() {
        this.cellData.tiles.forEach(tile => this._createIcon(tile));
    }

    private _createIcon(tile: Tile) {
        let icon = IconFactory.instance.create(tile);
        icon.node.setParent(this.node);
    }

    onLoad() {

    }

    update(deltaTime: number) {

    }
}

