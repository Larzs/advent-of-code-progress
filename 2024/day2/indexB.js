import { input } from './input.js';
//import { input } from './test.js';
const arr = [];
let result = 0;

input.split('\n').forEach(line => {
    arr.push(line.split(' ').map(el => parseInt(el)));
});

const testLevels = (row) => {
    let legit = true;
    let direction = '';

    row.reduce((previous, item) => {
        if (previous !== 0) {
            if (previous === item) legit = false;
            if (Math.abs(previous - item) > 3) legit = false;

            const newDirection = previous - item < 0 ? 'down' : 'up';
            if (direction !== '' && direction !== newDirection) legit = false;
            else direction = newDirection;
        }

        return item;
    }, 0);

    return legit;
}

arr.forEach(row => {
    if (testLevels(row))
        result++;
    else {
        for (let index = 0; index < row.length; index++) {
            const rowCopy = row.slice(0);
            rowCopy.splice(index, 1);

            if (testLevels(rowCopy)) {
                result++;
                break;
            }
        }
    }
});

console.log(result);