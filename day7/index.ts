// import input from "./example_input";
import input from "./input";

// part one
// type card = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" |
//     "T" | "J" | "Q" | "K" | "A";

// const cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", 'K', "A"];

// type handType = "high card" | "one pair" | "two pairs" | "three of a kind" | "full house" | "four of a kind" | "five of a kind";
// const handTypeOrder = ["high card", "one pair", "two pairs", "three of a kind", "full house", "four of a kind", "five of a kind"];

// type Hand = {
//     cards: card[],
//     bid: number,
//     type: handType | undefined;
// }

// function setHandType(hand: Hand) {
//     const cards = hand.cards;
//     const cardCounts = cards.reduce((acc, card) => {
//         acc[card] = acc[card] ? acc[card] + 1 : 1;
//         return acc;
//     }, {} as { [key: string]: number });
//     const cardCountValues = Object.values(cardCounts);

//     if (cardCountValues.includes(5)) {
//         hand.type = "five of a kind";
//     } else if (cardCountValues.includes(4)) {
//         hand.type = "four of a kind";
//     } else if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
//         hand.type = "full house";
//     } else if (cardCountValues.includes(3)) {
//         hand.type = "three of a kind";
//     } else if (cardCountValues.includes(2) && cardCountValues.length === 3) {
//         hand.type = "two pairs";
//     } else if (cardCountValues.includes(2)) {
//         hand.type = "one pair";
//     } else {
//         hand.type = "high card";
//     }
// }

// function compareCards(cardsA: card[], cardsB: card[]): number {
//     for (let i = 0; i < cardsA.length; i++) {
//         const cardA = cardsA[i];
//         const cardB = cardsB[i];

//         if (cardA === cardB) {
//             continue;
//         } else {
//             return cardOrder.indexOf(cardA) - cardOrder.indexOf(cardB);
//         }
//     }
//     return 0;
// }

// function compareHands(handA: Hand, handB: Hand): number {
//     if (handA.type === handB.type) {
//         return compareCards(handA.cards, handB.cards);
//     } else {
//         return handTypeOrder.indexOf(handA.type!) - handTypeOrder.indexOf(handB.type!);
//     }
// }

// const hands = input.split("\n").map(line => line.trim()).map(line => {
//     return {
//         cards: line.split(" ")[0]!.split(""),
//         bid: parseInt(line.split(" ")[1]),
//         type: undefined
//     } as Hand;
// });

// hands.forEach(hand => setHandType(hand));
// hands.sort(compareHands);

// const winnings = hands.reduce((acc, hand) => {
//     return acc += hand.bid * (hands.indexOf(hand) + 1);
// }, 0);

// console.log(winnings);




// part two
type card = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" |
    "T" | "J" | "Q" | "K" | "A";

const cardOrder = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", 'K', "A"];

type handType = "high card" | "one pair" | "two pairs" | "three of a kind" | "full house" | "four of a kind" | "five of a kind";
const handTypeOrder = ["high card", "one pair", "two pairs", "three of a kind", "full house", "four of a kind", "five of a kind"];

type Hand = {
    cards: card[],
    bid: number,
    type: handType | undefined;
}

function setHandType(hand: Hand) {
    const cards = hand.cards;
    const cardCounts = cards.reduce((acc, card) => {
        acc[card] = acc[card] ? acc[card] + 1 : 1;
        return acc;
    }, {} as { [key: string]: number });
    const cardCountValues = Object.values(cardCounts);
    const jokers = cardCounts["J"];

    if (cardCountValues.includes(5) || (cardCountValues.includes(4) && jokers == 1) || (cardCountValues.includes(3) && jokers == 2) || (cardCountValues.includes(2) && jokers == 3) || jokers == 4) {
        hand.type = "five of a kind";
    } else if (cardCountValues.includes(4) || (cardCountValues.includes(3) && jokers == 1) || (cardCountValues.includes(2) && cardCountValues.length == 3 && jokers == 2) || jokers == 3) {
        hand.type = "four of a kind";
    } else if ((cardCountValues.includes(3) && cardCountValues.includes(2)) || (cardCountValues.length == 3 && jokers == 1)) {
        hand.type = "full house";
    } else if ((cardCountValues.includes(3) || (cardCountValues.includes(2)) && jokers == 1) || jokers == 2) {
        hand.type = "three of a kind";
    } else if ((cardCountValues.includes(2) && cardCountValues.length === 3) || (cardCountValues.includes(2) && jokers == 1)) {
        hand.type = "two pairs";
    } else if (cardCountValues.includes(2) || jokers == 1) {
        hand.type = "one pair";
    } else {
        hand.type = "high card";
    }
}

function compareCards(cardsA: card[], cardsB: card[]): number {
    for (let i = 0; i < cardsA.length; i++) {
        const cardA = cardsA[i];
        const cardB = cardsB[i];

        if (cardA === cardB) {
            continue;
        } else {
            return cardOrder.indexOf(cardA) - cardOrder.indexOf(cardB);
        }
    }
    return 0;
}

function compareHands(handA: Hand, handB: Hand): number {
    if (handA.type === handB.type) {
        return compareCards(handA.cards, handB.cards);
    } else {
        return handTypeOrder.indexOf(handA.type!) - handTypeOrder.indexOf(handB.type!);
    }
}

const hands = input.split("\n").map(line => line.trim()).map(line => {
    return {
        cards: line.split(" ")[0]!.split(""),
        bid: parseInt(line.split(" ")[1]),
        type: undefined
    } as Hand;
});

hands.forEach(hand => setHandType(hand));
hands.sort(compareHands);

const winnings = hands.reduce((acc, hand) => {
    return acc += hand.bid * (hands.indexOf(hand) + 1);
}, 0);

console.log(winnings);

