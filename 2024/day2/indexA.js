import { input } from './input.js';
//import { input } from './test.js';
const arr = [];
let result = 0;

input.split('\n').forEach(line => {
    arr.push(line.split(' ').map(el => parseInt(el)));
});

arr.forEach(row => {
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

    if (legit) result++;
});


console.log(arr, result);