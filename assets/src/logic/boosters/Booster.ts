import {GameFieldLogic} from "../field/GameFieldLogic";
import {BoosterBase} from "./BoosterBase";

export abstract class Booster extends BoosterBase {

    count: number = 3;

    apply(gameField: GameFieldLogic, ...args: any[]) {

    }

}
