import { _decorator, Component, Node } from 'cc';
import {LabelEvent} from "./LabelEvent";
import {GameFieldEvent, GameFieldLogic} from "../../../logic/field/GameFieldLogic";
import {GameController} from "../../game/GameController";
const { ccclass, property } = _decorator;

@ccclass('LabelPoints')
export class LabelPoints extends LabelEvent {

    get event(): string { return GameFieldEvent.pointsChanged; }

    initStartValue() {
        this.setValue(GameController.instance.gameField.points, GameController.instance.gameField.gameData.points);
    }

    protected getValueString(value: number, pointsTarget: number): string {
        return `${value} / ${pointsTarget}`;
    }

}

