import { suite, test, should, expect } from './tests';
import {CellBase} from "../assets/src/logic/cell/CellBase";
import {CellType} from "db://assets/src/logic/entities/EntityCell";

@suite class CellBaseTest {

    before() {

    }

    @test 'is created' () {
        expect(new CellBase(0, 0)).to.not.be.undefined;
    }

    @test 'coordinate' () {
        const object = new CellBase(-1, 2);
        expect(object.x).equal(-1);
        expect(object.y).equal(2);
        expect(object.type).equal(CellType.cell);
    }
}
