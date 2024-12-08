import { rules } from './input-rules.js';
import { updates } from './input-updates.js';

// import { rules } from './test-rules.js';
// import { updates } from './test-updates.js';

let result = 0;
let rulesObj = {};

const fixSequence = (updatesObj) => {
    let swappedPositions = 0;

    for (let key in updatesObj) {
        const checkArray = rulesObj['r_' + updatesObj[key]['value']];

        if (checkArray) {
            for (let index = 0; index < checkArray.length; index++) {
                if (updatesObj['n_' + checkArray[index]] && updatesObj[key]['position'] > updatesObj['n_' + checkArray[index]]['position']) {
                    const tempPosition = updatesObj[key]['position'];
                    updatesObj[key]['position'] = updatesObj['n_' + checkArray[index]]['position'];
                    updatesObj['n_' + checkArray[index]]['position'] = tempPosition;
                    swappedPositions++;
                }
            }
        }
    }

    return [swappedPositions, updatesObj];
}

rules.split('\n').forEach(line => {
    const rule = line.split('|');

    if (!rulesObj['r_'+ rule[0]]) {
        rulesObj['r_'+ rule[0]] = [];
    }

    rulesObj['r_'+ rule[0]].push(rule[1]);
});

updates.split('\n').forEach(line => {
    let updatesObj = {};
    const update = line.split(',');

    for (let index = 0; index < update.length; index++) {
        updatesObj['n_'+ update[index]] = {
            value: update[index],
            position: index
        };
    }

    let swapped = 0;
    let swappedTotal = 0;

    do {
       [swapped, updatesObj] = fixSequence(updatesObj);
       swappedTotal += swapped;
    } while (swapped > 0);

    if (swappedTotal > 0) {
        const middleIndex = Math.floor(update.length / 2);
        result += parseInt(updatesObj[Object.keys(updatesObj).find(elem => updatesObj[elem]['position'] === middleIndex)]['value']);
    }
});

console.log(result);