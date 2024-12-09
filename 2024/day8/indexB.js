import { input } from './input.js';
//import { input } from './test.js';

let map = [];
let inputArray = {};
let result = 0;

const generateBeacon = (anchor, delta, otherAntenna) => {
    let beacon = [
        anchor[0] + delta[0] === otherAntenna[0] ? anchor[0] + delta[0] * -1 : anchor[0] + delta[0],
        anchor[1] + delta[1] === otherAntenna[1] ? anchor[1] + delta[1] * -1 : anchor[1] + delta[1],
    ];

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
            map[inputArray[key]['antennas'][i].pos[0]][inputArray[key]['antennas'][i].pos[1]] = '#';
            map[inputArray[key]['antennas'][j].pos[0]][inputArray[key]['antennas'][j].pos[1]] = '#';

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
        let beacon1 = true;
        let anchor1 = pair.set[0];
        let other1 = pair.set[1];

        let beacon2 = true;
        let anchor2 = pair.set[1];
        let other2 = pair.set[0];

        do {
            beacon1 = generateBeacon(anchor1, pair.delta, other1);
            if (beacon1) {
                pair.beacons.push(beacon1);
                other1 = anchor1;
                anchor1 = beacon1;
            }
        }
        while (beacon1);

        do {
            beacon2 = generateBeacon(anchor2, pair.delta, other2);
            if (beacon2) {
                pair.beacons.push(beacon2);
                other2 = anchor2;
                anchor2 = beacon2;
            }
        }
        while (beacon2);
    });
});

// count antinodes
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === '#') result++;
    }
}

console.log(result);

// for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//         process.stdout.write(map[i][j]);
//     }
//     process.stdout.write('\n');
// }

//console.dir(map, { depth: null });

