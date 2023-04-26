import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateSequenceHit} from "./GFStateSequenceHit";
import {Tile} from "../../tiles/Tile";
import {GFStateGroups} from "./GFStateGroups";

export class GFStateWin extends GFState {
    static ID = GFStateWin.name;

    onEnter() {

        EventManager.dispatch(this.id);
    }

    next() {
        // this.context.toState(GFStateGroups);
    }

    onExit() {

    }
}
