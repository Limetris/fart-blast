import {BonusType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import EnumToArray from "../../utils/EnumToArray";
import {Tile, TileEvent} from "../Tile";

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

    hit(): Tile[] {
        let tiles: Tile[] = super.hit();

        switch (this.direction) {
            case RocketDirection.horizontal:
                tiles.push(...this._hitHorizontal());
                break;
            case RocketDirection.vertical:
                tiles.push(...this._hitVertical());
                break;
            case RocketDirection.cross:
                tiles.push(...this._hitHorizontal());
                tiles.push(...this._hitVertical());
                break;
        }

        return tiles;
    }

    private _hitHorizontal(): Tile [] {
        let tiles: Tile[] = [];

        for (let y = this.y - this.radius; y <= this.y + this.radius; y++) {
            for (let i = 1; i < this.gameField.columnCount; i++) {
                tiles.push(...this.gameField.hitCell(this.x + i, y));
                tiles.push(...this.gameField.hitCell(this.x - i, y));
            }
        }
        return tiles;
    }

    private _hitVertical() {
        let tiles: Tile[] = [];
        for (let x = this.x - this.radius; x <= this.x + this.radius; x++) {
            for (let i = 1; i < this.gameField.rowCount; i++) {
                tiles.push(...this.gameField.hitCell(x, this.y + i));
                tiles.push(...this.gameField.hitCell(x, this.y - i));
            }
        }
        return tiles;
    }


}
