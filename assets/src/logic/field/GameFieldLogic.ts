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

export class GameFieldLogic extends GameFieldCells {

    private _groups: CellGroup[];
    sequenceHitTiles: Tile[] = [];
    get groups(): CellGroup[] { return this._groups;  }

    constructor(gameFieldData: IGameFieldData) {
        super(gameFieldData);
        this.initFsm();
        this._initListeners();
        this.toState(GFStateGroups);
    }

    click(cell: Cell) {
        if(this.state.id === GFStateIdle.ID)
            this.toState(GFStateClick, cell);
    }

    searchGroups () {
        this._clearGroups();
        this.eachCell((cell: Cell) => {
            let group = Group.create(cell);
            if (group) {
                this._groups.push(group);
                console.log(group);
            }
        })
    }

    private _clearGroups () {
        this.eachCell((cell: Cell) => {
            cell.resetGroup();
        });
        this._groups = [];
    }

    private _initListeners() {
        BoosterController.subscribe(BoosterControllerEvent.active, this._activeBooster.bind(this), this);
    }

    private _activeBooster(booster: Booster) {
        if(this.state.id === GFStateIdle.ID)
            booster.apply(this);
    }




}

