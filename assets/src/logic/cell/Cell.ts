import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {Tile, TilesHit} from "../tiles/Tile";
import {CellTiles} from "./CellTiles";
import {CellGroup} from "../tiles/CellGroup";

export class Cell extends CellTiles {

    get canHit(): boolean {
        return !this.isHole && !this.isEmpty && this.tile.isAlive;
    }

    hit(): TilesHit {
        let tiles = this.tile?.hit();
        this.pop();
        return tiles;
    }

    create(obj: CellDataAsUnion): Tile {
        this.resetGroup();
        return super.create(obj);
    }

    insert(tile: Tile): Tile {
        this.resetGroup();
        return super.insert(tile);
    }

    replace(obj: CellDataAsUnion): Tile {
        this.resetGroup();
        return super.replace(obj);
    }

    fill(): Tile | undefined {
        this.resetGroup();
        return super.fill();
    }

    pop(): Tile {
        this.resetGroup();
        return super.pop();
    }

    clear(): Tile[] {
        this.resetGroup();
        return super.clear();
    }


}
