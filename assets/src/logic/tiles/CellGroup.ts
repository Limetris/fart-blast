import {Tile, TilesHit} from "./Tile";
import { Cell } from "../cell/Cell";
import {GameFieldCells} from "../field/GameFieldCells";
import {BonusType, ColorType, TileType} from "../entities/EntityTile";
import {CellDataAsUnion} from "../entities/EntityCell";
import {TileDisco} from "./bonus/TileDisco";
import {TileColor} from "./TileColor";

export class CellGroup {

    protected gameField: GameFieldCells;
    protected cells: Set<Cell> = new Set<Cell>();

    constructor(cell: Cell) {
        if (cell.gameField) {
            this.gameField = cell.gameField;
            this._searchTiles(cell);
        }
    }

    get size(): number { return this.cells.size; };
    get canHit(): boolean { return this.size > 1; }
    get canMerge(): boolean { return this.size > 4; }

    get tiles(): Tile[] {
        let tiles: Tile[] = [];
        this.cells.forEach(cell=>  tiles.push(cell.tile));
        return tiles;
    }

    hit(cell: Cell): TilesHit {
        let tiles: Tile[][] = [];
        this.cells.forEach((cell) => {
            if(cell.canHit) {
                tiles.push(...cell.hit());
            }
        });
        return tiles;
    }

    merge(cell: Cell): Tile[] {
        return this._merge(cell);
    }

    protected _merge(cell: Cell): Tile[] {
        let bonusType = this._getNewTypeTile();

        const tileOrigin = cell.tile as TileColor;
        this._removeTiles();
        let tile = cell.create(BonusType[bonusType] as CellDataAsUnion);

        if (tile.typeString === BonusType[BonusType.disco]) {
            let tileDisco = (tile as any) as TileDisco;
            tileDisco.color = tileOrigin.type as ColorType;
        }
        return [tile];
    }

    protected _removeTiles(): Tile[] {
        let tiles: Tile[] = [];
        this.cells.forEach((cell) => {
            tiles.push(cell.pop());
        });
        return tiles;
    }

    protected isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return src.typeString === target.typeString;
    }

    private _getNewTypeTile(): BonusType {
        if(this.size > 8 )
            return BonusType.disco;
        else if (this.size > 6)
            return BonusType.bomb;
        else if (this.size > 4)
            return BonusType.rocket;
    }

    private _searchTiles(cell: Cell) {
        if (cell.isHole || cell.isEmpty)
            return;

        const tile = cell.tile;
        if (!tile)
            return;

        if (cell.group)
            return;

        this._addUniq(cell);
        cell.eachNeighbor((cellTarget: Cell) => {
            if (this._checkCell(cell, cellTarget))
                this._searchTiles(cellTarget);
        });
    }

    private _checkCell(src: Cell, target: Cell): boolean {
        if(target.isEmpty)
            return false;
        if(target.group)
            return false;
        return this.isEqual(src.tile, target.tile);
    }

    private _addUniq(cell: Cell): boolean {
        if (this.cells.has(cell))
            return false;

        cell.setGroup(this);
        this.cells.add(cell);
        return true
    }
}
