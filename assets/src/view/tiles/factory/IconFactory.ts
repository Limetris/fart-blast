import {_decorator, assert, Component, director, instantiate, Node, Prefab} from 'cc';
import {CellDataAsUnion} from "../../../logic/entities/EntityCell";
import {PrefabTile} from "./PrefabTile";
import {PrefabColorTile} from "./PrefabColorTile";
import {PrefabBonusTile} from "./PrefabBonusTile";
import {PrefabBlockTile} from "./PrefabBlockTile";
import {BlockType, BonusType, ColorType} from "../../../logic/entities/EntityTile";
import {Tile} from "../../../logic/tiles/Tile";
import {Icon} from "../Icon";

const { ccclass, property } = _decorator;

type PrefabTileMap = Map<CellDataAsUnion, PrefabTile>;

@ccclass('IconFactory')
export class IconFactory extends Component {

    @property(PrefabColorTile)
    colorTiles: PrefabColorTile[] = [];

    @property(PrefabBonusTile)
    bonusTiles: PrefabBonusTile[] = [];

    @property(PrefabBlockTile)
    blockTiles: PrefabBlockTile[] = [];

    private _tiles: PrefabTileMap = new Map<CellDataAsUnion, PrefabTile>();

    private static _instance: IconFactory = null;
    public static get instance(): IconFactory {
        assert(this._instance, "IconFactory instance is null");
        return this._instance;
    }

    onLoad() {
        assert(!IconFactory._instance, "Only one instance allowed");
        IconFactory._instance = this;

        this._init();
    }

    private _init() {
        this._regPrefabs(this.colorTiles, ColorType);
        this._regPrefabs(this.bonusTiles, BonusType);
        this._regPrefabs(this.blockTiles, BlockType);
    }

    private _regPrefabs(prefabTiles: PrefabTile[], type: any) {
        prefabTiles.forEach(prefabTile => this._tiles.set(type[prefabTile.type], prefabTile));
    }

    create (tile: Tile): Icon {
        if (!tile)
            return;

        let node = this._createPrefab(tile.typeString);
        if (!node)
            return;
        let icon = node.getComponent(Icon);
        return icon;
    }

    private _createPrefab(type: CellDataAsUnion): Node {
        const prefabTile = this._tiles.get(type);
        return instantiate(prefabTile.prefab);
    }

}

