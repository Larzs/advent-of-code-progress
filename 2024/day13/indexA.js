import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let inputArray = [];
let arcade = {};
let dictionary = {};

const press = (id, buttonPres, presses) => {
    presses[buttonPres]++;

    if (dictionary[presses['a'] + '_' + presses['b']]) return;
    dictionary[presses['a'] + '_' + presses['b']] = presses;

    const sumX = presses['a'] * inputArray[id]['a'][0] + presses['b'] * inputArray[id]['b'][0];
    const sumY = presses['a'] * inputArray[id]['a'][1] + presses['b'] * inputArray[id]['b'][1];

    if (sumX < inputArray[id].prize[0] && sumY < inputArray[id].prize[1]) {
        press(id, 'b', { ...presses });
        press(id, 'a', { ...presses });
    }

    if(sumX === inputArray[id].prize[0] && sumY === inputArray[id].prize[1]) {
        inputArray[id].winning.push(presses['a'] * 3 + presses['b'] * 1);
    }
};

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
        arcade['prize'] = [parseInt(prize[1]), parseInt(prize[2])];
        arcade['winning'] = [];

        inputArray.push(arcade);
        arcade = {};
    }
});

for (let i = 0; i < inputArray.length; i++) {
    dictionary = {};

    press(i, 'a', { a: 0, b: 0});
    press(i, 'b', { a: 0, b: 0});

    inputArray[i].winning = inputArray[i].winning.sort((a, b) => a > b);
}

console.log(inputArray.reduce((acc, item) => acc + (item.winning[0] ?? 0), 0))

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);