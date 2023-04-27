import {GameFieldLogic} from "../field/GameFieldLogic";
import {Booster} from "./Booster";
import {GFStateShuffle} from "../field/states/GFStateShuffle";

export class BoosterShuffle extends Booster {
    static ID = 'BoosterShuffle';

    apply(gameField: GameFieldLogic): boolean {
        if (!super.apply(gameField))
            return false;
        gameField.toState(GFStateShuffle);
        return true;
    }
}
