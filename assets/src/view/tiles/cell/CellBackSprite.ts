import { _decorator, Component, Node, Prefab, Enum, Sprite, Vec2, SpriteFrame, v2 } from 'cc';
import {TileType} from "../../../logic/entities/EntityTile";
const { ccclass, property } = _decorator;

// TODO: заменить на другую систему тайлов 8 угло + 4 стены + полнотелый
export enum CellBackType {
    AROUND  = 0,
    TRB     = 1,
    RBL     = 2,
    RB      = 3,
    BLT     = 4,
    TB      = 5,
    LB      = 6,
    B       = 7,
    LTB     = 8,
    RT      = 9,
    LR      = 10,
    R       = 11,
    LT      = 12,
    T       = 13,
    L       = 14,
    MIDDLE  = 15
}

@ccclass('CellBackSprite')
export class CellBackSprite {

    @property({type: Enum(CellBackType)})
    type: CellBackType;

    @property(SpriteFrame)
    spriteFrame: SpriteFrame;

    @property
    offset: Vec2 = v2(0, 0);
}

