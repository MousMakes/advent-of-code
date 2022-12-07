const { readFileSync } = require("fs");

const input = readFileSync('./07_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const filesAndSizes = {};

let currentDir = [];

const handleCommand = (line) => {
    if (line.startsWith('$ cd /')) {
        currentDir = [];
    } else if (line.startsWith('$ cd')) {
        const dir =  line.replace('$ cd ', '');
        if (dir === '..') {
            currentDir.pop();
        } else {
            currentDir.push(dir);
        }
    }
}

const handleOutput = (line) => {
    const [sizeOrDir, name] = line.split(' ');
    if (sizeOrDir !== 'dir') {
        let path = '';
        currentDir.forEach(dir => {
            path += `/${dir}`;
            if (!filesAndSizes[path]) {
                filesAndSizes[path] = 0;
            }
            filesAndSizes[path] += Number.parseInt(sizeOrDir);
        });
    }
}

lines.forEach(line => {
    if (line.startsWith('$')) {
        handleCommand(line);
    } else {
        handleOutput(line);
    }
});

const sum = Object.values(filesAndSizes)
    .filter(size => size < 100000)
    .reduce((prev, curr) => prev + curr, 0);

console.log(sum);