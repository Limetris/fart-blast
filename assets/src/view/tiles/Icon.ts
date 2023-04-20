import { _decorator, Component, Node, Sprite, Color, log } from 'cc';
import {IconBase} from "./IconBase";
import { Cell } from '../../logic/cell/Cell';
import {Tile, TileEvent} from '../../logic/tiles/Tile';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('Icon')
@requireComponent(Sprite)
export class Icon extends IconBase {

    private _sprite: Sprite;

    onLoad() {
        this._sprite = this.getComponent(Sprite);
        this.tile.subscribe(TileEvent.hit, this.onTileHit.bind(this), this);
        this.tile.subscribe(TileEvent.destroy, this.onTileDestroy.bind(this), this);
    }

    onDestroy() {
        this.tile.unsubscribeTag(this);
    }

    alpha(alpha: number) {
        if(!this._sprite)
            return;
        let color = this._sprite.color;
        this._sprite.color = new Color(color.r, color.g, color.b, 255 * alpha);
    }

    onTileHit(tile: Tile, cell: Cell) {
        log(this.tile);
    }

    onTileDestroy(tile: Tile, cell: Cell) {

    }

}

