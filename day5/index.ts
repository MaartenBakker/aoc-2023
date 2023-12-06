// import input from "./example_input";
import input from "./input";

const parts = input.split('/\n\n/')[0].split(/\n\s*\n/);

// part one

// const seeds = parts[0].split(":")[1].trim().split(" ").map(n => parseInt(n));

// const mapTypes = ["seedToSoilMaps", "soilToFertilizerMaps", "fertilizerToWaterMaps", "waterToLightMaps", "lightToTemperatureMaps", "temperatureToHumidityMaps", "humidityToLocationMaps"];

// const maps: { destination: number, source: number, range: number }[][] = [];

// for (let mapTypeIndex = 0; mapTypeIndex < mapTypes.length; mapTypeIndex++) {

//     const mapInput = parts[mapTypeIndex + 1].match(/\d+/g);

//     const currentTypeMaps = [];

//     for (let i = 0; i < mapInput!.length; i += 3) {

//         currentTypeMaps.push({
//             destination: parseInt(mapInput![i]),
//             source: parseInt(mapInput![i + 1]),
//             range: parseInt(mapInput![i + 2])
//         })
//     };

//     maps.push(currentTypeMaps);

// }

// function convert(seed: number, mapTypeIndex: number) {
//     let result = seed;

//     for (let map of maps[mapTypeIndex]) {
//         if (seed >= map.source && seed < map.source + map.range) {
//             result = map.destination + (seed - map.source);
//             break;
//         }
//     }

//     return result;
// }

// function convertAllTypes(seed: number) {
//     let result = seed;

//     for (let mapTypeIndex = 0; mapTypeIndex < mapTypes.length; mapTypeIndex++) {
//         result = convert(result, mapTypeIndex);
//     }

//     return result;
// }

// let finalSeeds = seeds.map(seed => convertAllTypes(seed));

// console.log(finalSeeds.reduce((a, b) => a < b && a !== 0 ? a : b, 0));


// part two

const seeds = parts[0].split(":")[1].trim().split(" ").map(n => parseInt(n));

const mapTypes = ["seedToSoilMaps", "soilToFertilizerMaps", "fertilizerToWaterMaps", "waterToLightMaps", "lightToTemperatureMaps", "temperatureToHumidityMaps", "humidityToLocationMaps"];

const maps: { destination: number, source: number, range: number }[][] = [];

for (let mapTypeIndex = 0; mapTypeIndex < mapTypes.length; mapTypeIndex++) {

    const mapInput = parts[mapTypeIndex + 1].match(/\d+/g);

    const currentTypeMaps = [];

    for (let i = 0; i < mapInput!.length; i += 3) {

        currentTypeMaps.push({
            destination: parseInt(mapInput![i]),
            source: parseInt(mapInput![i + 1]),
            range: parseInt(mapInput![i + 2])
        })
    };

    maps.push(currentTypeMaps.sort((mapA, mapB) => mapA.source - mapB.source));

}

type SeedRange = { start: number, end: number };

function convert(seedRange: SeedRange, mapTypeIndex: number) {
    let result = [];

    for (let i = 0; i < maps[mapTypeIndex].length; i++) {
        const map = maps[mapTypeIndex][i];
        const nextMap = maps[mapTypeIndex][i + 1];
        if (i === 0 && seedRange.end < map.source) {
            // range is completely to the left of lowest map
            result.push(seedRange);

            break;
        } else if (i === 0 && seedRange.start < map.source) {
            // range sticks out to the left of first map
            result.push({ start: seedRange.start, end: map.source - 1 });
        }

        if (i === maps[mapTypeIndex].length - 1 && seedRange.start > map.source + map.range - 1) {
            // range is completely to the right of highest map
            result.push(seedRange);

            break;
        }

        if (seedRange.start <= map.source + map.range - 1 && seedRange.end >= map.source) {
            // there is overlap between range and map

            const sourceStart = Math.max(seedRange.start, map.source);
            const sourceEnd = Math.min(seedRange.end, map.source + map.range - 1);

            result.push({ start: map.destination + sourceStart - map.source, end: map.destination + sourceEnd - map.source });

            if (seedRange.end > map.source + map.range - 1) {
                // range sticks out to the right of map
                const start = map.source + map.range;
                let end;
                if (nextMap) {
                    end = Math.min(seedRange.end, nextMap.source - 1);
                } else {
                    end = seedRange.end;
                }
                if (start <= end) {
                    result.push({ start, end });
                }
            }
        }
    }

    return result;
}

let seedRanges: Array<SeedRange> = [];

// convert input to seedRanges
for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const range = seeds[i + 1];
    const end = start + range - 1;

    seedRanges.push({ start, end });
}

for (let mapType of mapTypes) {
    seedRanges = seedRanges.map(seedRange => convert(seedRange, mapTypes.indexOf(mapType))).flat();
}

console.log(seedRanges.map(seedRange => seedRange.start).reduce((a, b) => a < b && a !== 0 ? a : b, 0));