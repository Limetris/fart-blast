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

export const y = 'yellow';
export const r = 'red';
export const p = 'purple';
export const b = 'blue';
export const g = 'green';

export const e = 'cell';
export const _ = 'hole';

export const O = 'bubble';
export const X = 'box';

export const B = 'bomb';
export const R = 'rocket';
export const D = 'disco';


export const TileTypeToShort = {
    [ColorType[ColorType.yellow]]:  'y',
    [ColorType[ColorType.red]]:     'r',
    [ColorType[ColorType.purple]]:  'p',
    [ColorType[ColorType.blue]]:    'b',
    [ColorType[ColorType.green]]:   'g',

    [BonusType[BonusType.rocket]]:  'R',
    [BonusType[BonusType.bomb]]:    'B',
    [BonusType[BonusType.disco]]:   'D'

};

export const ShortToTileType = {
    'y': [ColorType[ColorType.yellow]],
    'r': [ColorType[ColorType.red]],
    'p': [ColorType[ColorType.purple]],
    'b': [ColorType[ColorType.blue]],
    'g': [ColorType[ColorType.green]],

    'R': [BonusType[BonusType.rocket]],
    'B': [BonusType[BonusType.bomb]],
    'D': [BonusType[BonusType.disco]]
};
