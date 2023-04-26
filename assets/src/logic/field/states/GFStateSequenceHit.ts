import {GFState} from "./GFState";
import { Cell } from "../../cell/Cell";
import {GFStateIdle} from "./GFStateIdle";
import EventManager from "../../EventManager";
import {GFStateDrop} from "./GFStateDrop";
import {Tile} from "../../tiles/Tile";
import {GFStateGroups} from "./GFStateGroups";
import { GFStateHit } from "./GFStateHit";
import {GFStateCheckGame} from "./GFStateCheckGame";

export class GFStateSequenceHit extends GFState {
    static ID = GFStateSequenceHit.name;

    onEnter() {
        while (this.context.sequenceHitTiles.length > 0) {
            let tile = this.context.sequenceHitTiles.pop();
            if (tile && tile.isAlive) {
                this.context.toState(GFStateHit, tile.cell);
                return;
            }
        }
        this.context.toState(GFStateCheckGame);
    }

    next() {

    }

    onExit() {

    }
}
