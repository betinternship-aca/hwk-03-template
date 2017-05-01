'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('matrixLastIndexOf', () => {
    require('../solutions/lastIndexOf');
    require('../solutions/matrixLastIndexOf');
    const code = fs.readFileSync('solutions/matrixLastIndexOf.js', {encoding: 'utf8'});

    const cloneJSON = obj => JSON.parse(JSON.stringify(obj));
    const setValueAt = coord => matrix[coord[0]][coord[1]] = value;
    const checkResultAndFix = result => {
        expect(result).to.not.be.null;
        expect(typeof result).to.equal('object');

        return Array.isArray(result) ? result : [result.i, result.j];
    }

    const value = Math.random();
    const arr = [1, 2, 3, 4, 5, 6, ...'the best row'];
    const matrix = [cloneJSON(arr), cloneJSON(arr), arr];
    const firstCoord = [0, 3];
    const secondCoord = [2, 8];

    test(`should return null if the item doesn't exist in the given matrix`, () => {
        expect(matrixLastIndexOf(matrix, value)).to.be.null;
    });

    test('should return the index of item in the matrix as an array or an object', () => {
        setValueAt(firstCoord);

        const result = checkResultAndFix(matrixLastIndexOf(matrix, value));

        expect(result).to.deep.equal(firstCoord);
    });

    test('should return the last index of the item if it appears in the matrix more then once', () => {
        setValueAt(firstCoord);
        setValueAt(secondCoord);

        const result = checkResultAndFix(matrixLastIndexOf(matrix, value));

        expect(result).to.deep.equal(secondCoord);
    });

    test(`you should use for loop for your lookup and shouldn't use native methods`, () => {
        expect(/\bfor\b/.test(code)).to.be.true;

        const excludeListRgx = /\.\s*(indexOf|lastIndexOf|find|findIndex|every|some|filter|reduce|reduceRight|forEach|includes)\s*\(/;
        expect(excludeListRgx.test(code)).to.be.false;
    });

    test(`you should use your function for arrays`, () => {
        expect(/lastIndexOf\s*\(/.test(code)).to.be.true;
    });
});
