import { TileType } from "../../entities/EntityTile";
import { Tile } from "../Tile";

export class TileBlock extends  Tile {

    constructor(type: TileType) {
        super(type);
    }
}
