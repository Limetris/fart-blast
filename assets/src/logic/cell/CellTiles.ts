import {CellDataAsUnion, CellType, ICellData} from "../entities/EntityCell";
import {CellBase} from "./CellBase";
import {Tile, TileEvent} from "../tiles/Tile";
import TileFactory from "../TileFactory";
import {Cell} from "./Cell";
import {TileTypeToShort} from "../entities/EntityTile";

export type CellCallback = (cell: CellTiles) => void;

export enum CellTilesEvent {
    insert,
    create,
    replace,
    pop

}

export class CellTiles extends CellBase {

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


    create (obj: CellDataAsUnion): Tile {
        if(this.isHole)
            return;
        let tile: Tile = TileFactory.create(obj);
        this._push(tile);
        this.dispatch(CellTilesEvent.create, tile);
        return tile;
    }

    replace (obj: CellDataAsUnion): Tile {
        this.clear();
        if(this.isHole)
            return;
        let tile: Tile = TileFactory.create(obj);
        this._push(tile);
        this.dispatch(CellTilesEvent.replace, tile);
        return tile;
    }

    insert (tile: Tile): Tile {
        if(this.isHole)
            return;
        this._push(tile);
        this.dispatch(CellTilesEvent.insert, tile);
        return tile;
    }

    fill (): Tile | undefined {
        if (this.isHole || !this.isEmpty)
            return;
        return this.create(TileFactory.randomType);
    }


    pop(): Tile {
        let tile = this._tiles.pop();
        this._tileReset(tile);
        return tile;
    }

    clear(): Tile[] {
        let tiles: Tile[] = [];
        while(!this.isEmpty)
            tiles.push(this.pop());
        return tiles;
    }

    remove(tile: Tile) {
        const index = this._tiles.indexOf(tile);
        if (index > -1)
            this._tiles.splice(index, 1);
        this._tileReset(tile);
    }

    private _tileReset(tile: Tile) {
        tile.unsubscribeTag(this);
        tile.resetCell();
    }

    private _push(tile: Tile) {
        if (!tile)
            return;
        this._tiles.push(tile);

        tile.subscribe(TileEvent.destroy, this.onTileDestroy.bind(this), this);

        tile.setGameField(this.gameField);
        tile.setCell(this);
    }

    onTileDestroy(tile: Tile) {
        this.remove(tile);
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

    toString() {
        if(this.isHole)
            return '_';
        if(this.isEmpty)
            return 'e';
        return TileTypeToShort[this.tile.typeString];
    }
}
