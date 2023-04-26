import {_decorator, Enum, v2, v3, Quat, Sprite} from 'cc';
import {BonusIcon} from "./BonusIcon";
import {BonusType} from "../../../logic/entities/EntityTile";
import {RocketDirection, TileRocket} from "../../../logic/tiles/bonus/TileRocket";

const { ccclass, property } = _decorator;

@ccclass('RocketIcon')
export class RocketIcon extends BonusIcon {
    @property({
        type: Enum(BonusType),
        visible: false,
        override: true
    })
    type: BonusType = BonusType.rocket;
    tile: TileRocket;

    start() {
        this.sprite = this.getComponentInChildren(Sprite);
        if (this.tile.direction === RocketDirection.vertical)
            this.sprite.node.rotate(Quat.fromEuler(new Quat(), 0, 0, 90));

    }

}

