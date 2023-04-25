import {BonusType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import EnumToArray from "../../utils/EnumToArray";
import {Tile, TileEvent} from "../Tile";

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

    hit(): Tile[] {
        let tiles: Tile[] = super.hit();

        if(this.direction === RocketDirection.horizontal) {
            for (let i = 1; i < this.gameField.columnCount; i++) {
                tiles.push(...this.gameField.hitCell(this.x + i, this.y));
                tiles.push(...this.gameField.hitCell(this.x - i, this.y));
            }
        }
        else {
            for (let i = 1; i < this.gameField.rowCount; i++) {
                tiles.push(...this.gameField.hitCell(this.x, this.y + i));
                tiles.push(...this.gameField.hitCell(this.x, this.y - i));
            }
        }

        return tiles;
    }


}
