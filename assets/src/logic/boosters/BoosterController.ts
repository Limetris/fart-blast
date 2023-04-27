import {Booster} from "./Booster";
import {BoosterBomb} from "./BoosterBomb";
import {BoosterShuffle} from "./BoosterShuffle";
import {Events} from "../Events";


type BoosterMap = Map<string, Booster>

export enum BoosterControllerEvent {
    active,
    activated,
    selected,
    unselected
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
        booster.id = boosterClass.ID;
        this._boosters.set(booster.id, booster);
    }

    getBooster(boosterType: any): Booster | undefined {
        return this._boosters.get(boosterType.ID);
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
        this.unselect();
        let booster = this.getBooster(boosterType);
        if (!booster)
            return false;
        if (booster.isEmpty)
            return false;

        console.log(`active booster: ${booster.id}`);
        this.dispatch(BoosterControllerEvent.active, booster);
        return true;
    }

    select(boosterType: any): boolean {
        let booster = this.getBooster(boosterType);
        if (!booster)
            return false;
        if (booster.isEmpty)
            return false;
        console.log(`select booster: ${booster.id}`);
        this.dispatch(BoosterControllerEvent.selected, booster);
        return true;
    }

    unselect() {
        console.log(`unselect booster`);
        this.dispatch(BoosterControllerEvent.unselected);
    }



}

export default new BoosterController();

