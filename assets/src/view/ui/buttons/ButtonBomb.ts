import { _decorator, Component, Node, Color, log } from 'cc';
import {ButtonBooster} from "./ButtonBooster";
import {Booster, BoosterEvent} from "../../../logic/boosters/Booster";
import BoosterController, {BoosterControllerEvent} from "../../../logic/boosters/BoosterController";
import {BoosterBomb} from "../../../logic/boosters/BoosterBomb";
const { ccclass, property } = _decorator;

@ccclass('ButtonBomb')
export class ButtonBomb extends ButtonBooster {

    private _selected: boolean = false;
    private _normalColor: Color;
    private _selectColor: Color;

    get selected() {return this._selected};
    set selected(value: boolean) {
        this._selected = value;
        this.button.normalColor = this.button.hoverColor = this._selected ? this._selectColor : this._normalColor;
    }

    initBuster(): Booster {
        this.booster = BoosterController.getBooster(BoosterBomb);
        return this.booster;
    }

    start() {
        super.start();
        BoosterController.subscribe(BoosterControllerEvent.selected, this.onSelected.bind(this), this);
        BoosterController.subscribe(BoosterControllerEvent.unselected, this.onUnselected.bind(this), this);
        this.booster.subscribe(BoosterEvent.applied, this.onApplied.bind(this), this);

        this._normalColor = this.button.normalColor.clone();
        this._selectColor = this.button.pressedColor.clone();
    }

    onDestroy() {
        super.onDestroy();
        BoosterController.unsubscribeTag(this);
        this.booster.unsubscribeTag(this);
    }

    onSelected(booster: Booster) {
        this.selected = booster.id === this.booster.id;
    }

    onUnselected() {
        this.selected = false;
    }

    onApplied(booster: Booster) {
        BoosterController.unselect();
    }

    onClick() {
        if (!this._selected) {
            super.onClick();

            if (BoosterController.isEmpty(BoosterBomb))
                return;
            BoosterController.select(BoosterBomb);
        }
        else {
            BoosterController.unselect();
        }
    }
}

