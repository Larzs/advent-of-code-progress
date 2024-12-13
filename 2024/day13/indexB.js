import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let inputArray = [];
let arcade = {};

input.split('\n').forEach((line, rowIndex) => {
    const buttonA = line.match(/Button A: X\+(\d+), Y\+(\d+)/);
    const buttonB = line.match(/Button B: X\+(\d+), Y\+(\d+)/);
    const prize = line.match(/Prize: X=(\d+), Y=(\d+)/);

    if (buttonA) {
        arcade['a'] = [parseInt(buttonA[1]), parseInt(buttonA[2])];
    }

    if (buttonB) {
        arcade['b'] = [parseInt(buttonB[1]), parseInt(buttonB[2])];
    }

    if (prize) {
        arcade['prize'] = [
            parseInt(prize[1]) + 10_000_000_000_000, 
            parseInt(prize[2]) + 10_000_000_000_000
        ];
        arcade['winning'] = [];

        inputArray.push(arcade);
        arcade = {};
    }
});

for (let i = 0; i < inputArray.length; i++) {
    const a1 = inputArray[i]['a'][0];
    const b1 = inputArray[i]['b'][0];
    const c1 = inputArray[i]['prize'][0];

    const a2 = inputArray[i]['a'][1];
    const b2 = inputArray[i]['b'][1];
    const c2 = inputArray[i]['prize'][1];

    const aExp = a1 * b2 + a2 * (b1 * -1);
    const cExp = c1 * b2 + c2 * (b1 * -1);

    if (cExp % aExp === 0) {
        const a = cExp / aExp;
        
        if((c1 - a1 * a) % b1 === 0) {
            const b = (c1 - a1 * a) / b1;

            inputArray[i].winning.push(a * 3 + b * 1);
        }
    }
}

console.log(inputArray.reduce((acc, item) => acc + (item.winning[0] ?? 0), 0))

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);