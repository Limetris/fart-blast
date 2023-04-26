import {Events} from "../Events";

export abstract class BoosterBase extends Events {
    abstract readonly name: string;
}
