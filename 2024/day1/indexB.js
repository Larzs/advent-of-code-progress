import { input } from './input.js';
const arr1 = [];
const arr2 = [];
let result = {};
let finalValue = 0;

input.split('\n').forEach(line => {
    line.split('   ').forEach((numb, index) => index === 0 ? arr1.push(numb) : arr2.push(numb));
});

arr1.forEach(elem1 => {
    result[elem1] = {
        value: parseInt(elem1),
        length: arr2.filter(elem2 => elem1 === elem2).length,
    };
});

for (const [_, row] of Object.entries(result)) {
    finalValue += row.value * row.length;
}

console.log(finalValue);