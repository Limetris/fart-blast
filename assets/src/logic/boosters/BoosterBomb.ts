import {GameFieldLogic} from "../field/GameFieldLogic";
import {Cell} from "../cell/Cell";
import { Booster } from "./Booster";

export class BoosterBomb extends Booster {
    readonly name: string = this.constructor.name;

    apply(gameField: GameFieldLogic, cell: Cell): boolean {
        if (!super.apply(gameField))
            return false;
    }
}
