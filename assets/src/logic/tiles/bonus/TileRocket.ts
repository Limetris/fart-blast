import {BonusType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import EnumToArray from "../../utils/EnumToArray";
import {Tile, TileEvent, TilesHit} from "../Tile";

export enum RocketDirection {
    horizontal,
    vertical,
    cross
}
const DIRECTIONS = EnumToArray(RocketDirection);

export class TileRocket extends  TileBonus {

    radius: number = 0;
    direction: RocketDirection;

    constructor() {
        super(BonusType.rocket);
        this.direction = Math.floor(Math.random() * 2);
    }

    hit(): TilesHit {
        let tiles = super.hit();

        switch (this.direction) {
            case RocketDirection.horizontal:
                Tile.tilesHitMerge(this._hitHorizontal(), tiles);
                break;
            case RocketDirection.vertical:
                Tile.tilesHitMerge(this._hitVertical(), tiles);
                break;
            case RocketDirection.cross:
                Tile.tilesHitMerge(this._hitHorizontal(), tiles);
                Tile.tilesHitMerge(this._hitVertical(), tiles);
                break;
        }

        return tiles;
    }

    private _hitHorizontal(): TilesHit {
        let tiles: TilesHit = [];

        for (let i = 1; i < this.gameField.columnCount; i++) {
            let tilesGroup: TilesHit = [];
            for (let y = this.y - this.radius; y <= this.y + this.radius; y++) {
                Tile.tilesHitMerge(this.gameField.hitCell(this.x + i, y), tilesGroup);
                Tile.tilesHitMerge(this.gameField.hitCell(this.x - i, y), tilesGroup);
            }
            tiles.push(...tilesGroup);
        }
        return tiles;
    }

    private _hitVertical() {
        let tiles: TilesHit = [];
        for (let i = 1; i < this.gameField.rowCount; i++) {
            let tilesGroup: TilesHit = [];
            for (let x = this.x - this.radius; x <= this.x + this.radius; x++) {
                Tile.tilesHitMerge(this.gameField.hitCell(x, this.y + i), tilesGroup);
                Tile.tilesHitMerge(this.gameField.hitCell(x, this.y - i), tilesGroup);
            }
            tiles.push(...tilesGroup);
        }
        return tiles;
    }



}
