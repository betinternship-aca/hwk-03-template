'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('equals', () => {
    require('../solutions/equals');
    const functionText = equals.toString();
    const functionBody = functionText.slice(functionText.indexOf('{'), -1).trim();
    const code = fs.readFileSync('solutions/equals.js', {encoding: 'utf8'});

    const primitives = [true, false, 1, 2.3, 0, NaN, 'str', '', null, undefined];
    const cloneArray = arr => [].concat(arr);
    const primitivesClone = cloneArray(primitives);
    const isExactNaN = val => val !== val;

    test(`should work fine for all primitives`, () => {
        primitives.forEach(p1 => primitives.forEach(p2 => {
            expect(equals(p1, p2)).to.equal(p1 === p2 || isExactNaN(p1) && isExactNaN(p2));
        }));
    });

    test(`should return true for the same object and for deep clones`, () => {
        expect(equals(primitives, primitives)).to.be.true;
        expect(equals(primitives, primitivesClone)).to.be.true;
    });

    test(`should have only one loop in your code (code reuse)`, () => {
        expect(/\b(for|while)\b(?=.*\b(for|while)\b).*$/.test(code)).to.be.false;
    });
});
