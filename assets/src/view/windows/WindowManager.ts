import { _decorator, Component, Node, assert, Prefab, log, instantiate } from 'cc';
import {WindowBase} from "./WindowBase";
const { ccclass, property } = _decorator;

type WindowMap = Map<string, WindowBase>;
type WindowPrefabMap = Map<string, Prefab>;

@ccclass('WindowManager')
export class WindowManager extends Component {

    @property(Prefab)
    windowsPrefab: Prefab[] = [];

    private _windowPrefabMap: WindowPrefabMap = new Map<string, Prefab>();
    private _currentWindow: WindowBase;
    private static _instance: WindowManager = null;

    public static get instance(): WindowManager {
        assert(this._instance, "WindowManager instance is null");
        return this._instance;
    }

    onLoad() {
        assert(!WindowManager._instance, "Only one instance allowed");
        WindowManager._instance = this;

        this._initWindows();
    }

    private _initWindows() {
        this._windowPrefabMap.clear();

        this.windowsPrefab.forEach((prefab) => {
            // const windowNode = prefab.data as Node;
            // let window = windowNode.getComponent(WindowBase);
            this._windowPrefabMap.set(prefab.data.name, prefab);
        })
    }

    private _createWindow(windowType: string): WindowBase {
        let prefab = this._windowPrefabMap.get(windowType);
        if (!prefab)
            return;
        let node = instantiate(prefab)
        return node.getComponent(WindowBase);
    }

    open(windowType: any, ...args: any[]) {
        if (typeof windowType !== 'string')
            windowType = windowType.name;

        let window = this._createWindow(windowType);
        if(!window)
            return;

        window.node.setParent(this.node);
        window.open(args);
        this._currentWindow = window;
    }

    close(){

    }
}
