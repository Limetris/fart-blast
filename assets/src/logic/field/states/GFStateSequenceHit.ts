import {GFState} from "./GFState";
import { GFStateHit } from "./GFStateHit";
import {GFStateCheckGame} from "./GFStateCheckGame";

export class GFStateSequenceHit extends GFState {
    static ID = 'GFStateSequenceHit';

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
