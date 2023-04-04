import { TileType } from "../entities/EntityTile";

export class TileBase {
    readonly type: TileType;

    constructor(type: TileType) {
        this.type = type;
    }
}
