import { _decorator, Component, Node, Label } from 'cc';
import { ButtonBase } from './ButtonBase';
import {Booster, BoosterEvent} from "../../../logic/boosters/Booster";
const { ccclass, property } = _decorator;

@ccclass('ButtonBooster')
export abstract class ButtonBooster extends ButtonBase {

    @property(Label)
    countLabel: Label;

    protected booster: Booster;
    abstract initBuster(): Booster;

    start() {
        super.start();
        this.initBuster();
        this.booster.subscribe(BoosterEvent.countChanged, this._onCountChanged.bind(this), this);
        this._onCountChanged(this.booster.count);
    }

    onDestroy() {
        this.booster.unsubscribeTag(this);
    }

    private _onCountChanged(count: number) {
        this.countLabel.string = count.toString();
    }

    onClick() {

    }
}

