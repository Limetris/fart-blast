import { _decorator, Component, Node } from 'cc';
import {ButtonBooster} from "./ButtonBooster";
import {Booster} from "../../../logic/boosters/Booster";
import BoosterController from "../../../logic/boosters/BoosterController";
import {BoosterBomb} from "../../../logic/boosters/BoosterBomb";
const { ccclass, property } = _decorator;

@ccclass('ButtonBomb')
export class ButtonBomb extends ButtonBooster {

    initBuster(): Booster {
        this.booster = BoosterController.getBooster(BoosterBomb);
        return this.booster;
    }

    onClick() {
        super.onClick();

        if (BoosterController.isEmpty(BoosterBomb))
            return;
        BoosterController.active(BoosterBomb);
    }
}

