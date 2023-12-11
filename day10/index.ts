
// import input from "./example_input";
import input from "./input";


// part one
const lines = input.split('\n').map(line => line.trim());


// Order: north, east, south, west
function getSurroundingPositions(position: { x: number, y: number }) {
    return [
        { x: position.x, y: position.y - 1 },
        { x: position.x + 1, y: position.y },
        { x: position.x, y: position.y + 1 },
        { x: position.x - 1, y: position.y },
    ]
}

const pipes = ['|', '-', 'L', 'J', '7', 'F', 'S'] as const;
type Pipe = typeof pipes[number];
type Position = { x: number, y: number };

const connectingToNorth: Pipe[] = ['|', '7', 'F', 'S'];
const connectingToEast: Pipe[] = ['-', 'J', '7', 'S'];
const connectingToSouth: Pipe[] = ['|', 'L', 'J', 'S'];
const connectingToWest: Pipe[] = ['-', 'L', 'F', 'S'];

function isConnectingToNorth(pipe: Pipe) {
    return connectingToNorth.includes(pipe);
}
function isConnectingToEast(pipe: Pipe) {
    return connectingToEast.includes(pipe);
}
function isConnectingToSouth(pipe: Pipe) {
    return connectingToSouth.includes(pipe);
}
function isConnectingToWest(pipe: Pipe) {
    return connectingToWest.includes(pipe);
}


function getPipeAt(position: Position) {
    if (lines[position.y] && lines[position.y][position.x])
        return lines[position.y][position.x] as Pipe;
}

function getConnectingPositions(position: Position) {
    const pipeAtPosition = getPipeAt(position);
    const connectingPositions: Array<Position> = [];

    // Order: north, east, south, west
    for (let i = 0; i < 4; i++) {
        const surroundingPosition = getSurroundingPositions(position)[i];

        if (i == 0 && isConnectingToSouth(pipeAtPosition!) && isConnectingToNorth(getPipeAt(surroundingPosition)!) ||
            i == 1 && isConnectingToWest(pipeAtPosition!) && isConnectingToEast(getPipeAt(surroundingPosition)!) ||
            i == 2 && isConnectingToNorth(pipeAtPosition!) && isConnectingToSouth(getPipeAt(surroundingPosition)!) ||
            i == 3 && isConnectingToEast(pipeAtPosition!) && isConnectingToWest(getPipeAt(surroundingPosition)!)) {

            connectingPositions.push(surroundingPosition);
        }
    }
    return connectingPositions;
}

let positionOfS;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('S')) {
        positionOfS = { x: lines[i].indexOf('S'), y: i };
    }
}


const startingPositions = getConnectingPositions(positionOfS!) as Array<Position>;

const allPipePositions: Array<Position> = [positionOfS!, ...startingPositions];

// pick any of the starting pipes
let nextPosition = startingPositions[0]

while (nextPosition) {
    const connectingPositions = getConnectingPositions(nextPosition) as Array<Position>;
    nextPosition = connectingPositions.find(position => !allPipePositions.some(pipePosition => pipePosition.x === position.x && pipePosition.y === position.y))!;

    if (nextPosition) {
        allPipePositions.push(nextPosition);
    }
}

console.log(allPipePositions.length / 2)


// part two

function isPartOfPipe(position: Position) {
    return allPipePositions.some(pipePosition => pipePosition.x === position.x && pipePosition.y === position.y);
}

function isCorner(pipe: Pipe) {
    return pipe === 'J' || pipe === 'L' || pipe === '7' || pipe === 'F' || pipe === 'S';
}

// for example input
// function isCornerToNorth(pipe: Pipe) {
//     return pipe === 'J' || pipe === 'L' || pipe === 'S';
// }

// function isCornerToSouth(pipe: Pipe) {
//     return pipe === '7' || pipe === 'F';
// }

// for real input
function isCornerToNorth(pipe: Pipe) {
    return pipe === 'J' || pipe === 'L' || pipe === 'S';
}

function isCornerToSouth(pipe: Pipe) {
    return pipe === '7' || pipe === 'F';
}

let insidePositions = [];

for (let y = 0; y < lines.length; y++) {
    let outside = true;
    let previousCorner = null;
    for (let x = 0; x < lines[y].length; x++) {
        const currentPostion = { x, y };
        const pipeAtCurrentPosition = getPipeAt(currentPostion);

        if (!isPartOfPipe(currentPostion) && !outside) {
            insidePositions.push(currentPostion);
        } else if (isPartOfPipe(currentPostion) && pipeAtCurrentPosition === '|') {
            outside = !outside;
        } else if (isPartOfPipe(currentPostion) && isCorner(pipeAtCurrentPosition!)) {
            if (!previousCorner) {
                previousCorner = pipeAtCurrentPosition;
            } else {
                if ((isCornerToNorth(pipeAtCurrentPosition!) && isCornerToNorth(previousCorner)) || (isCornerToSouth(pipeAtCurrentPosition!) && isCornerToSouth(previousCorner))) {
                    previousCorner = null;
                    continue
                } else {
                    outside = !outside;
                    previousCorner = null;
                }
            }
        }
    }
}

console.log(insidePositions)
console.log(insidePositions.length)