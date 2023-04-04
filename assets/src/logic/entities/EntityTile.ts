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
