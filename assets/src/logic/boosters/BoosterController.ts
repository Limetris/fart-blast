import {Booster} from "./Booster";
import {BoosterBomb} from "./BoosterBomb";
import {BoosterShuffle} from "./BoosterShuffle";


type BoosterMap = Map<string, Booster>

class BoosterController {

    private _boosters: BoosterMap = new Map<string, Booster>();
    constructor() {
        this._regBuster(BoosterBomb);
        this._regBuster(BoosterShuffle);
    }

    private _regBuster(boosterClass: any) {
        let booster = new boosterClass();
        this._boosters.set(booster.name, booster);
    }

    getBooster(booster: any): Booster | undefined {
        return this._boosters.get(booster.name);
    }

}

export default new BoosterController();

