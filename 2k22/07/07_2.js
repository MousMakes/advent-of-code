const { readFileSync } = require("fs");

const input = readFileSync('./07_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const diskSpaceTotal = 70000000;
const diskSpaceRequired = 30000000;

const filesAndSizes = {};

let currentDir = [];

let diskSpaceUsed = 0;

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
        const size = Number.parseInt(sizeOrDir);
        diskSpaceUsed += size;
        currentDir.forEach(dir => {
            path += `/${dir}`;
            if (!filesAndSizes[path]) {
                filesAndSizes[path] = 0;
            }
            filesAndSizes[path] += size;
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

const diskSpaceAvailable = diskSpaceTotal - diskSpaceUsed;

const diskSpaceToFree = diskSpaceRequired - diskSpaceAvailable;

const sizes = Object.values(filesAndSizes);
const minOfMax = Math.min(...sizes.filter(size => size > diskSpaceToFree));

console.log(minOfMax);