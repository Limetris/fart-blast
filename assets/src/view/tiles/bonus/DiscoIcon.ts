import { _decorator, Component, Node, Enum, Color } from 'cc';
import {BonusIcon} from "./BonusIcon";
import {BonusType, ColorType} from "../../../logic/entities/EntityTile";
const { ccclass, property } = _decorator;

const Colors = {
    [ColorType.green]:  '#77be3a',
    [ColorType.purple]: '#ad3b99',
    [ColorType.red]:    '#d73550',
    [ColorType.blue]:   '#1e90df',
    [ColorType.yellow]: '#dd9f1a'
};

@ccclass('DiscoIcon')
export class DiscoIcon extends BonusIcon {
    @property({
        type: Enum(BonusType),
        visible: false,
        override: true
    })
    type: BonusType = BonusType.disco;

    @property({
        type: Enum(ColorType)
    })
    color: ColorType;

    start() {
        this.sprite.color = new Color(Colors[this.color]);
    }

    update(deltaTime: number) {

    }
}

