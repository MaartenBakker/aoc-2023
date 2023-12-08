// import input from "./example_input";
import input from "./input";

// part one
// const parts = input.split('\n\n');
// const directions = parts[0].trim();
// const mappings = parts[1].split('\n').map(line => line.trim()).reduce((acc, line) => {
//     const key = line.split(' = ')[0];
//     const values = line.split(' = ')[1].match(/[A-Z]{3}/g);
//     acc[key] = values!;
//     return acc;
// }, {} as { [key: string]: string[] });


// let currentKey = 'AAA';
// let counter = 0;

// while (currentKey !== 'ZZZ') {
//     let directionIndex = counter % directions.length;
//     const direction = directions[directionIndex];
//     currentKey = mappings[currentKey][direction === 'L' ? 0 : 1];

//     counter++;
// }

// console.log(counter);

// part two
const parts = input.split('\n\n');
const directions = parts[0].trim();

let currentKeys: string[] = [];

const mappings = parts[1].split('\n').map(line => line.trim()).reduce((acc, line) => {
    const key = line.split(' = ')[0];
    const values = line.split(' = ')[1].match(/[A-Z0-9]{3}/g);
    acc[key] = values!;
    if (key[2] === 'A') {
        currentKeys.push(key);
    }
    return acc;
}, {} as { [key: string]: string[] });

let counter = 0;

const repetitionIntervals: { [key: string]: number } = {};

while (Object.keys(repetitionIntervals).length !== currentKeys.length) {

    counter++;

    let directionIndex = counter % directions.length - 1;
    const direction = directions[directionIndex];
    currentKeys = currentKeys.map(currentKey => mappings[currentKey][direction === 'L' ? 0 : 1]);

    for (const key of currentKeys) {
        if (key[2] === 'Z') {
            if (!repetitionIntervals[currentKeys.indexOf(key)]) {
                repetitionIntervals[currentKeys.indexOf(key)] = counter;
            }
        }
    }
}

function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function lcm(a: number, b: number): number {
    return a * b / gcd(a, b);
}

let result = Object.values(repetitionIntervals)[0];
for (let i = 1; i < Object.values(repetitionIntervals).length; i++) {
    result = lcm(result, Object.values(repetitionIntervals)[i]);
}
console.log(result);