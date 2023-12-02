import input from "./input";
// import input from "./example_input";

const puzzleMax = {
    red: 12,
    green: 13,
    blue: 14,
}

const splitInput = input.split("\n");
let total = 0;

// part one
// for (let line of splitInput) {
//     const rounds = line.split(":")[1];
//     const colorValues = rounds.split(/[;,]/).map(inputString => {
//         inputString = inputString.trim();
//         return {
//             color: inputString.split(" ")[1],
//             value: parseInt(inputString.split(" ")[0])
//         }
//     })
//     let flag = true;

//     for (let color of Object.keys(puzzleMax) as Array<keyof typeof puzzleMax>) {
//         const maxColorValue = colorValues.filter(colorValue => colorValue.color === color).reduce((acc, curr) => curr.value > acc ? curr.value : acc, 0);
//         if (maxColorValue > puzzleMax[color]) {
//             flag = false;
//             break;
//         };
//     }

//     if (flag) {
//         total += parseInt(line.split(' ')[1]);
//     }
// }

// part two
for (let line of splitInput) {

    const lineMin = {
        red: 0,
        green: 0,
        blue: 0,
    }
    const rounds = line.split(":")[1].split(';');

    for (let round of rounds) {
        const colorValues = round.split(/[,]/).map(inputString => {
            inputString = inputString.trim();
            return {
                color: inputString.split(" ")[1],
                value: parseInt(inputString.split(" ")[0])
            }
        })

        for (let colorValue of colorValues as Array<{ color: keyof typeof lineMin, value: number }>) {
            if (colorValue.value > lineMin[colorValue.color]) {
                lineMin[colorValue.color] = colorValue.value;
            }
        }
    }

    total += Object.values(lineMin).reduce((acc, curr) => acc * curr, 1);
}



console.log(total)
