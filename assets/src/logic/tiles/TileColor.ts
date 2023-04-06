import {ColorType} from "../entities/EntityTile";
import { Tile } from "./Tile";
import {CellDataAsUnion} from "../entities/EntityCell";

export class TileColor extends  Tile {

    constructor(type: ColorType) {
        super(type);
    }

    get typeString(): CellDataAsUnion { return ColorType[this.type] as CellDataAsUnion };

}
