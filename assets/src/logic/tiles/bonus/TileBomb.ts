import {BonusType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileBomb extends  TileBonus {

    constructor() {
        super(BonusType.bomb);
    }
}
