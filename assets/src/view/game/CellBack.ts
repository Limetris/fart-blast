import { _decorator, Component, Node, UITransform } from 'cc';
import {CellType} from "../../logic/entities/EntityCell";
import {Cell} from "../../logic/cell/Cell";
import {IconFactory} from "../IconFactory";
import { Icon } from '../tiles/Icon';
import {Tile} from "../../logic/tiles/Tile";
const { ccclass, property } = _decorator;

@ccclass('CellBack')
export class CellBack extends Component {

    type: CellType;
    cellData: Cell;

    init(cell: Cell) {
        this.cellData = cell;
        this._createIcons();
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

