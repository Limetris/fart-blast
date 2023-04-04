import {BonusType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export class TileRocket extends  TileBonus {

    constructor() {
        super(BonusType.rocket);
    }
}
