import { _decorator, Component, Node } from 'cc';
import {ButtonBase} from "./ButtonBase";
import EventManager from "../../../logic/EventManager";
const { ccclass, property } = _decorator;

@ccclass('ButtonNext')
export class ButtonNext extends ButtonBase {

    onClick() {
        EventManager.dispatch(ButtonNext.name);
    }


}

