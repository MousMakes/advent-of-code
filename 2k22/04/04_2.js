const { readFileSync } = require("fs");

const input = readFileSync('./04_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const areRangesOverlapping = (range1Start, range1End, range2Start, range2End) => {
    return (
        range2Start <= range1End &&
        range2End >= range1Start
    );
}

const count = lines
    .map(line => {
        const ranges = line.match(/\d+/gm).map(x => Number.parseInt(x, 10));
        return areRangesOverlapping(...ranges);
    })
    .filter(isInRange => isInRange)
    .length;

console.log(count);