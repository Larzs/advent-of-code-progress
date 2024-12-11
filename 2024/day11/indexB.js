import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let dictonary = {};
let inputArray = [];

input.split(' ').forEach((number) => {
    inputArray.push(parseInt(number));
});

const stone = (number, iteration) => {
    let solution;
    if (dictonary[number + '_' + iteration]) { 
        return dictonary[number + '_' + iteration];
    } 

    if (!iteration) solution = 1;
    else if (number === 0) solution = stone(1, iteration - 1);
    else if (number.toString().length % 2 == 0) {
        const numString = number.toString();
        const numLength = numString.length;

        const left = parseInt(numString.slice(0, numLength / 2));
        const right = parseInt(numString.slice(numLength / 2));
        solution = stone(left, iteration - 1) + stone(right, iteration - 1);
    } else {
        solution = stone(number * 2024, iteration - 1);
    }

    dictonary[number + '_' + iteration] = solution;
    return solution;
};

console.log(inputArray.reduce((acc, item) => {
    return acc + stone(item, 75);
}, 0));

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);