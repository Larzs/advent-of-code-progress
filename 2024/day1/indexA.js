import { input } from './input.js';
const arr1 = [];
const arr2 = [];
let sortedArr1 = [];
let sortedArr2 = [];
const result = [];

input.split('\n').forEach(line => {
    line.split('   ').forEach((numb, index) => index === 0 ? arr1.push(numb) : arr2.push(numb));
});

sortedArr1 = arr1.sort();
sortedArr2 = arr2.sort();

sortedArr1.forEach((number, index) => {
    result.push(Math.abs(number - sortedArr2[index]));
});

const finalResult = result.reduce((a, b) => a + b, 0);

console.log(finalResult);