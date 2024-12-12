import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

const matrix = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const matrixCorners = [
    [[-1, 0], [0, 1], [-1,1]],
    [[-1, 0], [0, -1], [-1, -1]],
    [[1, 0], [0, -1], [1,-1]],
    [[1, 0], [0, 1], [1,1]],
];

let inputArray = [];
let dictionary = {};
let identificator = 0;

const corners = (j, i) => {
    let corners = 0;

    for (let index = 0; index < matrixCorners.length; index++) {
        const pointA = [j + matrixCorners[index][0][0], i + matrixCorners[index][0][1]];
        const pointB = [j + matrixCorners[index][1][0], i + matrixCorners[index][1][1]];
        const pointC = [j + matrixCorners[index][2][0], i + matrixCorners[index][2][1]];

        if (
            // full corner
            (!inputArray[pointA[0]] || !inputArray[pointA[0]][pointA[1]]) && (!inputArray[pointB[0]] || !inputArray[pointB[0]][pointB[1]])
        ) {
            corners++;
        } else if (
            // corner by side
            !inputArray[pointA[0]] || !inputArray[pointA[0]][pointA[1]] || !inputArray[pointB[0]] || !inputArray[pointB[0]][pointB[1]]
        ) {
            
            if (!inputArray[pointA[0]] || !inputArray[pointA[0]][pointA[1]]) {
                if (inputArray[pointB[0]][pointB[1]].area !== inputArray[j][i].area) corners++;
            } else {
                if (inputArray[pointA[0]][pointA[1]].area !== inputArray[j][i].area) corners++;
            }
        } else if (
            // corner
            inputArray[j][i].area !== inputArray[pointA[0]][pointA[1]].area &&
            inputArray[j][i].area !== inputArray[pointB[0]][pointB[1]].area
        ) {
            corners++;
        } else if (
            // inner corner
            inputArray[pointA[0]][pointA[1]].area === inputArray[j][i].area &&
            inputArray[pointB[0]][pointB[1]].area === inputArray[j][i].area && 
            inputArray[pointC[0]][pointC[1]].area !== inputArray[j][i].area
        ) {
            corners++;
        }
    }
    return corners;
};

const explore = (j, i, letter, id = '') => {
    if (!id) {
        id = identificator = identificator + 1;
    }

    if (inputArray[j][i].letter === letter) {
        inputArray[j][i].area = id;
        
        if (!dictionary[id]) {
            dictionary[id] = {
                corners: 0,
                area: 0,
                letter: inputArray[j][i].letter
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

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        dictionary[inputArray[i][j].area].corners += corners(i, j);
    }
}

console.log(Object.keys(dictionary).reduce((acc, key) => acc + dictionary[key].corners * dictionary[key].area, 0));

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);