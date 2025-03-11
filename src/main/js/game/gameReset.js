define(function (require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const playerNumbers = require('game/components/playerNumbers');
    const luckyNumbers = require('game/components/luckyNumbers');
    const winUpTo = require('game/components/winUpTo');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const numberState = require('game/components/state');
    const winAll = require('game/components/winAll');

    function gameReset() {
        playerNumbers.reset();
        luckyNumbers.reset();
        numberState.reset();
        winUpTo.reset();
        winAll.reset();

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
        if (audio.isPlaying('loseTerminator')) {
            audio.fadeOut('loseTerminator', 1);
        }

        gameFlow.next('BUY_SCREEN');
    }

    gameFlow.handle(gameReset, 'GAME_RESET');
});
