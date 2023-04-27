import { _decorator, Component, Node } from 'cc';
import { WindowBase } from './WindowBase';
const { ccclass, property } = _decorator;

@ccclass('WindowWin')
export class WindowWin extends WindowBase {
    static ID = 'WindowWin';
}

