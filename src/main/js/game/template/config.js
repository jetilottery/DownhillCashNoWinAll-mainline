define({
    /*
     * Game configuration options
     * Anything defined here could be overwritten either based on the channel in
     * assetPacks/CHANNEL/layout/gameConfig.js or at an operator level by gameConfig.json in i18n
     */

    // The scale and bounciness of the number match tween
    matchAnimAmplitude: 1.5,
    matchAnimPeriod: 0.5,

    // The scale and bounciness of the number match tween
    WinAllAnimAmplitude: 2,
    WinAllAnimPeriod: 0.75,

    // Should the HowToPlay screen show when the game loads
    showHowToPlayOnLoad: false,
    // Use AutoPlay with toggle start/stop rather than single use RevealAll
    toggleAutoPlay: false,
    // Time between each number being revealed in autoplay. 0 for instant reaveal.
    autoPlayWinningNumberInterval: 0,
    autoPlayPlayerNumberInterval: 0.3,
    // Time between the revealing the winning numbers section and the player numbers section
    autoPlayPlayerNumberDelay: 1,
    // Time between idle animations
    playerNumberIdleInterval: 3,
    winningNumberIdleInterval: 5,
    // Actual idle times will be random, +/- this value
    idleIntervalVariation: 0.25,
    // Time over which the music will fade out on entering the result screen
    resultMusicFadeOutDuration: 0,
    // Time between entering the result screen and the terminator audio starting
    resultTerminatorFadeInDelay: 0,
    // Time over which the terminator audio will fade in
    resultTerminatorFadeInDuration: 0.5,

    winAllDisplayDuration: 1,

    winAllTransformDelay: 0.2,

    winAllResolveDelay: 1,

    delaybeforeWinAllDissmiss: 1,

    winAllWait: 1,

    delaybeforeWinAllEnd: 2,

    // Should the Result screen show when ticket is complete
    showResultScreen: true
});
