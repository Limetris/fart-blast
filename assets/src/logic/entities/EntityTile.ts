import EnumToArray from "../utils/EnumToArray";

export enum ColorType {
    yellow,
    red,
    blue,
    green,
    purple
}

export enum BlockType {
    bubble,
    box
}

export enum BonusType {
    rocket,
    bomb,
    disco
}

export type TileType = ColorType | BlockType | BonusType;

export const COLORS = EnumToArray(ColorType);
export const BLOCKS = EnumToArray(BlockType);
export const BONUSES = EnumToArray(BonusType);
