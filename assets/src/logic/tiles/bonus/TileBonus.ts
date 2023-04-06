import {BonusType} from "../../entities/EntityTile";
import {Tile} from "../Tile";
import {CellDataAsUnion} from "../../entities/EntityCell";

export class TileBonus extends  Tile {

    constructor(type: BonusType) {
        super(type);
    }

    get typeString(): CellDataAsUnion { return BonusType[this.type] as CellDataAsUnion };
}
