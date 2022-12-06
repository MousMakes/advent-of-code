const { readFileSync } = require("fs");

let input = readFileSync('./06_input.txt', { encoding: 'utf-8' });

const lengthOfDelimiter = 4;

let startOfPacket = lengthOfDelimiter;

while (input.length > lengthOfDelimiter) {
    const sequence = input.substring(0, lengthOfDelimiter);
    const chars = sequence.split('');
    const uniqueChars = Array.from(new Set(chars));

    if (uniqueChars.length === lengthOfDelimiter) {
        break;
    }

    input = input.substring(1);
    startOfPacket++;
}

console.log(startOfPacket);