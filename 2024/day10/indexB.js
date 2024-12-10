import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let inputArray = [];
let result = [];

const matrix = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const getValidAdjacentNodes = (x, y, level) => {
    let validOutgoingNodes = [];
    let validIncomingNodes = [];

    for (let index = 0; index < matrix.length; index++) {
        const newX = x + matrix[index][0];
        const newY = y + matrix[index][1];

        if (newX < 0 || newY < 0 || newX >= height || newY >= width) continue; // out of bounds

        if (inputArray[newX][newY].level === level) {
            validOutgoingNodes.push([newX, newY]);
        }

        if (inputArray[newX][newY].level === level - 1) {
            validIncomingNodes.push([newX, newY]);
        }
    }

    return [validOutgoingNodes, validIncomingNodes];
};


const explore = (x, y, level, path) => {
    let newBranchNode = '';
    if (path.includes('%' + inputArray[x][y].index + '-')) return; // loop

    if (inputArray[x][y].level === 9) { 
        inputArray[x][y].branches.push(path);
        return; // finish
    }

    level++;
    const nextNodes = getValidAdjacentNodes(x, y, level);

    if (nextNodes[0].length > 1 || nextNodes[1].length > 1) {
        newBranchNode = '$' + inputArray[x][y].index + '-';
    }

    for (let index = 0; index < nextNodes[0].length; index++) {
        explore(nextNodes[0][index][0], nextNodes[0][index][1], level, newBranchNode + path);
    }
};

input.split('\n').forEach((line, rowIndex) => {
    const positions = line.split('');
    let lineArray = [];

    for (let columnIndex = 0; columnIndex < positions.length; columnIndex++) {
        lineArray.push({
            index: rowIndex * positions.length + columnIndex,
            level: parseInt(positions[columnIndex]),
            branches: []
        });
    }

    inputArray.push(lineArray);
});

const height = inputArray.length;
const width = inputArray[0].length;

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (inputArray[i][j].level === 0) {
            explore(i, j, inputArray[i][j].level, '');
        }
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (inputArray[i][j].level === 9) {
            result.push(inputArray[i][j].branches.length);
        }
    }
}

console.log(result.reduce((acc, item) => acc + item, 0));

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);