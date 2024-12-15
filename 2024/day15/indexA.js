// import { input as maze } from './test-maze.js';
// import { input as controls } from './test-controls.js';
import { input as maze } from './input-maze.js';
import { input as controls } from './input-controls.js';

const startTime = performance.now();

let inputArray = [];
let robot = [];
let result = 0;

const calculateGPSSum = () => {
    for (let j = 0; j < inputArray.length; j++) {
        for (let i = 0; i < inputArray[0].length; i++) {
            if (inputArray[j][i] === 'O') { 
                result += j * 100 + i;
            }
        }
    }
}

const move = (directionMatrix, dir) => {
    let tempPos = [robot[0] + directionMatrix[0], robot[1] + directionMatrix[1]];
    let toMove = [];
    let free = [];

    do {
        if (inputArray[tempPos[0]][tempPos[1]] === '#') { return; }
        if (inputArray[tempPos[0]][tempPos[1]] === 'O') toMove.push(tempPos);
        if (inputArray[tempPos[0]][tempPos[1]] === '.') { free = [tempPos[0], tempPos[1]]; break; }

        tempPos = [tempPos[0] + directionMatrix[0], tempPos[1] + directionMatrix[1]];
    } while (inputArray[tempPos[0]][tempPos[1]] !== '#');

    if (free.length > 0) {
        if (toMove.length > 0) {
            inputArray[free[0]][free[1]] = 'O';
            inputArray[toMove[0][0]][toMove[0][1]] = '@';
            inputArray[robot[0]][robot[1]] = '.';
            robot = toMove[0];

        } else {
            inputArray[free[0]][free[1]] = '@';
            inputArray[robot[0]][robot[1]] = '.';
            robot = free;
        }
    }
};

const printState = () => {
    for (let j = 0; j < inputArray.length; j++) {
        for (let i = 0; i < inputArray[0].length; i++) {
            process.stdout.write('' + inputArray[j][i]);
        }
        process.stdout.write('\n');
    }

    process.stdout.write('\n');
};

maze.split('\n').forEach((line, rowIndex) => {
    const positions = line.split('');
    let lineArray = [];

    positions.forEach((pos, columnIndex) => {
        if (pos === '@') {
            robot = [rowIndex, columnIndex];
        }

        lineArray.push(pos);
    });

    inputArray.push(lineArray);
});

const parsedControls = controls.split('');

for (let index = 0; index < parsedControls.length; index++) {
    if (parsedControls[index] === '^') move([-1, 0], '^');
    if (parsedControls[index] === '>') move([0, 1], '>');
    if (parsedControls[index] === 'v') move([1, 0], 'v');
    if (parsedControls[index] === '<') move([0, -1], '<');
    //printState();
}

calculateGPSSum();
console.log(result);

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);