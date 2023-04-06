import { _decorator, Node, Enum } from 'cc';
import { PrefabTile } from './PrefabTile';
import {BlockType} from '../../../logic/entities/EntityTile';
const { ccclass, property } = _decorator;

@ccclass('PrefabBlockTile')
export class PrefabBlockTile extends PrefabTile {
    @property({
        type: Enum(BlockType),
        override: true
    })
    type: BlockType;
}


