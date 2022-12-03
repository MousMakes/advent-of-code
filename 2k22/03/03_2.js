const { readFileSync } = require("fs");

const input = readFileSync('./03_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

let prioritySum = 0;

for (let i = 0; i < lines.length; i += 3) {
    const firstBackpack = lines[i];
    const secondBackpack = lines[i + 1];
    const thirdBackpack = lines[i + 2];

    const reg = new RegExp(`[${firstBackpack}]`, 'g');
    const matchesInSecondBackpack = secondBackpack.match(reg).join('');
    const matchesInThirdBackpack = thirdBackpack.match(reg).join('');

    const secondReg = new RegExp(`[${matchesInSecondBackpack}]`, 'g');
    const badge = matchesInThirdBackpack.match(secondReg).join('');
    
    if (badge === badge.toLocaleUpperCase()) {
        prioritySum += (badge.charCodeAt(0) - 64 + 26);
    } else {
        prioritySum += (badge.charCodeAt(0) - 96);
    }
}

console.log(prioritySum);