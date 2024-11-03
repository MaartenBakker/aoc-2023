import input from "./example_input";
// import input from "./input";

// part one
const lines = input.split('\n').map(line => line.trim())

const rows = lines.map(line => {
    const splitLine = line.split(' ');
    return {
        springs: splitLine[0],
        groups: splitLine[1].split(',')
    }
})



const permutationIsValid = (groups: string[], permutation: string) => {
    const pattern = groups.map(length => `([^\\.]{${length}})`).join('\\.+');
    const groupPattern = new RegExp(`^\\.*${pattern}\\.*$`);
    return permutation.match(groupPattern) !== null;
}

rows.forEach(row => console.log(permutationIsValid(row.groups, row.springs)))








// part two


