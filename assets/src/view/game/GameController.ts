import { _decorator, Component, Node, assert } from 'cc';
import {LevelsConfig} from "../LevelsConfig";
import EventManager from "../../logic/EventManager";
import {ViewCellEvent} from "../cell/ViewCell";
import {Cell} from "../../logic/cell/Cell";
import { GameFieldView } from './GameFieldView';
import {GameFieldLogic} from "../../logic/field/GameFieldLogic";
import {GFStateShuffle} from "../../logic/field/states/GFStateShuffle";
import {GFStateGameOver} from "../../logic/field/states/GFStateGameOver";
import {GFStateWin} from "../../logic/field/states/GFStateWin";
import {WindowManager} from "../windows/WindowManager";
import {WindowWin} from "../windows/WindowWin";
import {WindowGameOver} from "../windows/WindowGameOver";
import {ButtonRetry} from "../ui/buttons/ButtonRetry";
import {ButtonNext} from "../ui/buttons/ButtonNext";
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private static _instance: GameController = null;

    public static get instance(): GameController {
        assert(this._instance, "GameController instance is null");
        return this._instance;
    }

    private _level: number = 1;
    private _gameFieldView: GameFieldView;
    get gameFieldView(): GameFieldView { return this._gameFieldView };
    get gameField(): GameFieldLogic { return this._gameFieldView.gameField };

    onLoad() {
        GameController._instance = this;
        this._readComponents();
        this._initField(this._level);
        this._initListeners();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    private _readComponents() {
        this._gameFieldView = this.node.getComponentInChildren(GameFieldView);
    }

    private _initField(level: number) {
        this._level = level;
        if (!LevelsConfig.instance.has(this._level))
            this._level = 1;
        let fieldData = LevelsConfig.instance.get(this._level);
        this._gameFieldView.init(fieldData);
    }

    private _initListeners() {
        EventManager.subscribe(GFStateWin.ID, this._onStateWin.bind(this), this);
        EventManager.subscribe(GFStateGameOver.ID, this._onStateGameOver.bind(this), this);
        EventManager.subscribe(ButtonRetry.name, this._onRetry.bind(this), this);
        EventManager.subscribe(ButtonNext.name, this._onNext.bind(this), this);
    }

    private _onStateWin() {
        WindowManager.instance.open(WindowWin);
    }

    private _onStateGameOver() {
        WindowManager.instance.open(WindowGameOver);
    }

    private _onRetry() {
        this._initField(this._level);
    }

    private _onNext() {
        this._initField(this._level + 1);
    }

}

