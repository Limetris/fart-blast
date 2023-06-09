import {expect, suite, test} from './tests';
import {GameFieldLogic} from "../assets/src/logic/field/GameFieldLogic";
import {IGameFieldData} from "../assets/src/logic/entities/EntityGame";
import {Tile} from '../assets/src/logic/tiles/Tile';
import {BlockType, BonusType, ColorType} from "../assets/src/logic/entities/EntityTile";
import {assert} from 'chai';
import {CellDataAsUnion, CellType} from "../assets/src/logic/entities/EntityCell";
import {y, r, p, b, e, g, _, B, D, O, R, X} from './short_id'

@suite class GameFieldTest {
    private obj: GameFieldLogic;

    before() {

        const data = {
            field: [
                [_, e, e, e, e, e, e, e, _],
                [e, e, e, e, e, e, e, e, e],
                [e, e, y, r, p, b, g, e, e],
                [e, e, e, e, e, e, e, e, e],
                [e, e, _, _, _, _, _, e, e],
                [e, e, e, e, e, e, e, e, e],
                [e, e, e, e, e, e, e, e, e],
                [_, e, e, e, e, e, e, e, _]
            ],
            colors: [y, r, p, b, g],
            steps: 20,
            points: 100
        };
        this.obj = new GameFieldLogic(data as IGameFieldData);
    }

    @test 'is created' () {
        expect(this.obj).to.not.be.undefined;
    }

    @test 'size' () {
        expect(this.obj.columnCount).equal(9);
        expect(this.obj.rowCount).equal(8);
    }

    @test 'check types' () {
        let tile = new Tile(BlockType.box);
        assert(tile instanceof Tile);
        let obj: CellDataAsUnion = 'rocket';
        assert(obj in BonusType);
        assert(BonusType[obj] === BonusType.rocket);
        assert('rocket' ===  BonusType[BonusType.rocket]);
    }

    @test 'getCell' () {
        assert(this.obj.getCell(0, 0));
        assert(this.obj.getCell(2, 0));
        assert(this.obj.getCell(2, 2));
    }


    @test 'parsing' () {
        assert.equal(this.obj.getCell(2, 0).type, CellType.cell);
        assert.equal(this.obj.getCell(1, 4).type, CellType.cell);
        assert.equal(this.obj.getCell(2, 4).type, CellType.hole);
        assert.equal(this.obj.getCell(3, 4).type, CellType.hole);

        assert.equal(this.obj.getCell(2, 4).tile, undefined);
        assert(this.obj.getCell(2, 0).tile);

        assert(this.obj.getCell(2, 2).tile);
        assert.equal(this.obj.getCell(2, 2).tile.type, ColorType.yellow);
        assert.equal(this.obj.getCell(3, 2).tile.type, ColorType.red);
        assert.equal(this.obj.getCell(4, 2).tile.type, ColorType.purple);
        assert.equal(this.obj.getCell(5, 2).tile.type, ColorType.blue);
        assert.equal(this.obj.getCell(6, 2).tile.type, ColorType.green);
    }

    @test 'filling' () {
        this.obj.columns.forEach((column) => {
            column.cells.forEach((cell) => {
                if (!cell.isHole) {
                    assert(cell.tile);
                    assert(cell.tile.type in ColorType);
                }
            })
        });

    }
}
