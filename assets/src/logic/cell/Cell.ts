import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {CellBase} from "./CellBase";
import {Tile} from "../tiles/Tile";
import TileFactory from "../TileFactory";

export class Cell extends CellBase {

    private _tiles: Tile[] = [];

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super(x, y, type);

    }

    add (obj: Tile | CellDataAsUnion): Tile {
        let tile: Tile = (obj instanceof Tile) ? obj : TileFactory.create(obj);
        this._tiles.push(tile);
        return tile;
    }

    get tile(): Tile {
        return this._tiles[this._tiles.length - 1];
    }
    getTile(layerIndex: number): Tile {
        return this._tiles[layerIndex];
    }

}
