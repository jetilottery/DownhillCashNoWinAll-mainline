define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    require('com/gsap/plugins/PixiPlugin');

    require('com/gsap/TimelineMax');
    require('com/gsap/easing/EasePack');
    const Timeline = window.TimelineMax;

    const FADE_DURATION = 0.5;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.5;

    let outValue = 0;

    function setWinUpTo() {
        const inValue = prizeData.prizeStructure[0];
        const inFormatted = SKBeInstant.formatCurrency(inValue).formattedAmount;
        const inString = resources.i18n.Game.winUpTo.replace('{0}', inFormatted);

        const outFormatted = SKBeInstant.formatCurrency(outValue).formattedAmount;
        const outString = resources.i18n.Game.winUpTo.replace('{0}', outFormatted);

        displayList.winUpToInText.text = inString;
        displayList.winUpToOutText.text = outString;

        // displayList.messageBarElementContainer.x = (displayList.messageBarElementContainer.parent.texture.width / 2);

        // If outValue is 0 winUpTo is not yet set, so display the in value and skip the timeline
        if (outValue === 0 || outValue === inValue) {
            outValue = inValue;
            displayList.winUpToOut.alpha = 0;
            return;
        }

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;

        // update outValue for next time
        outValue = inValue;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: {scaleX: inScale, scaleY: inScale},
                alpha: 0,
            },
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            {
                pixi: {scaleX: outScale, scaleY: outScale},
                alpha: 0,
            },
            0
        );
    }


    msgBus.subscribe('PrizeData.PrizeStructure', setWinUpTo);

    return {
        reset: setWinUpTo,
    };
});
