// import input from "./example_input";
import input from "./input";

const lines = input.split("\n").map(line => line.trim());

// let total = 0;

// part one
// for (let line of lines) {
//     let points = 0;

//     const winningNumbers = line.split(":")[1].split("|")[0].split(" ").filter(n => n !== "");
//     const myNumbers = line.split(":")[1].split("|")[1].split(" ").filter(n => n !== "");

//     for (let number of myNumbers) {
//         if (winningNumbers.includes(number)) {
//             points = points === 0 ? 1 : points * 2;
//         }
//     }

//     total += points;
// }

// console.log(total);

// part two

const cards = new Map<number, number>();
for (let i = 0; i < lines.length; i++) {
    cards.set(i, 1);
}

for (let i = 0; i < lines.length; i++) {

    const winningNumbers = lines[i].split(":")[1].split("|")[0].split(" ").filter(n => n !== "");
    const myNumbers = lines[i].split(":")[1].split("|")[1].split(" ").filter(n => n !== "");

    let winCount = 0;
    for (let number of myNumbers) {
        if (winningNumbers.includes(number)) {
            winCount++;
        }
    }

    for (let j = 1; j <= winCount; j++) {
        if (i + j < cards.size) {
            cards.set(i + j, cards.get(i + j)! + 1 * cards.get(i)!);
        }
    }
}

console.log([...cards.values()].reduce((a, b) => a + b, 0))