import { _decorator, Component, Node, Enum } from 'cc';
import {PrefabTile} from "./PrefabTile";
import {ColorType} from "../../../logic/entities/EntityTile";
const { ccclass, property } = _decorator;

@ccclass('PrefabColorTile')
export class PrefabColorTile extends PrefabTile {
    @property({
        type: Enum(ColorType),
        override: true
    })
    type: ColorType;
}

