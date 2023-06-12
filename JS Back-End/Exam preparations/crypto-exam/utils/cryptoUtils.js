exports.generatePaymentMethods = (currentMethod) => {
    const paymentMethods = [
        { key: 1, label: 'crypto-wallet', selected: false },
        { key: 2, label: 'credit-card', selected: false },
        { key: 3, label: 'debit-card', selected: false },
        { key: 4, label: 'paypal', selected: false },
    ];

    const result = paymentMethods.map(x => x.label === currentMethod ? {...x, selected: true} : x);

    return result;
}