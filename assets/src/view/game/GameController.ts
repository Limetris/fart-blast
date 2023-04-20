import { _decorator, Component, Node } from 'cc';
import {LevelsConfig} from "../LevelsConfig";
import {ViewGameField} from "./ViewGameField";
import EventManager from "../../logic/EventManager";
import {ViewCellEvent} from "../cell/ViewCell";
import {Cell} from "../../logic/cell/Cell";
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private _viewGameField: ViewGameField;

    onLoad() {
        this._readComponents();
        this._initField();
        this._initListeners();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    private _readComponents() {
        this._viewGameField = this.node.getComponentInChildren(ViewGameField);
    }

    private _initField() {
        const fieldData = LevelsConfig.instance.get(1);
        this._viewGameField.init(fieldData);
    }

    private _initListeners() {
        // EventManager.subscribe(ViewCellEvent.click, this._onCellClick.bind(this), this);
    }

}

