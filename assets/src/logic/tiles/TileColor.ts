import {ColorType} from "../entities/EntityTile";
import { Tile } from "./Tile";

export class TileColor extends  Tile {

    constructor(type: ColorType) {
        super(type);
    }
}
