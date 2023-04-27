import { _decorator, Component, Node } from 'cc';
import {WindowBase} from "./WindowBase";
const { ccclass, property } = _decorator;

@ccclass('WindowGameOver')
export class WindowGameOver extends WindowBase {
    static ID = 'WindowGameOver';
}

