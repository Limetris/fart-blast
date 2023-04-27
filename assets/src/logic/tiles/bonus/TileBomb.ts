import {BonusType} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import {Tile, TilesHit} from "../Tile";
import {RocketDirection} from "./TileRocket";

export class TileBomb extends  TileBonus {

    radius: number = 1;
    constructor() {
        super(BonusType.bomb);
    }


    hit(): TilesHit {
        let tiles = super.hit();

        for (let x = this.x - this.radius; x <= this.x + this.radius; x++) {
            for (let y = this.y - this.radius; y <= this.y + this.radius; y++) {
                if (this.x === x && this.y === y)
                    continue;
                Tile.tilesHitMerge(this.gameField.hitCell(x, y), tiles);
            }
        }
        return tiles;
    }
}
