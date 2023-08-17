function solve(numOne, numTwo, numThree) {
    let maxNum = -100;
    let array = [numOne, numTwo, numThree];

    for (let i = 0; i < array.length; i++) {

        if (maxNum < array[i]) {
            maxNum = array[i];
        }
    }

    console.log(`The largest number is ${maxNum}.`);
}

solve(-3,-5,-22.5);