define((require) => {
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

    return function scenarioTransform(scenarioString) {
        // winning numbers are just a comma seperated list of numbers
        const luckyNumbers = scenarioString.split('|')[0].split(',');
        let numbers = [];

        scenarioString.split('|')[1].split(',').map(e => {
            let x = {};
            x.num = e.split(':')[0];
            x.val = prizeData.prizeTable[e.split(':')[1]];
            numbers.push(x);
        });

        return {
            numbers,
            luckyNumbers
        };
    };
});
