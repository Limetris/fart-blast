import {expect, suite, test} from './tests';
import {GameFieldLogic} from "../assets/src/logic/field/GameFieldLogic";
import {IGameFieldData} from "../assets/src/logic/entities/EntityGame";
import {Tile} from '../assets/src/logic/tiles/Tile';
import {BlockType, BonusType, ColorType} from "../assets/src/logic/entities/EntityTile";
import {assert} from 'chai';
import {CellDataAsUnion, CellType} from "../assets/src/logic/entities/EntityCell";
import {y, r, p, b, e, g, _, B, D, O, R, X} from './short_id'

@suite class TileGroupTest {
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

    @test 'check count groups' () {
        assert(this.obj.groups);
        assert.equal(this.obj.groups.length, 4);
    }

    @test 'check size of groups' () {
        this.obj.groups.forEach((group) => {
            // switch (group.typeGroup) {
            //     case ColorType.yellow:
            //         assert.equal(group.size, 2);
            //         break;
            //     case ColorType.blue:
            //         assert.equal(group.size, 4);
            //         break;
            //     case ColorType.red:
            //         assert.equal(group.size, 5);
            //         break;
            // }
        })
    }
}
