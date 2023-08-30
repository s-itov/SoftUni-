function lastKNumbersSequence(n, k) {
    let result = [1];
    while (result.length !== n) {
        result.push(result.slice(-k).reduce((acc, num) => acc + num));
    }
    return result;
}