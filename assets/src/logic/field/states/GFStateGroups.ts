import { GFState } from "./GFState";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateShuffle} from "./GFStateShuffle";
import {GFStateGameOver} from "./GFStateGameOver";
import {CellGroup} from "../../tiles/CellGroup";
import {Cell} from "../../cell/Cell";
import {Group} from "../../tiles/Group";

export class GFStateGroups extends GFState {
    static ID = 'GFStateGroups';

    private _groups: CellGroup[];
    onEnter() {
        this._searchGroups();
        EventManager.dispatch(this.id);
    }

    private _searchGroups () {
        this._clearGroups();
        this.context.eachCell((cell: Cell) => {
            let group = Group.create(cell);
            if (group) {
                this._groups.push(group);
                console.log(group);
            }
        })
    }

    private _clearGroups () {
        this.context.eachCell((cell: Cell) => {
            cell.resetGroup();
        });
        this._groups = [];
    }

    next() {
        if (this._groups.length > 0)
            this.context.toState(GFStateIdle);
        else if (this.context.prevState.id !== GFStateShuffle.ID)
            this.context.toState(GFStateShuffle);
        else
            this.context.toState(GFStateGameOver);
    }

    onExit() {

    }
}
