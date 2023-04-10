import {GameFieldLogic} from "../field/GameFieldLogic";
import {Tile} from "./Tile";
import { Cell } from "../cell/Cell";
import {GameFieldCells} from "../field/GameFieldCells";
import {TileType} from "../entities/EntityTile";


export class TileGroup {

    private _gameField: GameFieldCells;
    private _type: TileType;
    get type(): TileType { return this._type; };
    private _tiles: Set<Tile> = new Set<Tile>();
    get size(): number { return this._tiles.size; };



    constructor(cell: Cell) {
        if (cell.gameField) {
            this._gameField = cell.gameField;
            this._searchTiles(cell);
            this._initType();
        }
    }

    static create(cell: Cell): TileGroup | undefined {
        let group = new TileGroup(cell);
        if (group.size < 2)
            return;
        return group;
    }

    private _searchTiles(cell: Cell) {
        if (cell.isEmpty)
            return;

        const tile = cell.tile;
        if (!tile)
            return;

        if (tile.group)
            return;

        this._addUniq(tile);
        cell.eachNeighbor((cell) => {
            if (this._checkCell(tile, cell))
                this._searchTiles(cell);
        });
    }

    private _checkCell(srcTile: Tile, cell: Cell): boolean {
        if(cell.isEmpty)
            return false;
        if(cell.tile.group)
            return false;
        return this._isEqual(srcTile, cell.tile);
    }

    private _isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return src.type === target.type;
    }

    private _addUniq(tile: Tile): boolean {
        if (this._tiles.has(tile))
            return false;

        tile.setGroup(this);
        this._tiles.add(tile);
        return true
    }

    private _initType() {
        if(this.size === 0)
            return;
        const tile = this._tiles.values().next().value as Tile;
        this._type = tile.type;
    }
}
