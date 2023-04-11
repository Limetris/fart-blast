import {GameFieldLogic} from "../field/GameFieldLogic";
import {Tile} from "./Tile";
import { Cell } from "../cell/Cell";
import {GameFieldCells} from "../field/GameFieldCells";
import {TileType} from "../entities/EntityTile";

export class TileGroup {

    protected gameField: GameFieldCells;
    // protected type: GroupType;
    // get typeGroup(): GroupType { return this.type; };
    protected tiles: Set<Tile> = new Set<Tile>();
    get size(): number { return this.tiles.size; };



    constructor(cell: Cell) {
        if (cell.gameField) {
            this.gameField = cell.gameField;
            this._searchTiles(cell);
            // this.initType();
        }
    }

    static create(cell: Cell): TileGroup | undefined {
        let group = new TileGroup(cell);
        if (group.size < 2)
            return;
        return group;
    }

    private _searchTiles(cell: Cell) {
        if (cell.isHole || cell.isEmpty)
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
        return this.isEqual(srcTile, cell.tile);
    }

    private _addUniq(tile: Tile): boolean {
        if (this.tiles.has(tile))
            return false;

        tile.setGroup(this);
        this.tiles.add(tile);
        return true
    }

    protected isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return src.type === target.type;
    }
    //
    // protected initType() {
    //     if(this.size === 0)
    //         return;
    //     const tile = this.tiles.values().next().value as Tile;
    //     this.type = tile.type;
    // }
}
