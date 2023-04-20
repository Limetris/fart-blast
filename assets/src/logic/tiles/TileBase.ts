import { TileType } from "../entities/EntityTile";
import { CellDataAsUnion } from "../entities/EntityCell";
import {Events} from "../Events";

export class TileBase extends Events {
    readonly type: TileType;

    constructor(type: TileType) {
        super();
        this.type = type;
    }

    get typeString(): CellDataAsUnion { return; };
}
