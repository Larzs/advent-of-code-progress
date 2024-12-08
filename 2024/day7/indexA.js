import { input } from './input.js';
//import { input } from './test.js';

let inputArray = [];
let result = 0;

input.split('\n').forEach(line => {
    const row = line.split(':');

    inputArray.push({
        end: parseInt(row[0]),
        numbers: row[1].trim().split(' ').map(el => parseInt(el)),
        key: line.trim(),
        legit: false,
    });
});

const calculate = (carry, elements, end, key) => {
    const firstElement = elements[0];
    const intermediate = [firstElement + carry, firstElement * carry];

    if (intermediate[0] === end || intermediate[1] === end) {
        inputArray.find(el => el.key === key).legit = true;
    } else {
        if (intermediate[0] < end) calculate(intermediate[0], elements.slice(1), end, key);
        if (intermediate[1] < end) calculate(intermediate[1], elements.slice(1), end, key);
    }
};

inputArray.forEach(el => calculate(0, el.numbers, el.end, el.key));
result = inputArray.filter(el => el.legit).reduce((carry, el) => carry + el.end, 0);

console.log(result);