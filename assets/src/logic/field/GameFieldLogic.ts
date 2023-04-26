import {IGameFieldData} from "../entities/EntityGame";
import {CellGroup} from "../tiles/CellGroup";
import { GameFieldCells } from "./GameFieldCells";
import {Group} from "../tiles/Group";
import {Cell} from "../cell/Cell";
import {GFStateClick} from "./states/GFStateClick";
import {GFStateIdle} from "./states/GFStateIdle";
import {Events} from "../Events";
import {GFStateGroups} from "./states/GFStateGroups";
import {Tile} from "../tiles/Tile";
import BoosterController, {BoosterControllerEvent} from "../boosters/BoosterController";
import {Booster} from "../boosters/Booster";
import EventManager from "../EventManager";
import {GFStateHit} from "./states/GFStateHit";
import {GFStateMerge} from "./states/GFStateMerge";
import {GFStateInit} from "./states/GFStateInit";

export enum GameFieldEvent {
    pointsChanged= 'pointsChanged',
    stepsChanged= 'stepsChanged'
}

export class GameFieldLogic extends GameFieldCells {

    // TODO:  один функционал - можно вынести в отдельный "класс-счетчик"
    private _points: number = 0;
    get points(): number { return this._points;  }
    set points(value: number) {
        this._points = Math.min(value, this.gameData.points);
        EventManager.dispatch(GameFieldEvent.pointsChanged, this._points, this.gameData.points);
    }

    private _steps: number;
    get steps(): number { return this._steps;  }
    set steps(value: number) {
        this._steps = value;
        EventManager.dispatch(GameFieldEvent.stepsChanged, this._steps);
    }

    private _selectedBooster: Booster;
    sequenceHitTiles: Tile[] = [];

    constructor(gameFieldData: IGameFieldData) {
        super(gameFieldData);
        this.initFsm();
        this._initGoals();
        this._initListeners();
        this.toState(GFStateInit);
    }

    private _initGoals() {
        this.steps = this.gameData.steps;
        this.points = 0;
    }

    click(cell: Cell) {
        if(this.state.id === GFStateIdle.ID) {
            if (this._selectedBooster)
                this._applySelectedBooster(cell);
            else
                this.toState(GFStateClick, cell);
        }
    }

    private _initListeners() {
        EventManager.subscribe(GFStateHit.ID, this._onStateHit.bind(this), this);
        EventManager.subscribe(GFStateMerge.ID, this._onStateMerge.bind(this), this);

        BoosterController.subscribe(BoosterControllerEvent.active, this._activeBooster.bind(this), this);
        BoosterController.subscribe(BoosterControllerEvent.selected, this._onSelectBooster.bind(this), this);
        BoosterController.subscribe(BoosterControllerEvent.unselected, this._onUnselectBooster.bind(this), this);
    }

    private _onStateHit(tiles: Tile[]) {
        this.points += tiles.length;
    }


    private _onStateMerge(cell: Cell, tiles: Tile[]) {
        this.points += tiles.length;
    }

    private _applySelectedBooster(cell: Cell) {
        if(this._selectedBooster) {
            this._selectedBooster.apply(this, cell);
            this._onUnselectBooster();
        }
    }

    private _activeBooster(booster: Booster) {
        if(this.state.id === GFStateIdle.ID)
            booster.apply(this);
    }

    private _onSelectBooster(booster: Booster) {
        this._selectedBooster = booster;
    }

    private _onUnselectBooster() {
        this._selectedBooster = undefined
    }

}

