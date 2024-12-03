import { input } from './input.js';
//import { input } from './test.js';

let result = 0;

const matches = input.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g);

matches.forEach(match => result += parseInt(match[1] * parseInt(match[2])));

console.log(result);