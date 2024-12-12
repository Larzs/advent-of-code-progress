import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

const matrix = [[-1, 0], [0, 1], [1, 0], [0, -1]];

let inputArray = [];
let dictionary = {};
let identificator = 1;

const explore = (j, i, letter, id = '') => {
    if (!id) {
        id = identificator = identificator + 1;
    }

    if (inputArray[j][i].letter === letter) {
        inputArray[j][i].area = id;
        
        if (!dictionary[id]) {
            dictionary[id] = {
                fences: 0,
                area: 0,
            }
        }

        dictionary[id].area++;

        for (let index = 0; index < matrix.length; index++) {
            const newY = j + matrix[index][0];
            const newX = i + matrix[index][1];
    
            if (inputArray[newY] && inputArray[newY][newX] && inputArray[newY][newX].area === '') {
                explore(newY, newX, letter, id);
            }
        }
    }
};

input.split('\n').forEach((line, rowIndex) => {
    const positions = line.split('');
    let lineArray = [];

    for (let columnIndex = 0; columnIndex < positions.length; columnIndex++) {
        lineArray.push({
            letter: positions[columnIndex],
            area: ''
        });
    }

    inputArray.push(lineArray);
});

const height = inputArray.length;
const width = inputArray[0].length;

// mark areas
for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
        if (inputArray[j][i].area === '') {
            explore(j, i, inputArray[j][i].letter);
        }
    }
}


for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
        process.stdout.write(inputArray[i][j].letter);

        if (i === 0 || i === height - 1) {
            dictionary[inputArray[i][j].area].fences++;
        }

        if (inputArray[i + 1]) {
            if (inputArray[i + 1][j].area !== inputArray[i][j].area) {
                dictionary[inputArray[i][j].area].fences++
                dictionary[inputArray[i + 1][j].area].fences++
            }
        }
    }

    process.stdout.write('\n');
}
process.stdout.write('\n');

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        process.stdout.write(inputArray[i][j].letter);

        if (j === 0 || j === width - 1) {
            dictionary[inputArray[i][j].area].fences++;
        }

        if (inputArray[i][j + 1]) {
            if (inputArray[i][j + 1].area !== inputArray[i][j].area) {
                dictionary[inputArray[i][j].area].fences++
                dictionary[inputArray[i][j + 1].area].fences++
            }
        }
    }

    process.stdout.write('\n');
}


for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        process.stdout.write(inputArray[i][j].area + '\t');
    }

    process.stdout.write('\n');
}

console.dir(dictionary);
console.log(Object.keys(dictionary).reduce((acc, key) => acc + dictionary[key].fences * dictionary[key].area, 0));

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);