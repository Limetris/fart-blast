import { TileType } from "../../entities/EntityTile";
import {Tile} from "../Tile";

export class TileBonus extends  Tile {

    constructor(type: TileType) {
        super(type);
    }
}
