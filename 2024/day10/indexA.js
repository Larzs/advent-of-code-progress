import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let inputArray = [];
let result = [];

const matrix = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const getValidAdjacentNodes = (x, y, level) => {
    let validCoordPairs = [];

    for (let index = 0; index < matrix.length; index++) {
        const newX = x + matrix[index][0];
        const newY = y + matrix[index][1];

        if (newX < 0 || newY < 0 || newX >= height || newY >= width) continue;
        if (inputArray[newX][newY].level === level) {
            validCoordPairs.push([newX, newY]);
        }

    }

    return validCoordPairs;
};

const explore = (x, y, level, start) => {
    if (inputArray[x][y].visited.includes(start)) return; // loop

    inputArray[x][y].visited.push(start);

    if (inputArray[x][y].level === 9) { 
        inputArray[x][y].startPositions.push(start);
        return;
    }

    level++;
    const nextNodes = getValidAdjacentNodes(x, y, level);

    for (let index = 0; index < nextNodes.length; index++) {
        explore(nextNodes[index][0], nextNodes[index][1], level, start);
    }
};

input.split('\n').forEach((line, rowIndex) => {
    const positions = line.split('');
    let lineArray = [];

    for (let columnIndex = 0; columnIndex < positions.length; columnIndex++) {
        lineArray.push({
            index: rowIndex * positions.length + columnIndex,
            level: parseInt(positions[columnIndex]),
            visited: [],
            startPositions: []
        });
    }

    inputArray.push(lineArray);
});

const height = inputArray.length;
const width = inputArray[0].length;

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (inputArray[i][j].level === 0) {
            explore(i, j, inputArray[i][j].level, inputArray[i][j].index);
        }
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (inputArray[i][j].level === 9) {
            result.push(inputArray[i][j].startPositions.length);
        }
    }
}

console.log(result.reduce((acc, item) => acc + item, 0));
const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);