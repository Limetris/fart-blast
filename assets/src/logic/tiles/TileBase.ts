import { TileType } from "../entities/EntityTile";
import { CellDataAsUnion } from "../entities/EntityCell";
import {Events} from "../Events";

export abstract class TileBase extends Events {
    readonly type: TileType;

    protected constructor(type: TileType) {
        super();
        this.type = type;
    }

    get typeString(): CellDataAsUnion { return; };
}
