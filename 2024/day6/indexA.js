import { input } from './input.js';
//import { input } from './test.js';

let result = 0;
let inputArray = [];
let position = [0, 0];
let direction = 0;
let maxWidth = 0;
let maxHeight = 0;

const getNewPosition = () => {
    let final = false;
    let newY = position[0]; 
    let newX = position[1];

    switch (direction) {
        case 0:
            newY--;
            break;
        case 90:
            newX++;
            break;
        case 180:
            newY++;
            break;
        case 270:
            newX--;
            break;
    }

    if (newX === 0 || newX === maxWidth || newY === 0 || newY === maxHeight) final = true;

    return {newX, newY, final};
}

input.split('\n').forEach((line, index) => {
    inputArray.push(line.split(''));
    const startPos = line.indexOf('^');
    if (startPos !== -1) {
        position[0] = index;
        position[1] = startPos;
        
        inputArray[index][startPos] = 'X';
    }
});

maxWidth = inputArray[0].length - 1;
maxHeight = inputArray.length - 1;

let isFinal = false;
do {
    let {newX, newY, final} = getNewPosition();
    if (inputArray[newY][newX] === '#') {
        direction = (direction + 90) % 360;
    } else {
        if (inputArray[newY][newX] === '.') {
            inputArray[newY][newX] = 'X';
        }

        position = [newY, newX];
        isFinal = final;
    }
}
while (!isFinal);

for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[0].length; j++) {
        process.stdout.write(inputArray[i][j]);
        if (inputArray[i][j] === 'X') result++;
    }
    process.stdout.write('\n');
}

console.log(result);