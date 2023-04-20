import { _decorator, Component, Node } from 'cc';
import {BonusIcon} from "./BonusIcon";
const { ccclass, property } = _decorator;

@ccclass('BombIcon')
export class BombIcon extends BonusIcon {
    start() {
        super.start();
    }

    update(deltaTime: number) {

    }
}

