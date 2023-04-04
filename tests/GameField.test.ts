import {expect, suite, test} from './tests';
import {GameField} from "../assets/src/logic/field/GameField";
import {IGameFieldData} from "../assets/src/logic/entities/EntityGame";
import {Tile} from '../assets/src/logic/tiles/Tile';
import {BlockType, BonusType, ColorType} from "../assets/src/logic/entities/EntityTile";
import {assert} from 'chai';
import {CellDataAsUnion, CellType} from "../assets/src/logic/entities/EntityCell";


const y = 'yellow';
const r = 'red';
const p = 'purple';
const b = 'blue';
const g = 'green';

const e = 'cell';
const _ = 'hole';

const O = 'bubble';
const X = 'box';

const B = 'bomb';
const R = 'rocket';
const D = 'disco';

@suite class GameFieldTest {
    private obj: GameField;

    before() {

        const data: IGameFieldData = {
            matrix: [
                [_, e, e, e, e, e, e, e, _],
                [e, e, e, e, e, e, e, e, e],
                [e, e, y, r, p, b, g, e, e],
                [e, e, e, e, e, e, e, e, e],
                [e, e, _, _, _, _, _, e, e],
                [e, e, e, e, e, e, e, e, e],
                [e, e, e, e, e, e, e, e, e],
                [_, e, e, e, e, e, e, e, _]
            ]
        };
        this.obj = new GameField(data);
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
