import { TileType } from "../entities/EntityTile";
import {TileBase} from "./TileBase";

export class Tile extends  TileBase {

    constructor(type: TileType) {
        super(type);
    }
}
