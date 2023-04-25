import {BonusType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileBomb extends  TileBonus {

    radius: number = 1;
    constructor() {
        super(BonusType.bomb);
    }
}
