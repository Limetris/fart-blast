import { _decorator, Component, Node } from 'cc';
import {ButtonBase} from "./ButtonBase";
import EventManager from "../../../logic/EventManager";
const { ccclass, property } = _decorator;

@ccclass('ButtonRetry')
export class ButtonRetry extends ButtonBase {
    static ID = 'ButtonRetry';
    onClick() {
        EventManager.dispatch(ButtonRetry.ID);
    }


}

