import {BonusType, ColorType, COLORS} from "../../entities/EntityTile";
import { TileBonus } from "./TileBonus";
import {Tile} from "../Tile";
import { Cell } from "../../cell/Cell";

export class TileDisco extends  TileBonus {

    color: ColorType;
    constructor() {
        super(BonusType.disco);
        this.color = Math.floor(Math.random() * COLORS.length);
    }

    hit(): Tile[] {
        let tiles: Tile[] = super.hit();

        const colorType = ColorType[this.color];
        this.gameField.eachCell((cell: Cell) => {
            if (cell.tile?.typeString === colorType) {
                tiles.push(...cell.hit());
            }
        });
        return tiles;
    }
}
