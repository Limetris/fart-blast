import { _decorator, Component, Node, Enum } from 'cc';
import {ColorType} from "../../logic/entities/EntityTile";
import {Icon} from "./Icon";
const { ccclass, property } = _decorator;

@ccclass('ColorIcon')
export class ColorIcon extends Icon {
    @property({
        type: Enum(ColorType),
        override: true
    })
    type: ColorType;

    start() {

    }

    update(deltaTime: number) {

    }
}

