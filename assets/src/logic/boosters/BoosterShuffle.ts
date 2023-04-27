import {GameFieldLogic} from "../field/GameFieldLogic";
import {Booster} from "./Booster";
import {Cell} from "../cell/Cell";
import {GFStateShuffle} from "../field/states/GFStateShuffle";
import { Tile } from "../tiles/Tile";

export class BoosterShuffle extends Booster {
    static ID = 'BoosterShuffle';

    apply(gameField: GameFieldLogic): boolean {
        if (!super.apply(gameField))
            return false;
        gameField.toState(GFStateShuffle);
        return true;
    }
}
