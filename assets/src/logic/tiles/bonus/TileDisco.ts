import {BonusType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileDisco extends  TileBonus {

    constructor() {
        super(BonusType.disco);
    }
}
