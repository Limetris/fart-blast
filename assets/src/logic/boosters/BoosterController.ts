import {Booster} from "./Booster";
import {BoosterBomb} from "./BoosterBomb";
import {BoosterShuffle} from "./BoosterShuffle";
import {Events} from "../Events";


type BoosterMap = Map<string, Booster>

export enum BoosterControllerEvent {
    active,
    activated,
    selected
}

class BoosterController extends Events {

    private _boosters: BoosterMap = new Map<string, Booster>();
    constructor() {
        super();

        this._regBuster(BoosterBomb);
        this._regBuster(BoosterShuffle);
    }

    private _regBuster(boosterClass: any) {
        let booster = new boosterClass();
        this._boosters.set(booster.name, booster);
    }

    getBooster(boosterType: any): Booster | undefined {
        return this._boosters.get(boosterType.name);
    }

    has(boosterType: any): boolean {
        return !!this.getBooster(boosterType);
    }

    isEmpty(boosterType: any): boolean {
        let booster = this.getBooster(boosterType);
        if (!booster)
            return true;
        return booster.isEmpty;
    }

    active(boosterType: any): boolean {
        let booster = this.getBooster(boosterType);
        if (!booster)
            return false;
        if (booster.isEmpty)
            return false;

        this.dispatch(BoosterControllerEvent.active, booster);
        return true;
    }



}

export default new BoosterController();

