const { readFileSync } = require("fs");

const input = readFileSync('./04_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const isRange1InRange2 = (range1Start, range1End, range2Start, range2End) => {
    return (
        range2Start >= range1Start &&
        range2Start <= range1End &&
        range2End >= range1Start &&
        range2End <= range1End
    );
}

const count = lines
    .map(line => {
        const [
            range1Start,
            range1End,
            range2Start,
            range2End
        ] = line.match(/\d+/gm).map(x => Number.parseInt(x, 10));
        return isRange1InRange2(range1Start, range1End, range2Start, range2End) || isRange1InRange2(range2Start, range2End, range1Start, range1End);
    })
    .filter(isInRange => isInRange)
    .length;

console.log(count);