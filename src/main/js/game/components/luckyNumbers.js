define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const LuckyNumber = require('game/components/LuckyNumber');
    const numberState = require('game/components/state');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let cards;
    let numbers;

    let idleTween;

    function randomIdleDuration() {
        return (
            gameConfig.playerNumberIdleInterval -
            gameConfig.idleIntervalVariation +
            Math.random() * gameConfig.idleIntervalVariation * 2
        );
    }

    function init() {
        idleTween = Tween.to({}, randomIdleDuration(), {
            onComplete: promptIdle,
            paused: true,
        });

        cards = [
            LuckyNumber.fromContainer(displayList.luckyNumber1),
            LuckyNumber.fromContainer(displayList.luckyNumber2),
            LuckyNumber.fromContainer(displayList.luckyNumber3),
        ];
    }

    function promptIdle() {
        // Check if there are any remaining unrevealed cards
        const unrevealed = cards.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        // Pick one at random to animate
        unrevealed[Math.floor(unrevealed.length * Math.random())].prompt();

        // Restart the idle timer tween
        idleTween.duration(randomIdleDuration());
        idleTween.play(0);
    }

    function populate(data) {
        numbers = data;
    }

    function enable() {
        // Start the idle timer tween
        idleTween.play(0);

        // Return an array of promises for each card's lifecycle
        return cards.map(async card => {
            // Enable the card and wait for it to be revealed (manually or automatically)
            await card.enable();
            // Restart the idle timer tween
            idleTween.play(0);
            // Play the Player Number reveal audio
            audio.playSequential('winningNumber');
            // Get the next Winning Number
            const nextData = numbers.luckyNumbers.shift();

            if(numbers.numbers.length === 0 && numbers.luckyNumbers.length === 0) {
                msgBus.publish('UI.updateButtons', {
                    autoPlay: false,
                    help: { enabled: false },
                });
            }

            // Populate the card with the next Player Number, ready to be uncovered
            card.populate(nextData);
            // Wait for the uncover animation (if animated)
            await card.uncover();

            // If the revealed number matches a revealed Winning Number then mark the match
            msgBus.publish('Game.WinningNumber',nextData);
            msgBus.publish('Game.WinningNumberData',card);

            if (numberState.player.map(e=>{ return e.num; }).includes(nextData)) {
                card.match();
                audio.playSequential('match');
                if(!card.matchTween) {
                    await card.presentWin();
                }
            }
        });
    }

    function revealAll() {
        // Stop the idle timer tween
        idleTween.pause(0);
        // Get all the cards yet to be revealed
        const unrevealed = cards.filter(number => !number.revealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map(number => Tween.delayedCall(0, number.reveal, null, number));
    }

    function reset() {
        cards.forEach(number => number.reset());
    }

    async function checkMatch(playerNumber) {
        const matchedCard = cards.find(card => card.number === playerNumber.num);
        if (matchedCard) {
            matchedCard.match();
            if(!matchedCard.matchTween) {
                await matchedCard.presentWin();
            }
        }
    }

    msgBus.subscribe('Game.PlayerNumber',checkMatch);

    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
        _cards : ()=>{return cards;},
    };
});
