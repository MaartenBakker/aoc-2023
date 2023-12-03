import input from "./input";
// import input from "./example_input";

let total = 0;

const lines = input.split("\n").map(line => line.trim());

// part one

// const partNumbers: number[] = [];
// let numString = "";
// let isPart = false;

// function hasAdjacentSymbol(i: number, j: number) {
//     for (let k = -1; k < 2; k++) {
//         for (let l = -1; l < 2; l++) {
//             if (lines[i + k] === undefined) continue;
//             const symbol = lines[i + k][j + l];
//             if (symbol !== undefined && symbol !== "." && isNaN(parseInt(symbol))) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function processPart() {
//     if (numString.length > 0 && isPart) {
//         partNumbers.push(parseInt(numString));

//     }
//     numString = "";
//     isPart = false;

// }

// for (let i = 0; i < lines.length; i++) {
//     for (let j = 0; j < lines[i].length; j++) {
//         if (!isNaN(parseInt(lines[i][j]))) {
//             numString += lines[i][j];
//             if (!isPart) {
//                 isPart = hasAdjacentSymbol(i, j);
//             }
//         } else {
//             processPart()
//         }
//     }

//     processPart()
// }


// console.log(partNumbers.reduce((acc, curr) => acc + curr, 0));

// part two

const gears: { y: number, x: number, partOne: number, partTwo: number | undefined }[] = [];
let numString = "";
let isPart: { y: number, x: number } | null = null;

function hasAdjacentGearSymbol(i: number, j: number) {
    for (let k = -1; k < 2; k++) {
        for (let l = -1; l < 2; l++) {
            if (lines[i + k] === undefined) continue;
            const symbol = lines[i + k][j + l];
            if (symbol === "*") {
                return { y: i + k, x: j + l };
            }
        }
    }
    return null;
}

function processGear() {
    if (numString.length > 0 && isPart) {
        const existingGear = gears.find(gear => gear.y === isPart!.y && gear.x === isPart!.x);
        if (existingGear) {
            existingGear.partTwo = parseInt(numString);
        } else {
            gears.push({
                y: isPart!.y,
                x: isPart!.x,
                partOne: parseInt(numString),
                partTwo: undefined
            });
        }
    }
    numString = "";
    isPart = null;
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (!isNaN(parseInt(lines[i][j]))) {
            numString += lines[i][j];
            if (!isPart) {
                isPart = hasAdjacentGearSymbol(i, j);
            }
        } else {
            processGear();
        }
    }

    // handle last item in line
    processGear();
}

const completeGears = gears.filter(gear => gear.partTwo !== undefined);

console.log(completeGears.reduce((acc, curr) => acc + curr.partOne! * curr.partTwo!, 0));