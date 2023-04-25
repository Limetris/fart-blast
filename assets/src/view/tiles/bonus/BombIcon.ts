import { _decorator, Component, Node, Enum } from 'cc';
import {BonusIcon} from "./BonusIcon";
import {BonusType} from "../../../logic/entities/EntityTile";
import {TileBomb} from "../../../logic/tiles/bonus/TileBomb";
const { ccclass, property } = _decorator;

@ccclass('BombIcon')
export class BombIcon extends BonusIcon {
    @property({
        type: Enum(BonusType),
        visible: false,
        override: true
    })
    type: BonusType = BonusType.bomb;
    tile: TileBomb;
    start() {
        super.start();
    }

    update(deltaTime: number) {

    }
}

