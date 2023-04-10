import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {CellBase} from "./CellBase";
import {Tile} from "../tiles/Tile";
import TileFactory from "../TileFactory";
import {GameField} from "../field/GameField";

export type CellCallback = (cell: Cell, i: number, j: number) => void;

export class Cell extends CellBase {

    private _tiles: Tile[] = [];

    constructor(gameField: GameField, x: number, y: number, type: CellType = CellType.cell) {
        super(gameField, x, y, type);

    }

    get isEmpty(): boolean {
        return (this._tiles.length === 0);
    }

    get tiles(): Tile[] {
        return this._tiles;
    }

    get tile(): Tile {
        return this._tiles[this._tiles.length - 1];
    }

    add (obj: Tile | CellDataAsUnion): Tile {
        if(this.isHole)
            return;

        let tile: Tile = (obj instanceof Tile) ? obj : TileFactory.create(obj);
        if (tile)
            this._tiles.push(tile);
        return tile;
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

    eachNeighbor(callback: CellCallback) {
        if(!callback)
            return;

        for(let x = this.x-1, i=0; x <= this.x+1; x++, i++) {
            for(let y = this.y-1, j=0; y <= this.y+1; y++, j++) {
                if (x == this.x && y == this.y)
                    continue;
                let cell = this.gameField.getCell(x, y);
                callback(cell, i, j);
            }
        }
    }

}
