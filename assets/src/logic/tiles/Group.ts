import { Cell } from "../cell/Cell";
import { BonusType, ColorType } from "../entities/EntityTile";
import { CellGroup } from "./CellGroup";
import { BonusGroup } from "./BonusGroup";


export class Group {

    static create(cell: Cell): CellGroup | undefined {
        if(cell.isHole || cell.isEmpty)
            return;

        let group: CellGroup;
        if(cell.tile.typeString in BonusType) {
            group = new BonusGroup(cell);
        }
        else if (cell.tile.typeString in ColorType) {
            group = new CellGroup(cell);
        }
        if (group && group.size > 1)
            return group;
    }

}
