import {GameFieldLogic} from "../field/GameFieldLogic";
import {Cell} from "../cell/Cell";
import { Booster } from "./Booster";
import {BonusType} from "../entities/EntityTile";
import {CellDataAsUnion} from "../entities/EntityCell";
import {TileBomb} from "../tiles/bonus/TileBomb";
import {GFStateHit} from "../field/states/GFStateHit";

export class BoosterBomb extends Booster {
    readonly name: string = this.constructor.name;

    apply(gameField: GameFieldLogic, cell: Cell): boolean {
        if (!super.apply(gameField))
            return false;

        let tile = cell.replace(BonusType[BonusType.bomb] as CellDataAsUnion) as TileBomb;
        tile.radius = 3;
        gameField.toState(GFStateHit, cell);
    }
}
