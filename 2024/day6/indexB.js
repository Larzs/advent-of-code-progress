import { input } from './input.js';
//import { input } from './test.js';

let result = 0;
let inputArray = [];
let inputArrayOriginal = [];
let position = [0, 0];
let direction = 0;
let maxWidth = 0;
let maxHeight = 0;
let bounceList = [];
let pathList = {};
let realStartPos = [];

const addToBounceList = (arr, dir) => {
    const bounce = bounceList.find(el => el.posX == arr[0] && el.posY === arr[1] && el.dir === dir);

    if (bounce) {
        return true;
    } else {
        bounceList.push({
            posX: arr[0],
            posY: arr[1],
            dir,
        });
    }

    return false;
};

const traversePath = (map, checkLoops = false) => {
    let isFinal = false;
    do {
        let {newX, newY, final} = getNewPosition();
        if (map[newY][newX] === '#' || map[newY][newX] === 'O') {
            if (checkLoops) {
                isFinal = addToBounceList(position, direction);
                if (isFinal) result++;
            }

            direction = (direction + 90) % 360;
        } else {
            if (map[newY][newX] === '.') {
                map[newY][newX] = 'X';
            }
    
            position = [newY, newX];

            if (!checkLoops) {
                pathList['p_' + newY + '_' + newX] = [newY, newX];
            }

            isFinal = final;
        }
    }
    while (!isFinal);

    // for (let i = 0; i < map.length; i++) {
    //     for (let j = 0; j < map[0].length; j++) {
    //         process.stdout.write(map[i][j]);
    //     }
    //     process.stdout.write('\n');
    // }
    // process.stdout.write('\n');
};

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
};

input.split('\n').forEach((line, index) => {
    inputArrayOriginal.push(line.split(''));
    const startPos = line.indexOf('^');
    if (startPos !== -1) {
        position = [index, startPos];
        realStartPos = [index, startPos];
        
        inputArrayOriginal[index][startPos] = 'X';
    }
});

maxWidth = inputArrayOriginal[0].length - 1;
maxHeight = inputArrayOriginal.length - 1;

inputArray = inputArrayOriginal.map(row =>
    row.slice()
);

traversePath(inputArray);

Object.keys(pathList).forEach((elem) => {
    const inputArrayCopy = inputArrayOriginal.map(row =>
        row.slice()
    );

    inputArrayCopy[pathList[elem][0]][pathList[elem][1]] = 'O';

    direction = 0;
    position = [...realStartPos];
    bounceList = [];

    traversePath(inputArrayCopy, true);
});

console.log(result);