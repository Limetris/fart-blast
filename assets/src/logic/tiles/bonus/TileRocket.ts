import {BonusType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";

export enum RocketDirection {
    horizontal,
    vertical
}

export class TileRocket extends  TileBonus {

    direction: RocketDirection;
    constructor() {
        super(BonusType.rocket);
        this.direction = Math.floor(Math.random() * Object.keys(RocketDirection).length);
    }
}
