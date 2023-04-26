import { _decorator, Component, Node, Label } from 'cc';
import { ButtonBase } from './ButtonBase';
const { ccclass, property } = _decorator;

@ccclass('ButtonBooster')
export class ButtonBooster extends ButtonBase {

    @property(Label)
    countLabel: Label;

    start() {

    }

    onClick() {

    }
}

