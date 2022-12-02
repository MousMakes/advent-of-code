// A = rock
// B = paper
// C = scissors

// X = rock
// Y = paper
// Z = scissors


const opponentMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
};

const pointsPerChoice = {
    rock: 1,
    paper: 2,
    scissors: 3
};

const defeatMap = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
}
const defeatInvertMap = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
}

const getScore = (opponent, howToEnd) => {
    let count = 0;

    let playersChoice;

    if (howToEnd === 'X') {
        playersChoice = defeatMap[opponentMap[opponent]];
        count += 0;
    } else if (howToEnd === 'Y') {
        playersChoice = opponentMap[opponent];
        count += 3;
    } else {
        playersChoice = defeatInvertMap[opponentMap[opponent]];
        count += 6;
    }

    count += pointsPerChoice[playersChoice];

    return count;
}

const { readFileSync } = require("fs");

const input = readFileSync('./02_input.txt', { encoding: 'utf-8' })

const lines = input.split('\r\n');

const score = lines
    .map(line => {
        const splits = line.split(' ');
        return getScore(splits[0], splits[1]);
    })
    .reduce((prev, curr) => prev + curr, 0);

    console.log(score)