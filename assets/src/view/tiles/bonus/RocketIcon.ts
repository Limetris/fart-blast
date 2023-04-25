import {_decorator, Enum} from 'cc';
import {BonusIcon} from "./BonusIcon";
import {BonusType} from "../../../logic/entities/EntityTile";

const { ccclass, property } = _decorator;

@ccclass('RocketIcon')
export class RocketIcon extends BonusIcon {
    @property({
        type: Enum(BonusType),
        visible: false,
        override: true
    })
    type: BonusType = BonusType.rocket;

    start() {

    }

    update(deltaTime: number) {

    }
}

