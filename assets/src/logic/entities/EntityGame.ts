import {CellDataAsUnion} from "./EntityCell";

export type ColumnData = CellDataAsUnion[];

export interface IGameFieldData {
    field: ColumnData[]
    colors: CellDataAsUnion[]
    steps: number
    points: number
}

