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

const playerMap = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
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

const getScore = (opponent, player) => {
    let count = pointsPerChoice[playerMap[player]];

    if (opponentMap[opponent] === playerMap[player]) {
        count += 3;
    } else if (defeatMap[playerMap[player]] === opponentMap[opponent]) {
        count += 6;
    }

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