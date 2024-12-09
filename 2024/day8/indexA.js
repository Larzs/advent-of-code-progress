import { input } from './input.js';
//import { input } from './test.js';

let map = [];
let inputArray = {};
let result = 0;

const generateBeacon = (anchor, delta, otherAntenna, key = '') => {
    let beacon = [
        anchor[0] + delta[0] === otherAntenna[0] ? anchor[0] + delta[0] * -1 : anchor[0] + delta[0],
        anchor[1] + delta[1] === otherAntenna[1] ? anchor[1] + delta[1] * -1 : anchor[1] + delta[1],
    ]

    if (beacon[0] < 0 || beacon[0] > maxHeight || beacon[1] < 0 || beacon[1] > maxWidth) return false; 

    map[beacon[0]][beacon[1]] = '#';

    return beacon;
};

input.split('\n').forEach((line, lIndex) => {
    const row = line.split('');
    map.push(row);

    row.forEach((ch, rIndex) => {
        if (ch !== '.') {
            if (!inputArray[ch]) {
                inputArray[ch] = {
                    pairs: [],
                    antennas: [],
                };
            }

            inputArray[ch]['antennas'].push({
                id: lIndex + '_' + rIndex,
                pos: [lIndex, rIndex]
            });
        }
    });
});

const maxHeight = map.length - 1;
const maxWidth = map[0].length - 1;

// generate pairs and deltas
Object.keys(inputArray).forEach(key => {
    for (let i = 0; i < inputArray[key]['antennas'].length; i++) {
        for (let j = i+1; j < inputArray[key]['antennas'].length; j++) {
            inputArray[key]['pairs'].push({
                beacons: [],
                set: [inputArray[key]['antennas'][i].pos, inputArray[key]['antennas'][j].pos],
                delta: [
                    Math.abs(inputArray[key]['antennas'][i].pos[0] - inputArray[key]['antennas'][j].pos[0]),
                    Math.abs(inputArray[key]['antennas'][i].pos[1] - inputArray[key]['antennas'][j].pos[1])
                ]
            });
        }
    }
});

// generate antinodes
Object.keys(inputArray).forEach(key => {
    inputArray[key]['pairs'].forEach(pair => {
        const beacon1 = generateBeacon(pair.set[0], pair.delta, pair.set[1], key);
        if (beacon1) pair.beacons.push(beacon1);
        
        const beacon2 = generateBeacon(pair.set[1], pair.delta, pair.set[0], key);
        if (beacon2) pair.beacons.push(beacon2);
    });
});

// count antinodes
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === '#') result++;
    }
}

console.log(result);

//console.dir(map, { depth: null });

