import {CellDataAsUnion} from "./EntityCell";

export type ColumnData = CellDataAsUnion[];

export interface IGameFieldData {
    field: ColumnData[];
}

