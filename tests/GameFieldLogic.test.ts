import {expect, suite, test} from './tests';
import {GameFieldLogic} from "../assets/src/logic/field/GameFieldLogic";
import {IGameFieldData} from "../assets/src/logic/entities/EntityGame";
import {assert} from 'chai';
import {y, r, p, b, e, g, _, B, D, O, R, X} from './short_id'
import {GFStateIdle} from "../assets/src/logic/field/states/GFStateIdle";
import {GFStateClick} from "../assets/src/logic/field/states/GFStateClick";
import { GFStateInit } from '../assets/src/logic/field/states/GFStateInit';

@suite class GameFieldLogicTest {
    private obj: GameFieldLogic;

    before() {

        const data = {
            field: [
                [y, r, p, b, b],
                [y, b, r, b, b],
                [_, _, _, _, _],
                [y, g, r, b, g],
                [g, b, r, r, r],
                [y, r, p, p, r]
            ],
            colors: [y, r, p, b, g],
            steps: 20,
            points: 100

        };
        this.obj = new GameFieldLogic(data as IGameFieldData);
    }

    @test 'default state' () {
        assert.equal(this.obj.state.id, GFStateInit.ID);
    }

}
