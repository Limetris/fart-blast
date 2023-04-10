import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {CellBase} from "./CellBase";
import {Tile} from "../tiles/Tile";
import TileFactory from "../TileFactory";
import {GameFieldCells} from "../field/GameFieldCells";

export type CellCallback = (cell: Cell) => void;

export class Cell extends CellBase {

    private _tiles: Tile[] = [];

    constructor(x: number, y: number, type: CellType = CellType.cell) {
        super(x, y, type);
    }

    get isEmpty(): boolean {
        return (this._tiles.length === 0);
    }

    get tiles(): Tile[] {
        return this._tiles;
    }

    get tile(): Tile | undefined {
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

    eachAround(callback: CellCallback) {
        if(!callback)
            return;

        for(let x = this.x-1, i=0; x <= this.x+1; x++, i++) {
            for(let y = this.y-1, j=0; y <= this.y+1; y++, j++) {
                if (x == this.x && y == this.y)
                    continue;
                this._callbackCell(this.gameField.getCell(x, y), callback)
            }
        }
    }

    eachNeighbor(callback: CellCallback) {
        if(!callback || !this.gameField)
            return;

        this._callbackCell(this.gameField.getCell(this.x - 1, this.y), callback);
        this._callbackCell(this.gameField.getCell(this.x, this.y - 1), callback);
        this._callbackCell(this.gameField.getCell(this.x + 1, this.y), callback);
        this._callbackCell(this.gameField.getCell(this.x, this.y + 1), callback);
    }
    private _callbackCell(cell, callback: CellCallback) {
        if (cell)
            callback(cell);
    }

}
