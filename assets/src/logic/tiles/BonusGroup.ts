import {GameFieldLogic} from "../field/GameFieldLogic";
import {Tile} from "./Tile";
import { Cell } from "../cell/Cell";
import {GameFieldCells} from "../field/GameFieldCells";
import {BonusType, TileType} from "../entities/EntityTile";
import { CellGroup } from "./CellGroup";


export enum GroupType {
    RocketCross,
    RocketCross3,
    BigBlast,
    GenerateRockets,
    GenerateBombs,
    BlastAll
}

export class BonusGroup extends CellGroup {

    protected type: GroupType;
    get typeGroup(): GroupType { return this.type; };

    constructor(cell: Cell) {
        super(cell);
        this.initType();
    }

    get canHit(): boolean {
        return this.size > 0;
    }

    get canMerge(): boolean {
        return this.size > 1;
    }

    protected _burn(cell: Cell) {

    }

    protected _merge(cell: Cell) {
        cell.pop();
        // cell.insert(BonusType[bonusType])
    }

    protected isEqual(src: Tile, target: Tile): boolean {
        if (!src || !target)
            return false;
        return target.typeString in BonusType;
    }

    protected initType() {
        if(this.size === 0)
            return;

        let countRocket = 0;
        let countBomb   = 0;
        let countDisco  = 0;

        this.cells.forEach((cell) => {
            if (cell.isEmpty)
                return;
            switch (cell.tile.type) {
                case BonusType.rocket:  countRocket++; break;
                case BonusType.bomb:    countBomb++;   break;
                case BonusType.disco:   countDisco++;  break;
            }
        });

        if (countDisco > 1)
            this.type = GroupType.BlastAll;

        else if (countDisco > 0 && countBomb > 0)
            this.type = GroupType.GenerateBombs;

        else if (countDisco > 0 && countRocket > 0)
            this.type = GroupType.GenerateRockets;

        else if (countBomb > 1)
            this.type = GroupType.BigBlast;

        else if (countBomb > 0 && countRocket > 0)
            this.type = GroupType.RocketCross3;

        else if (countRocket > 1)
            this.type = GroupType.RocketCross;
    }
}
