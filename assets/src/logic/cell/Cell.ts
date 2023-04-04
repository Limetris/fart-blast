import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {CellBase} from "./CellBase";
import {Tile} from "../tiles/Tile";
import TileFactory from "../TileFactory";

export class Cell extends CellBase {

    private _tiles: Tile[] = [];

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super(x, y, type);

    }
    get isEmpty(): boolean {
        return (this._tiles.length === 0);
    }

    add (obj: Tile | CellDataAsUnion): Tile {
        if(this.isHole)
            return;

        let tile: Tile = (obj instanceof Tile) ? obj : TileFactory.create(obj);
        if (tile)
            this._tiles.push(tile);
        return tile;
    }

    get tile(): Tile {
        return this._tiles[this._tiles.length - 1];
    }

    getTile(layerIndex: number): Tile {
        return this._tiles[layerIndex];
    }

    fill (): Tile {
        if (this.isHole || !this.isEmpty)
            return this.tile;

        let tile = TileFactory.random;
        this.add(tile);
        return tile;
    }

}
