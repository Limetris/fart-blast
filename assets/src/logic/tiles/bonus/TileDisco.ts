import {BonusType, ColorType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileDisco extends  TileBonus {

    color: ColorType;
    constructor() {
        super(BonusType.disco);
    }
}
