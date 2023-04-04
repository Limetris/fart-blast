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


export const COLORS = Object.keys(ColorType);
export const BLOCKS = Object.keys(BlockType);
export const BONUSES = Object.keys(BonusType);
