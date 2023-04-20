import {StateBase} from "../../fsm/StateBase";
import {GameFieldLogic} from "../GameFieldLogic";

export abstract class GFState extends StateBase {
    context: GameFieldLogic;
}
