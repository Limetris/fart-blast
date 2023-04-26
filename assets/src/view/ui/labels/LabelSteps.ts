import { _decorator, Component, Node } from 'cc';
import {LabelEvent} from "./LabelEvent";
import {GameFieldEvent} from "../../../logic/field/GameFieldLogic";
import {GameController} from "../../game/GameController";
const { ccclass, property } = _decorator;

@ccclass('LabelSteps')
export class LabelSteps extends LabelEvent {

    get event(): string { return GameFieldEvent.stepsChanged; }

    initStartValue() {
        this.setValue(GameController.instance.gameField.steps);
    }

}

