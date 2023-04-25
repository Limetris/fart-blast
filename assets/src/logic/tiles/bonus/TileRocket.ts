import {BonusType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import EnumToArray from "../../utils/EnumToArray";

export enum RocketDirection {
    horizontal,
    vertical
}
const DIRECTIONS = EnumToArray(RocketDirection);

export class TileRocket extends  TileBonus {

    direction: RocketDirection;
    constructor() {
        super(BonusType.rocket);
        this.direction = Math.floor(Math.random() * DIRECTIONS.length);
    }
}
