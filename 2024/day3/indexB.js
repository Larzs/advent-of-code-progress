import { input } from './input.js';
//import { input } from './test.js';

let result = 0;

const matches = input.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)|do\(\)|don\'t\(\)/g);
let _do = true;

matches.forEach(match => {
    if ('do()' === match[0]) _do = true;
    if ('don\'t()' === match[0]) _do = false;

    if ('do()' !== match[0] && 'don\'t()' !== match[0] && _do) result += parseInt(match[1] * parseInt(match[2]));
});

console.log(result);