import { TileType } from "../entities/EntityTile";
import {TileBase} from "./TileBase";
import {TileGroup} from "./TileGroup";

export class Tile extends  TileBase {

    private _group: TileGroup;
    get group(): TileGroup { return this._group; };

    constructor(type: TileType) {
        super(type);
    }

    setGroup(group: TileGroup) {
        this._group = group;
    }

    resetGroup() {
        this._group = undefined;
    }

}
