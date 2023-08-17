function solve(n,m){

    let numOne = Number(n);
    let numTwo = Number(m);

    let sum = 0

    for (let index = numOne; index <= numTwo; index++) {
        sum += index;
    }

    return sum;
}

