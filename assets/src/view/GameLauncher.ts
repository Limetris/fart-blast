import { _decorator, Component, Node, director, assert } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameLauncher')
export class GameLauncher extends Component {
    private static _instance: GameLauncher = null;

    public static get instance(): GameLauncher {
        assert(this._instance, "GameLauncher instance is null");
        return this._instance;
    }

    onLoad() {
        director.addPersistRootNode(this.node);
        assert(!GameLauncher._instance, "Only one instance allowed");
        GameLauncher._instance = this;
    }
}

