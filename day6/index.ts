// import input from "./example_input";
import input from "./input";

// const lines = input.split("\n").map(line => line.trim());
// console.log(lines);

// // part one
// const times = lines[0].match(/\d+/g)!.map(n => parseInt(n));
// const distances = lines[1].match(/\d+/g)!.map(n => parseInt(n));
// const optionScores = [];


// for (let i = 0; i < times!.length; i++) {
//     const options = [];
//     for (let j = 1; j < times[i]; j++) {
//         const velocity = j * 1;
//         const travelTime = times[i] - j;
//         const distance = velocity * travelTime;

//         if (distance > distances[i]) {
//             options.push(times[i]);
//         }
//     }
//     optionScores.push(options.length);
// }

// console.log(optionScores.reduce((a, b) => a * b, 1))


// part two

const lines = input.split("\n").map(line => line.trim());

const time = parseInt(lines[0].match(/\d+/g)!.reduce((a, b) => a + b));
const distanceToBeat = parseInt(lines[1].match(/\d+/g)!.reduce((a, b) => a + b));

const options = [];
for (let j = 1; j < time; j++) {
    const velocity = j * 1;
    const travelTime = time - j;
    const distance = velocity * travelTime;

    if (distance > distanceToBeat) {
        options.push(time);
    }
}
console.log(options.length);