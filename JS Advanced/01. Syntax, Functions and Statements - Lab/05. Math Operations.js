function solve(numOne, numTwo, operator) {

    let operation;
    switch (operator) {
        case '+': operation = numOne + numTwo;
            break;
        case '/': operation = numOne / numTwo;
            break;
        case '-': operation = numOne - numTwo;
            break;
        case '*': operation = numOne * numTwo;
            break;
        case '**': operation = numOne ** numTwo;
            break;
        case '%': operation = numOne % numTwo;
            break;
        default:
            break;
    }

    console.log(operation);

}

solve(3, 5.5, '*');