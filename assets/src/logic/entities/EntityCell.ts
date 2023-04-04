import {BlockType, BonusType, ColorType} from "./EntityTile";

export enum CellType {
    cell,
    hole
}

export interface ICellBase {
    x: number,
    y: number
}

export interface ICellData extends ICellBase{
    type: CellType
}

export type CellDataAsUnion = keyof typeof CellType | keyof typeof ColorType | keyof typeof BonusType | keyof typeof BlockType
// export type CellDataAsUnion = CellType | ColorType | BonusType | BlockType;
