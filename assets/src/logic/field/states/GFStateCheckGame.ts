import {GFState} from "./GFState";
import {GFStateGroups} from "./GFStateGroups";
import {GFStateWin} from "./GFStateWin";
import {GFStateGameOver} from "./GFStateGameOver";

export class GFStateCheckGame extends GFState {
    static ID = 'GFStateCheckGame';

    onEnter() {
        if (this.context.points >= this.context.gameData.points)
            this.context.toState(GFStateWin);
        else if (this.context.steps > 0)
            this.context.toState(GFStateGroups);
        else
            this.context.toState(GFStateGameOver);
    }

    next() {

    }

    onExit() {

    }
}
