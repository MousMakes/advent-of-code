const { readFileSync } = require("fs");

const input = readFileSync('./03_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const prioritySum = lines
    .map(line => {
        const firstCompartement = line.substring(0, Math.floor(line.length / 2));
        const secondCompartement = line.substring(Math.floor(line.length / 2));

        const reg = new RegExp(`[${firstCompartement}]`, 'g');
        const duplicates = Array.from(new Set(secondCompartement.match(reg)));

        return duplicates
            .map(char => {
                if (char === char.toLocaleUpperCase()) {
                    return char.charCodeAt(0) - 64 + 26;
                } else {
                    return char.charCodeAt(0) - 96;
                }
            })
            .reduce((prev, curr) => prev + curr, 0);
    })
    .reduce((prev, curr) => prev + curr, 0);

console.log(prioritySum);