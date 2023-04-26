import { _decorator, Component, Node, assert } from 'cc';
import {LevelsConfig} from "../LevelsConfig";
import EventManager from "../../logic/EventManager";
import {ViewCellEvent} from "../cell/ViewCell";
import {Cell} from "../../logic/cell/Cell";
import { GameFieldView } from './GameFieldView';
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private static _instance: GameController = null;

    public static get instance(): GameController {
        assert(this._instance, "GameController instance is null");
        return this._instance;
    }

    private _gameFieldView: GameFieldView;
    get gameFieldView(): GameFieldView { return this._gameFieldView };
    get gameField(): GameFieldLogic { return this._gameFieldView.gameField };

    onLoad() {
        GameController._instance = this;
        this._readComponents();
        this._initField();
        this._initListeners();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    private _readComponents() {
        this._gameFieldView = this.node.getComponentInChildren(GameFieldView);
    }

    private _initField() {
        const fieldData = LevelsConfig.instance.get(1);
        this._gameFieldView.init(fieldData);
    }

    private _initListeners() {
        // EventManager.subscribe(ViewCellEvent.click, this._onCellClick.bind(this), this);
    }

}

