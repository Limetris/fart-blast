import {_decorator, assert, Component, director, instantiate, Node, Prefab} from 'cc';
import {CellBackSprite, CellBackType} from "./CellBackSprite";

const { ccclass, property } = _decorator;

type SpriteMap = Map<CellBackType, CellBackSprite>;
export type CellMap = boolean[][];

@ccclass('CellBackFactory')
export class CellBackFactory extends Component {

    @property([CellBackSprite])
    backs: CellBackSprite[] = [];

    private _backs: SpriteMap = new Map<CellBackType, CellBackSprite>();

    private static _instance: CellBackFactory = null;
    public static get instance(): CellBackFactory {
        assert(this._instance, "CellBackFactory instance is null");
        return this._instance;
    }

    onLoad() {
        assert(!CellBackFactory._instance, "Only one instance allowed");
        CellBackFactory._instance = this;
        this._init();
    }

    private _init() {
        this.backs.forEach(back => this._backs.set(back.type, back));
    }

    get(cellBackType: CellBackType): CellBackSprite {
        return this._backs.get(cellBackType);
    }

}

