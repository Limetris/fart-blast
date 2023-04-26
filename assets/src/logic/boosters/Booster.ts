import {GameFieldLogic} from "../field/GameFieldLogic";
import {BoosterBase} from "./BoosterBase";

export enum BoosterEvent {
    countChanged,
    applied
}

export abstract class Booster extends BoosterBase {

    private _count: number = 3;
    get count(): number { return this._count; };
    set count(value: number) {
        this._count = value;
        this.dispatch(BoosterEvent.countChanged, this._count);
    };

    apply(gameField: GameFieldLogic, ...args: any[]): boolean {
        if (this.isEmpty)
            return false;

        this.count--;
        this.dispatch(BoosterEvent.applied, this._count);
        return true;
    }

    get isEmpty(): boolean {
        return this._count === 0;
    }
}
