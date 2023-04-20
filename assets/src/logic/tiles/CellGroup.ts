import {GameFieldLogic} from "../field/GameFieldLogic";
import {Tile} from "./Tile";
import { Cell } from "../cell/Cell";
import {GameFieldCells} from "../field/GameFieldCells";
import {BonusType, TileType} from "../entities/EntityTile";
import {CellTiles} from "../cell/CellTiles";
import {CellDataAsUnion} from "../entities/EntityCell";

export class CellGroup {

    protected gameField: GameFieldCells;
    // protected type: GroupType;
    // get typeGroup(): GroupType { return this.type; };
    protected cells: Set<Cell> = new Set<Cell>();
    get size(): number { return this.cells.size; };

    constructor(cell: Cell) {
        if (cell.gameField) {
            this.gameField = cell.gameField;
            this._searchTiles(cell);
            // this.initType();
        }
    }


    get canHit(): boolean {
        return this.size > 1;
    }

    get canMerge(): boolean {
        return this.size > 4;
    }

    hit(cell: Cell): Tile[] {
        let tiles: Tile[] = [];
        this.cells.forEach((cell) => {
            if(cell.canHit) {
                tiles.push(...cell.hit());
            }
        });
        return tiles;
    }

    burn(cell: Cell) {
        this._removeTiles();
    }

    merge(cell: Cell) {
        this._merge(cell);
    }

    protected _merge(cell: Cell) {
        let bonusType: BonusType;
        if(this.size > 8 ) {
            bonusType = BonusType.disco;
        }
        else if (this.size > 6) {
            bonusType = BonusType.bomb;
        }
        else if (this.size > 4) {
            bonusType = BonusType.rocket;
        }

        this._removeTiles();
        cell.add(BonusType[bonusType] as CellDataAsUnion);
    }


    private _removeTiles() {
        this.cells.forEach((cell) => {
            cell.pop();
        })
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

    protected isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return src.typeString === target.typeString;
    }

    // protected initType() {
    //     if(this.size === 0)
    //         return;
    //     const tile = this.cells.values().next().value as Tile;
    //     this.type = tile.type;
    // }
}
