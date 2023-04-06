import { _decorator, Component, Node, Prefab, Enum } from 'cc';
import {TileType} from "../../../logic/entities/EntityTile";
const { ccclass, property } = _decorator;

@ccclass('PrefabTile')
export class PrefabTile {

    @property
    type: TileType;

    @property(Prefab)
    prefab: Prefab;
}

