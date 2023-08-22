function areAllDigitsSame(num) {
    const numStr = num.toString();
    const firstDigit = numStr[0];
    let isSame = true;
    let sum = 0;

    for (let i = 0; i < numStr.length; i++) {
        sum += Number(numStr[i]);

        if (numStr[i] !== firstDigit) {
            isSame = false;
        }
    }

    console.log(isSame);
    console.log(sum);
}

areAllDigitsSame(2222222);

