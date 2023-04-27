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

        for (let r = 1; r <= this.radius; r++) {
            let tilesHit = this._hitRadius(r);
            tiles.push(...tilesHit);
        }
        return tiles;
    }

    private _hitRadius(radius: number = 1): TilesHit {
        let tiles: TilesHit = [];

        const xStart    = this.x - radius;
        const xEnd      = this.x + radius;
        const yStart    = this.y - radius;
        const yEnd      = this.y + radius;
        for (let x = xStart; x <= xEnd; x++) {
            Tile.tilesHitMerge(this.gameField.hitCell(x, yStart), tiles);
            Tile.tilesHitMerge(this.gameField.hitCell(x, yEnd), tiles);
        }
        for (let y = yStart + 1; y <= yEnd - 1; y++) {
            Tile.tilesHitMerge(this.gameField.hitCell(xStart, y), tiles);
            Tile.tilesHitMerge(this.gameField.hitCell(xEnd, y), tiles);
        }
        return tiles;
    }
}
