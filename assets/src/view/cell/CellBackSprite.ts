import { _decorator, Component, Node, Prefab, Enum, Sprite, Vec2, SpriteFrame, v2 } from 'cc';
const { ccclass, property } = _decorator;

export enum CellBackType {
    HOLE            = 0,

    LEFT            = 5,
    RIGHT           = 10,
    TOP             = 3,
    BOTTOM          = 12,

    LEFT_TOP        = 1,
    RIGHT_TOP       = 2,
    LEFT_BOTTOM     = 4,
    RIGHT_BOTTOM    = 8,

    OUT_RIGHT_TOP   = 13,
    OUT_LEFT_TOP    = 14,
    OUT_RIGHT_BOTTOM= 7,
    OUT_LEFT_BOTTOM = 11,

    SLASH_RIGHT     = 6,
    SLASH_LEFT      = 9,

    ALL             = 15
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

