import { _decorator, Component, Node, log } from 'cc';
import {ButtonBooster} from "./ButtonBooster";
import BoosterController, {BoosterControllerEvent} from '../../../logic/boosters/BoosterController';
import {BoosterShuffle} from "../../../logic/boosters/BoosterShuffle";
import {Booster} from "../../../logic/boosters/Booster";
const { ccclass, property } = _decorator;

@ccclass('ButtonShuffle')
export class ButtonShuffle extends ButtonBooster {


    initBuster(): Booster {
        this.booster = BoosterController.getBooster(BoosterShuffle);
        return this.booster;
    }

    onClick() {
        super.onClick();

        if (BoosterController.isEmpty(BoosterShuffle))
            return;
        BoosterController.active(BoosterShuffle);
    }
}

