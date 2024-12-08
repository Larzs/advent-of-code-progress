import { rules } from './input-rules.js';
import { updates } from './input-updates.js';

// import { rules } from './test-rules.js';
// import { updates } from './test-updates.js';

let result = 0;
let rulesObj = {};

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

    for (let key in updatesObj) {
        let legit = true;
        const checkArray = rulesObj['r_' + updatesObj[key]['value']];

        if (checkArray) {
            for (let index = 0; index < checkArray.length; index++) {
                if (updatesObj['n_' + checkArray[index]] && updatesObj[key]['position'] > updatesObj['n_' + checkArray[index]]['position']) {
                    legit = false;
                }
            }
        }

        if (legit) {
            updatesObj[key]['legit'] = true;
        }
    }

    if (Object.keys(updatesObj).every(elem => updatesObj[elem]['legit'])) {
        result += parseInt(update[Math.floor(update.length / 2)]);
    }
});

console.log(result);