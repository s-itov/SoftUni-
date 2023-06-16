exports.generatePlatform = (currentPlatform) => {
    const platforms = [
        { value: 'PC', selected: false },
        { value: 'Nintendo', selected: false },
        { value: 'PS4', selected: false },
        { value: 'PS5', selected: false },
        { value: 'XBOX', selected: false },
    ];

    const result = platforms.map(x => x.value === currentPlatform ? {...x, selected: true} : x);

    return result;
}
