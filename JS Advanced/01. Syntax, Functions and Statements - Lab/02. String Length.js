function stringLength(stringOne, stringTwo, stringThree) {
    const sumLength = stringOne.length + stringTwo.length + stringThree.length;
    const averageLength = Math.floor(sumLength / 3);
    
    console.log(sumLength);
    console.log(averageLength);
}

stringLength('chocolate', 'ice cream', 'cake');