import { _decorator, Component, Node, Enum } from 'cc';
import {BlockType} from "../../../logic/entities/EntityTile";
import {Icon} from "../Icon";
const { ccclass, property } = _decorator;

@ccclass('BlockIcon')
export class BlockIcon extends Icon {
    @property({
        type: Enum(BlockType),
        override: true
    })
    type: BlockType;

    start() {

    }

    update(deltaTime: number) {

    }
}

