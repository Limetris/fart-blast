import { _decorator, Component, Node, Enum } from 'cc';
import {PrefabTile} from "./PrefabTile";
import {BonusType} from "../../../logic/entities/EntityTile";
const { ccclass, property } = _decorator;

@ccclass('PrefabBonusTile')
export class PrefabBonusTile extends PrefabTile {
    @property({
        type: Enum(BonusType),
        override: true
    })
    type: BonusType;
}

