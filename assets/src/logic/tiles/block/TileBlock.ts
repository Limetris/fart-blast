import {BlockType, } from "../../entities/EntityTile";
import { Tile } from "../Tile";
import {CellDataAsUnion} from "../../entities/EntityCell";

export class TileBlock extends  Tile {

    constructor(type: BlockType) {
        super(type);
    }

    get typeString(): CellDataAsUnion { return BlockType[this.type] as CellDataAsUnion };
}
