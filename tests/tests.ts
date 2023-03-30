// https://medium.com/swlh/how-to-setting-up-unit-tests-with-typescript-871c0f4f1609
// https://habr.com/ru/post/553234/

export { suite, test, params, skip, only } from '@testdeck/mocha';
export { expect } from 'chai';

import * as _chai from 'chai';
const _should = _chai.should();

export const should = _should;
