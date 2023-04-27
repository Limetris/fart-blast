import {BonusType, ColorType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import {Tile, TilesHit} from "../Tile";
import { Cell } from "../../cell/Cell";

export class TileDisco extends  TileBonus {

    color: ColorType;
    constructor() {
        super(BonusType.disco);
        this.color = Math.floor(Math.random() * COLORS.length);
    }

    hit(): TilesHit {
        let tiles = super.hit();

        const colorType = ColorType[this.color];
        this.gameField.eachCell((cell: Cell) => {
            if (cell.tile?.typeString === colorType) {
                Tile.tilesHitMerge(cell.hit(), tiles);
            }
        });
        return tiles;
    }
}
