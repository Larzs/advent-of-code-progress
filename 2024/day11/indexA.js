import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let inputArray = [];

const blink = () => {
    inputArray = inputArray.map(el => {
        if (el === 0) return 1;

        const numString = el.toString();
        const numLength = numString.length;
        if (numLength % 2 === 0) {
            return [
                parseInt(numString.slice(0, numLength / 2)), 
                parseInt(numString.slice(numLength / 2))
            ];
        }

        return el * 2024;
    }).flat();
}

input.split(' ').forEach((number, index) => {
    inputArray.push(parseInt(number));
});

for (let index = 0; index < 25; index++) {
    blink();
}

console.log(inputArray.length)

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);