'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('lastIndexOf', () => {
    require('../solutions/lastIndexOf');
    const code = fs.readFileSync('solutions/lastIndexOf.js', {encoding: 'utf8'});

    const value = Math.random();
    const arr = [1, 2, 3, 4, 5, 6, ...'the best array'];
    const firstIndex = 3;
    const secondIndex = 8;

    test(`should return -1 if the item doesn't exist in the given array`, () => {
        expect(lastIndexOf(arr, value)).to.equal(-1);
    });

    test('should return the index of item in the array it item appears only once', () => {
        arr[firstIndex] = value

        expect(lastIndexOf(arr, value)).to.equal(firstIndex);
    });

    test('should return the last index of the item if it appears in the array more then once', () => {
        arr[firstIndex] = value;
        arr[secondIndex] = value;

        expect(lastIndexOf(arr, value)).to.equal(secondIndex);
    });

    test(`you should use for loop for your lookup and shouldn't use native methods`, () => {
        expect(/\bfor\b/.test(code)).to.be.true;

        const excludeListRgx = /\.\s*(indexOf|find|findIndex|every|some|filter|reduce|reduceRight|forEach|includes)\s*\(/;
        expect(excludeListRgx.test(code)).to.be.false;
    });
});