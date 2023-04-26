import { _decorator, Component, Node } from 'cc';
import {ButtonBase} from "./ButtonBase";
import EventManager from "../../../logic/EventManager";
const { ccclass, property } = _decorator;

@ccclass('ButtonRetry')
export class ButtonRetry extends ButtonBase {

    onClick() {
        EventManager.dispatch(ButtonRetry.name);
    }


}

