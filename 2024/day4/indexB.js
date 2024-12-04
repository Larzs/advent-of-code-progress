import { input } from './input.js';
//import { input } from './test.js';

// M.S M.M S.M S.S
// .A. .A. .A. .A.
// M.S S.S S.M M.M

const criteria = [
    [{ pos: [-1, -1], ch: 'M' }, { pos: [-1, 1], ch: 'S' }, { pos: [1, 1], ch: 'S' }, { pos: [1, -1], ch: 'M' }],
    [{ pos: [-1, -1], ch: 'M' }, { pos: [-1, 1], ch: 'M' }, { pos: [1, 1], ch: 'S' }, { pos: [1, -1], ch: 'S' }],
    [{ pos: [-1, -1], ch: 'S' }, { pos: [-1, 1], ch: 'M' }, { pos: [1, 1], ch: 'M' }, { pos: [1, -1], ch: 'S' }],
    [{ pos: [-1, -1], ch: 'S' }, { pos: [-1, 1], ch: 'S' }, { pos: [1, 1], ch: 'M' }, { pos: [1, -1], ch: 'M' }],
];

let result = 0;
let inputArray = [];

input.split('\n').forEach(line => {
    inputArray.push(line.split(''));
});

const checkPatterns = (posX, posY) => {
    for (let index = 0; index < criteria.length; index++) {
        if (criteria[index].every(el => inputArray[posX + el.pos[0]][posY + el.pos[1]] === el.ch)) return 1;
    }

    return 0;
}

for (let indexX = 1; indexX < inputArray.length-1; indexX++) { // row
    for (let indexY = 1; indexY < inputArray[indexX].length-1; indexY++) { // column
        if (inputArray[indexX][indexY] === 'A') {
            result += checkPatterns(indexX, indexY);
        }
    }
}

console.log(result);