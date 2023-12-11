
// import input from "./example_input";
import input from "./input";

const lines = input.split('\n').map(line => line.trim());
// part one

// type Galaxy = {
//     y: number;
//     x: number;
// }

// const galaxies: Galaxy[] = [];

// // find galaxies
// for (let y = 0; y < lines.length; y++) {
//     for (let x = 0; x < lines[y].length; x++) {
//         if (lines[y][x] === '#') {
//             galaxies.push({ y, x });
//         }
//     }
// }

// // expand the universe vertically.
// let newLines = 0;

// for (let y = 0; y < lines.length + newLines; y++) {
//     if (galaxies.filter(galaxy => galaxy.y === y).length === 0) {
//         console.log('no galaxies at line ' + y);
//         const galaxiesUnderY = galaxies.filter(galaxy => galaxy.y > y);
//         galaxiesUnderY.forEach(galaxy => galaxy.y++);

//         newLines++;
//         y++;
//     }
// }

// let newColumns = 0;
// // expand the universe horizontally.
// for (let x = 0; x < lines[0].length + newColumns; x++) {
//     if (galaxies.filter(galaxy => galaxy.x === x).length === 0) {
//         console.log('no galaxies at column ' + x);
//         const galaxiesRightOfX = galaxies.filter(galaxy => galaxy.x > x);
//         galaxiesRightOfX.forEach(galaxy => galaxy.x++);

//         newColumns++;
//         x++;
//     }
// }

// function getManhattanDistance(galaxy1: Galaxy, galaxy2: Galaxy) {
//     return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
// }

// // find distances between every pair of galaxies
// let distancesTotal = 0;

// for (let galaxy of galaxies) {
//     for (let otherGalaxy of galaxies) {
//         distancesTotal += getManhattanDistance(galaxy, otherGalaxy);
//     }
// }

// console.log(distancesTotal / 2)

// part two

type Galaxy = {
    y: number;
    x: number;
}

const galaxies: Galaxy[] = [];

// find galaxies
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === '#') {
            galaxies.push({ y, x });
        }
    }
}

// expand the universe vertically.
let newLines = 0;

for (let y = 0; y < lines.length + newLines; y++) {
    if (galaxies.filter(galaxy => galaxy.y === y).length === 0) {
        console.log('no galaxies at line ' + y);
        const galaxiesUnderY = galaxies.filter(galaxy => galaxy.y > y);
        galaxiesUnderY.forEach(galaxy => galaxy.y += 999_999);

        newLines += 999_999;
        y += 999_999
    }
}

let newColumns = 0;
// expand the universe horizontally.
for (let x = 0; x < lines[0].length + newColumns; x++) {
    if (galaxies.filter(galaxy => galaxy.x === x).length === 0) {
        console.log('no galaxies at column ' + x);
        const galaxiesRightOfX = galaxies.filter(galaxy => galaxy.x > x);
        galaxiesRightOfX.forEach(galaxy => galaxy.x += 999_999);

        newColumns += 999_999
        x += 999_999
    }
}

function getManhattanDistance(galaxy1: Galaxy, galaxy2: Galaxy) {
    return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}

// find distances between every pair of galaxies
let distancesTotal = 0;

for (let galaxy of galaxies) {
    for (let otherGalaxy of galaxies) {
        distancesTotal += getManhattanDistance(galaxy, otherGalaxy);
    }
}

console.log(distancesTotal / 2)
