import {CellDataAsUnion} from "./entities/EntityCell";
import {Tile} from "./tiles/Tile";
import {BlockType, BonusType, ColorType} from "./entities/EntityTile";
import {TileColor} from "./tiles/TileColor";
import {TileRocket} from "./tiles/bonus/TileRocket";
import {TileBomb} from "./tiles/bonus/TileBomb";
import {TileDisco} from "./tiles/bonus/TileDisco";
import {TileBox} from "./tiles/block/TileBox";
import {TileBubble} from "./tiles/block/TileBubble";

const TILE_CLASSES = {
    [BonusType[BonusType.rocket]]:      TileRocket,
    [BonusType[BonusType.bomb]]:        TileBomb,
    [BonusType[BonusType.disco]]:       TileDisco,

    [BlockType[BlockType.box]]:         TileBox,
    [BlockType[BlockType.bubble]]:      TileBubble
};

class TileFactory {

    constructor() {

    }

    create (obj: CellDataAsUnion): Tile | undefined {

        if (obj in ColorType)
            return this.createTileColor(ColorType[obj]);

        const tileClass = TILE_CLASSES[obj];
        if(!tileClass)
            return;

        return new tileClass();
    }

    createTileColor(colorType: ColorType): TileColor {
        return new TileColor(colorType);
    }
}

export default new TileFactory();
