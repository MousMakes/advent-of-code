const { readFileSync } = require("fs");

const input = readFileSync('./01_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const elves = [];

let actualElf = [];
elves.push(actualElf)

lines.forEach(line => {
    if (!line.trim().length) {
        actualElf = [];
        elves.push(actualElf);
    } else {
        actualElf.push(Number.parseInt(line.trim(), 10));
    }
});

const sums = elves.map(calories => calories.reduce((prev, curr) => prev + curr, 0)).sort((a, b) => b - a);

console.log(sums[0] + sums[1] + sums[2]);

