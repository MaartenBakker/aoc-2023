// import input from "./example_input";
import input from "./input";

const histories = input.split('\n').map(line => line.trim()).map(line => line.split(' ').map(n => parseInt(n)));

// part one

// function getNextHistoryValue(history: number[]) {
//     const upsideDownPyramid: number[][] = [];
//     upsideDownPyramid.push(history);

//     while (upsideDownPyramid[upsideDownPyramid.length - 1].filter(n => n !== 0).length > 1) {
//         const newSequence = [];
//         for (let i = 0; i < upsideDownPyramid[upsideDownPyramid.length - 1].length - 1; i++) {
//             newSequence.push(upsideDownPyramid[upsideDownPyramid.length - 1][i + 1] - upsideDownPyramid[upsideDownPyramid.length - 1][i]);
//         }
//         upsideDownPyramid.push(newSequence);
//     }

//     for (let i = upsideDownPyramid.length - 1; i > 0; i--) {
//         upsideDownPyramid[i - 1].push(upsideDownPyramid[i - 1][upsideDownPyramid[i - 1].length - 1] + upsideDownPyramid[i][upsideDownPyramid[i].length - 1])
//     }

//     return upsideDownPyramid[0][upsideDownPyramid[0].length - 1];

// }

// console.log(histories.map(history => getNextHistoryValue(history)).reduce((acc, n) => acc + n, 0));

// part two

function getNextHistoryValue(history: number[]) {
    const upsideDownPyramid: number[][] = [];
    upsideDownPyramid.push(history);

    while (upsideDownPyramid[upsideDownPyramid.length - 1].filter(n => n !== 0).length > 1) {
        const newSequence = [];
        for (let i = 0; i < upsideDownPyramid[upsideDownPyramid.length - 1].length - 1; i++) {
            newSequence.push(upsideDownPyramid[upsideDownPyramid.length - 1][i + 1] - upsideDownPyramid[upsideDownPyramid.length - 1][i]);
        }
        upsideDownPyramid.push(newSequence);
    }

    for (let i = upsideDownPyramid.length - 1; i > 0; i--) {
        upsideDownPyramid[i - 1].unshift(upsideDownPyramid[i - 1][0] - upsideDownPyramid[i][0])
    }

    return upsideDownPyramid[0][0];

}

console.log(histories.map(history => getNextHistoryValue(history)).reduce((acc, n) => acc + n, 0));

