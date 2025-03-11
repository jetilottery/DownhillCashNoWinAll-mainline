define(require => {
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    return data => ({
        cells: {
            prizeLevel: data.division,
            prizeDescription: data.description,
            prizeValue: SKBeInstant.formatCurrency(data.prize).formattedAmount
        },
    });
});
