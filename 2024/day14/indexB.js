import { input } from './input.js';
//import { input } from './test.js';

const startTime = performance.now();

let robots = [];

const width = 101;
const height = 103;

const searchForStrangeState = () => {
    for (let state = 1; state < 100_000_000; state++) {
        calculateState(state);

        let stateWithoutCollisions = true;

        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                const robotCount = getRobotsByPos(i, j).length;

                if (robotCount > 1)  {
                    stateWithoutCollisions = false;
                    break;
                }
            }

            if (!stateWithoutCollisions) {
                break;
            }
        }

        if (stateWithoutCollisions) {
            console.log(state);
            break;
        }
    }
};

const calculateState = (seconds) => {
    robots.map(robot => {
        robot.current[0] = (((robot.initial[0] + seconds * robot.vector[0]) % width) + width) % width
        robot.current[1] = (((robot.initial[1] + seconds * robot.vector[1]) % height) + height) % height

        return robot;
    });
};

const getRobotsByPos = (posX, posY) => {
    return robots.filter(robot => robot.current[0] === posX && robot.current[1] === posY);
};

const printStateAndCount = () => {
    const midWidth = Math.floor(width / 2);
    const midHeight = Math.floor(height / 2);

    const quadrants = { ll: 0, lh: 0, hl: 0, hh: 0 }
    
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            const robotCount = getRobotsByPos(i, j).length;

            process.stdout.write('' + (robotCount === 0 ? '.' : robotCount));

            if (j !== midHeight && i !== midWidth) {
                const start = j < midHeight ? 'l' : 'h';
                const end = i < midWidth ? 'l' : 'h';

                quadrants[start + end] += robotCount;
            }
        }
        process.stdout.write('\n');
    }

    console.log(Object.keys(quadrants).reduce((acc, quad) => acc * quadrants[quad], 1));
};

input.split('\n').forEach((line) => {
    const robot = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);

    if (robot) {
        robots.push({
            initial: [
                parseInt(robot[1]), parseInt(robot[2])
            ],
            vector: [
                parseInt(robot[3]), parseInt(robot[4])
            ],
            current: []
        });
    }
});

searchForStrangeState();
printStateAndCount();

const endTime = performance.now();
console.log(`Process took ${endTime - startTime} milliseconds`);