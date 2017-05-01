'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');

global.window = global;

suite('getRandomInt', () => {
    require('../solutions/getRandomInt');
    const code = getRandomInt.toString();

    const maxBound = 128;
    const results = Array.from(new Array(maxBound * maxBound), () => getRandomInt(maxBound));

    test(`results should be integer`, () => {
        results.forEach(r => {
            expect(r | 0).to.equal(r);
        });
    });

    test(`results should be greater than or equal to 0`, () => {
        var min = Math.min(...results);
        expect(min).to.satisfy(m => m >= 0);
    });

    test(`results should be less than max`, () => {
        var max = Math.max(...results);
        expect(max).to.satisfy(m => m < maxBound);
    });

    test(`the only function you can use is Math.random()`, () => {
        const functionBody = code.slice(code.indexOf('{'), -1).trim();
        expect(/[^\.\w](?!Math.random)([\.\w]+)\(/.test(functionBody)).to.be.false;
    });
});
