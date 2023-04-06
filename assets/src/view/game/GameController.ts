import { _decorator, Component, Node } from 'cc';
import {LevelsConfig} from "../LevelsConfig";
import {IGameFieldData} from "../../logic/entities/EntityGame";
import {GameField} from "../../logic/field/GameField";
import {ViewGameField} from "./ViewGameField";
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private _viewGameField: ViewGameField;

    onLoad() {
        this._readComponents();
        this._initField();
    }

    private _readComponents() {
        this._viewGameField = this.node.getComponentInChildren(ViewGameField);
    }

    private _initField() {
        const fieldData = LevelsConfig.instance.get(1);
        this._viewGameField.init(fieldData);
    }

    update(deltaTime: number) {

    }
}

