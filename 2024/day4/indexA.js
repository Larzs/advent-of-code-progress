import { input } from './input.js';
//import { input } from './test.js';

let result = 0;
let inputArray = [];

const triggerList = ['X', 'M', 'A', 'S'];
const directionsMatrix = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

input.split('\n').forEach(line => {
    inputArray.push(line.split(''));
});

const checkLetter = ([posX, posY], trigger) => {
    if (posX < 0 || posY < 0 || posX >= inputArray.length || posX >= inputArray[0].length) return false;
    if (inputArray[posX][posY] === triggerList[trigger]) return true; 
    return false;
}

for (let indexX = 0; indexX < inputArray.length; indexX++) { // row
    for (let indexY = 0; indexY < inputArray[indexX].length; indexY++) { // column
        let activeDirections = [false, false, false, false, false, false, false, false];
        let triggerIndex = 0;

        if (inputArray[indexX][indexY] === triggerList[triggerIndex]) {

            for (let letter = 1; letter < triggerList.length; letter++) {

                for (let d = 0; d < activeDirections.length; d++) {
                    if (letter === 1) {
                        activeDirections[d] = checkLetter([indexX, indexY].map((el, i) => el + (directionsMatrix[d][i] * letter)), letter);
                    } else {
                        if (activeDirections[d]) {
                            activeDirections[d] = checkLetter([indexX, indexY].map((el, i) => el + (directionsMatrix[d][i] * letter)), letter);
                        }
                    }
                }
            }

            result += activeDirections.reduce((acc, el) => acc + (el ? 1: 0), 0);
        }
    }
}

console.log(result);