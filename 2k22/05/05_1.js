const { readFileSync } = require("fs");

const input = readFileSync('./05_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n').filter(line => !!line);

const stackConfig = lines.filter(line => !line.includes('move'));
const stepConfig = lines.filter(line => line.includes('move'));

const stackNumbersString = stackConfig.filter(line => !line.includes('['))[0];
const stackNumbers = stackNumbersString.match(/\d+/gm);
const stackNumberIndices = stackNumbers.map(stackNumber => stackNumbersString.indexOf(stackNumber));

const stacksWithoutNumbers = stackConfig.filter(line => line.includes('['));

const stacks = stackNumberIndices.map(index => {
    return stacksWithoutNumbers
        .map(stackLine => {
            if (stackLine.length < index) {
                return null;
            }
            if (stackLine.charAt(index) === ' ') {
                return null;
            }
            return stackLine.charAt(index);
        })
        .filter(crate => !!crate)
        .reverse();
});

const moveCrates = (fromStackIndex, toStackIndex, amount) => {
    for (let i = 0; i < amount; i++) {
        stacks[toStackIndex].push(stacks[fromStackIndex].pop());
    }
}

stepConfig.forEach(line => {
    const [amount, fromStackNumber, toStackNumber] = line.match(/\d+/gm).map(x => Number.parseInt(x, 10));
    moveCrates(fromStackNumber - 1, toStackNumber - 1, amount);
});


console.log(stacks.map(stack => stack[stack.length - 1]).join(''));
