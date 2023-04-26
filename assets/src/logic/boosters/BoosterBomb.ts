import {BoosterBase} from "./BoosterBase";
import {GameFieldLogic} from "../field/GameFieldLogic";
import {Cell} from "../cell/Cell";

export class BoosterBomb extends BoosterBase {
    readonly name: string = super.constructor.name;

    apply(gameField: GameFieldLogic, cell: Cell) {

    }
}
