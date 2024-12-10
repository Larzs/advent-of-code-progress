import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

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
        let k = i;
        let file = [];
        let free = [];

        do {
            file.push(k);
            k--;
        } while (k >= 0 && inputArray[i].id === inputArray[k].id);

        let iterator = 0;
        while (free.length < file.length && iterator < i) {
            if (inputArray[iterator].id === '.') {
                free.push(iterator);
            } else {
                free = [];
            }
            iterator++;
        }

        if (file.length === free.length) {
            for (let index = 0; index < file.length; index++) {
                inputArray[free[index]].id = inputArray[file[index]].id;
                inputArray[file[index]].id = '.';
            }
        } else {
            i = i - file.length + 1;
        }
    }
}

result = inputArray.reduce((acc, cur, index) => {
    return acc += cur.id !== '.' ? index * cur.id : 0
}, 0);

const endTime = performance.now();

console.log(result);
console.log(`Process took ${endTime - startTime} milliseconds`);

// 6307653242596