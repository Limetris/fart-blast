import { _decorator, Component, Node, Enum } from 'cc';
import {BonusType} from "../../../logic/entities/EntityTile";
import {Icon} from "../Icon";
const { ccclass, property } = _decorator;

@ccclass('BonusIcon')
export class BonusIcon extends Icon {
    @property({
        type: Enum(BonusType),
        override: true
    })
    type: BonusType;

    start() {

    }

    update(deltaTime: number) {

    }
}

