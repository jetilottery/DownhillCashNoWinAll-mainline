define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['BackgroundMusicLoop', 0],
    winTerminator: ['GameEnd_Win', 1],
    loseTerminator: ['GameEnd_NoWin', 1],
    click: ['UI_Click', 4],
    costDown: ['BetDown_Btn', 1],
    costUp: ['BetUp_Btn', 2],
    costMax: ['BetMax_Btn', 3],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    playerNumber: ['YourNumberSelect_1', 4],
    playerNumber_2: ['YourNumberSelect_2', 5],
    playerNumber_3: ['YourNumberSelect_3', 6],
    winningNumber: ['LuckyNumberSelect_1', 4],
    winningNumber_2: ['LuckyNumberSelect_2', 5],
    winningNumber_3: ['LuckyNumberSelect_3', 6],
    match_1: ['Match_1', 1],
    match_2: ['Match_2', 2],
    match_3: ['Match_3', 3],

    bonus: ['InstantWin', 3],
    winAll: ['InstantWin',3],

    rollup:['IW_RollupLoop',2],
    rollupTerminator:['IW_RollupTerm',6],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

     buy: ['Buy_Btn', 4],
     revealAll: ['RevealAll_Btn', 4],
});
