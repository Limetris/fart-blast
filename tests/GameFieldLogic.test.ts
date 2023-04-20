import {expect, suite, test} from './tests';
import {GameFieldLogic} from "../assets/src/logic/field/GameFieldLogic";
import {IGameFieldData} from "../assets/src/logic/entities/EntityGame";
import {assert} from 'chai';
import {y, r, p, b, e, g, _, B, D, O, R, X} from './short_id'
import {GFStateIdle} from "../assets/src/logic/field/states/GFStateIdle";
import {GFStateClick} from "db://assets/src/logic/field/states/GFStateClick";
import {Cell} from "../assets/src/logic/cell/Cell";

@suite class GameFieldLogicTest {
    private obj: GameFieldLogic;

    before() {

        const data: IGameFieldData = {
            field: [
                [y, r, p, b, b],
                [y, b, r, b, b],
                [_, _, _, _, _],
                [y, g, r, b, g],
                [g, b, r, r, r],
                [y, r, p, p, r]
            ]

        };
        this.obj = new GameFieldLogic(data);
    }

    @test 'default state' () {
        assert.equal(this.obj.state.id, GFStateIdle.ID);
    }

    @test 'state click' () {
        let cell = this.obj.getCell(0,0);
        this.obj.toState(GFStateClick, cell);
        assert.equal(this.obj.state.id, GFStateClick.ID);

    }

}
