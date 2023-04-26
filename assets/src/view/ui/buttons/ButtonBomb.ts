import { _decorator, Component, Node } from 'cc';
import {ButtonBooster} from "./ButtonBooster";
const { ccclass, property } = _decorator;

@ccclass('ButtonBomb')
export class ButtonBomb extends ButtonBooster {
    start() {
        super.start();
    }

    onClick() {
        super.onClick();
    }
}

