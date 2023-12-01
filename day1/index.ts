import input from "./input";
// import input from "./example_input";


const splitInput = input.split("\n");
let total = 0;
const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

for (let line of splitInput) {
    for (let word of numberWords) {
        line = line.replaceAll(word, word.charAt(0) + (numberWords.indexOf(word)).toString() + word.charAt(word.length - 1));
    }

    const onlyNumbersLine = line.split('').filter((char: string) => !isNaN(parseInt(char)));
    total += parseInt(onlyNumbersLine[0] + onlyNumbersLine[onlyNumbersLine.length - 1]);
}


console.log(total)
