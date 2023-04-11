import { Cell } from "../cell/Cell";
import { BonusType, ColorType } from "../entities/EntityTile";
import { TileGroup } from "./TileGroup";
import { BonusGroup } from "./BonusGroup";


export class Group {

    static create(cell: Cell): TileGroup | undefined {
        if(cell.isHole || cell.isEmpty)
            return;

        let group: TileGroup;
        if(cell.tile.type in BonusType) {
            group = new BonusGroup(cell);
        }
        else if (cell.tile.type in ColorType) {
            group = new TileGroup(cell);
        }
        if (group && group.size > 1)
            return group;
    }

}
