function solve(fruitType, grams, pricePerKg) {
    const gramsToKg = Number(grams / 1000);
    const moneyNeeded = gramsToKg * pricePerKg;

    console.log(`I need $${moneyNeeded.toFixed(2)} to buy ${gramsToKg.toFixed(2)} kilograms ${fruitType}.`);
}

solve('orange', 2500, 1.80);
solve('apple', 1563, 2.35);