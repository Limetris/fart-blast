import { suite, test, should, expect } from './tests';
import {GameField} from "@src/GameField";


@suite class CellBaseTest {
    private obj: GameField;

    before() {
        this.obj = new GameField(10, 8);
    }

    @test 'is created' () {
        expect(this.obj).to.not.be.undefined;
    }

    @test 'size' () {
        expect(this.obj.columns).equal(10);
        expect(this.obj.rows).equal(8);
    }
}
