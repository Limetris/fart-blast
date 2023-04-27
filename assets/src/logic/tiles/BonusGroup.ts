import {Tile} from "./Tile";
import {Cell} from "../cell/Cell";
import {BonusType, ColorType} from "../entities/EntityTile";
import {CellGroup} from "./CellGroup";
import {CellDataAsUnion} from "../entities/EntityCell";
import {TileDisco} from "./bonus/TileDisco";
import {RocketDirection, TileRocket} from "./bonus/TileRocket";
import {TileBomb} from "./bonus/TileBomb";

export class BonusGroup extends CellGroup {


    constructor(cell: Cell) {
        super(cell);
    }

    get canHit(): boolean { return this.size > 0;  }
    get canMerge(): boolean { return this.size > 1; }

    protected _merge(cell: Cell): Tile[] {
        return this._generateTiles(cell, this._removeTiles());
    }

    protected isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return target.typeString in BonusType;
    }

    protected _generateTiles(cell: Cell, tiles: Tile[]): Tile[] {
        if(this.size === 0)
            return [];

        let countRocket = 0;
        let countBomb   = 0;
        let countDisco  = 0;
        let color: ColorType;

        tiles.forEach((tile) => {
            switch (tile.type) {
                case BonusType.rocket:  countRocket++; break;
                case BonusType.bomb:    countBomb++;   break;
                case BonusType.disco:
                    color = (tile as TileDisco).color;
                    countDisco++;
                break;
            }
        });

        if (countDisco > 1)
            return [this._generateBlastAll(cell)];

        else if (countDisco > 0 && countBomb > 0)
            return this._generateTile(cell, color, BonusType.bomb);

        else if (countDisco > 0 && countRocket > 0)
            return this._generateTile(cell, color, BonusType.rocket);

        else if (countBomb > 1)
            return [this._generateBigBlast(cell)];

        else if (countBomb > 0 && countRocket > 0)
            return [this._generateRocketCross(cell, 1)];

        else if (countRocket > 1)
            return [this._generateRocketCross(cell)];
        return [];
    }

    private _generateRocketCross(cell: Cell, radius: number = 0): Tile {
        let tile = cell.create(BonusType[BonusType.rocket] as CellDataAsUnion) as TileRocket;
        tile.radius = radius;
        tile.direction = RocketDirection.cross;
        return tile;
    }

    private _generateBigBlast(cell: Cell, radius: number = 2): Tile {
        let tile = cell.create(BonusType[BonusType.bomb] as CellDataAsUnion) as TileBomb;
        tile.radius = radius;
        return tile;
    }

    private _generateTile(cell: Cell, color: ColorType, tileType: BonusType): Tile[] {
        let tiles: Tile[] = [];
        const colorType = ColorType[color];
        this.gameField.eachCell((cell: Cell) => {
            if (cell.tile?.typeString === colorType) {
                let tile = cell.replace(BonusType[tileType] as CellDataAsUnion);
                tiles.push(tile);
            }
        });
        return tiles;
    }

    private _generateBlastAll(cell: Cell): Tile {
        return this._generateBigBlast(cell, Math.max(this.gameField.columnCount, this.gameField.rowCount));
    }
}
