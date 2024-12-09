import { input } from './input.js';
//import { input } from './test.js';

let inputArray = [];
let result = 0;
let blockIterator = 0;

const debug = () => {
    for (let index = 0; index < inputArray.length; index++) {
        process.stdout.write('' + inputArray[index].id);
    }
    process.stdout.write('\n');
}

input.split('').forEach((char, index) => {
    const remainder = index % 2 === 0;

    for (let index = 0; index < char; index++) {
        inputArray.push({
            address: index,
            id: remainder ? blockIterator : '.'
        });
    }

    if (remainder) blockIterator++;
});

for (let i = inputArray.length-1; i >= 0; i--) {
    if (inputArray[i].id !== '.') {
        const tempId = inputArray[i].id;
        inputArray[i].id = '.';
        inputArray[i].status = 1;

        let iterator = 0;
        while (inputArray[iterator].id !== '.') {
            iterator++;
        }
        
        inputArray[iterator].id = tempId;
    }
}

result = inputArray.reduce((acc, cur, index) => {
    return acc += cur.id !== '.' ? index * cur.id : 0
}, 0);

console.log(result);

// 6283170117911