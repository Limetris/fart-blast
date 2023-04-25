import {BonusType, ColorType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileDisco extends  TileBonus {

    color: ColorType;
    constructor() {
        super(BonusType.disco);
        this.color = Math.floor(Math.random() * COLORS.length);
    }
}
