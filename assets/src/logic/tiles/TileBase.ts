import { TileType } from "../entities/EntityTile";
import { CellDataAsUnion } from "../entities/EntityCell";

export class TileBase {
    readonly type: TileType;

    constructor(type: TileType) {
        this.type = type;
    }

    get typeString(): CellDataAsUnion { return; };
}
