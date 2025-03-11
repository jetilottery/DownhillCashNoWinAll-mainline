define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    const playerNumbers = require('game/components/playerNumbers');
    const luckyNumbers = require('game/components/luckyNumbers');

    let revealAllTimeline;

    function start() {
        const revealPlayer = playerNumbers.revealAll();
        const revealLucky = luckyNumbers.revealAll();

        revealAllTimeline = new Timeline();
        displayList.playerNumbers.interactiveChildren = false;
        displayList.luckyNumbers.interactiveChildren = false;

        //Then the player numbers
        revealAllTimeline = new Timeline({
            tweens: [
                new Timeline({ tweens: revealLucky, stagger: gameConfig.autoPlayWinningNumberInterval }),
                new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence',
            stagger:
                revealLucky.length > 0 && revealPlayer.length > 0
                    ? gameConfig.autoPlayPlayerNumberDelay
                    : 0,
        });
        return revealAllTimeline;
    }

    function stop() {
        // re-enable all interaction at the parent container level
        displayList.playerNumbers.interactiveChildren = true;
        displayList.luckyNumbers.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    return {
        start,
        stop,
    };
});
