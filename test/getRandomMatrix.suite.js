'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('getRandomMatrix', () => {
    require('../solutions/getRandomInt');
    require('../solutions/getRandomMatrix');
    const functionText = getRandomMatrix.toString();
    const functionBody = functionText.slice(functionText.indexOf('{'), -1).trim();
    const code = fs.readFileSync('solutions/getRandomMatrix.js', {encoding: 'utf8'});

    const n = 12, m = 32;
    const randomMatrix = getRandomMatrix(n, m);

    test(`should have correct sizes`, () => {
        expect(randomMatrix.length).to.equal(n);
        randomMatrix.forEach(row => {
            expect(row.length).to.equal(m);
        });
    });

    test(`results should be integers from [0, 100) range`, () => {
        randomMatrix.forEach(row => row.forEach(val => {
            expect(val | 0).to.equal(val);
        }));
    });

    test(`you should use your getRandomInt`, () => {
        expect(/getRandomInt/.test(code)).to.be.true;
    });

    test(`use new Array(size) instead of [] and don't use push for adding items.`, () => {
        expect(/(\[\s*\]|push\s*\()/.test(code)).to.be.false;
        expect(/\bnew\s+Array\s*\(/.test(code)).to.be.true;
    });

    test(`use separate functions instead of nested loops`, () => {
        expect(/\b(for|while)\b(?=.*\b(for|while)\b).*$/.test(functionBody)).to.be.false;
    });
});
