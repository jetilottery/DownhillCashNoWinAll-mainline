define({
    _BASE_APP: {
        children: ['background', 'logo', 'winUpTo', 'playerNumbers', 'luckyNumbers',/*'messageBar',*/'winAllContainer'],
    },

    /*
     * BACKGROUND
     */
    background: {
        type: 'sprite',
        children: ['selectionBackgrounds'],
        landscape: {
            texture: 'landscape_background',
        },
        portrait: {
            texture: 'portrait_background',
        },
    },

    selectionBackgrounds: {
        children: ['yourNumbersLabel', 'luckyNumbersLabel'],
        type: 'sprite',
        landscape: {
            texture: 'selectionBackgrounds',
        },
        portrait: {
            texture: 'selectionBackgroundsPortrait',
        },
    },

    // messageBar: {
    //     type: 'sprite',
    //     texture:'landscape_messageBar',

    //     landscape: {
    //         x: 1020,
    //         y: 610,
    //     },
    //     portrait: {
    //         x:405,
    //         y:997
    //     },
    //     anchor:0.5
    // },


    yourNumbersLabel: {
        landscape: {
            x: 1029,
            y: 108,
        },
        portrait: {
            x: 405,
            y: 513,
        },
        type: 'text',
        style: 'yourNumbersLabel',
        string: 'yourNumbers',
        anchor: 0.5,
        maxWidth: 400,
    },
    luckyNumbersLabel: {
        landscape: {
            x: 339,
            y: 417,
        },
        portrait: {
            x: 405,
            y: 293,
        },
        type: 'text',
        style: 'luckyNumbersLabel',
        string: 'luckyNumbers',
        anchor: 0.5,
        maxWidth: 400,
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_gameLogo',
            x: 326,
            y: 187,

        },
        portrait: {
            texture: 'portrait_gameLogo',
            x: 405,
            y: 102,
        },
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {x: 340, y: 344},
        portrait: {x: 405, y: 227},
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText'],
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText'],
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
    },

    winAllContainer: {
        type: 'container',
        children: ['winAllBar'],
        landscape: {x: 720, y: 355},
        portrait: {x: 405, y: 590},
        anchor: 0.5,
    },

    winAllBar: {
        type: 'sprite',
        texture: 'winAllOverlay',
        children: ['winAllValue'],
        anchor: 0.5
    },
    winAllValue: {
        type: 'text',
        style: 'winAllValue',
        wordWrap: false,
        anchor: 0.5,
        maxWidth: 400,
        align: 'center',
        y: 130
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: [
            'playerNumber1',
            'playerNumber2',
            'playerNumber3',
            'playerNumber4',
            'playerNumber5',
            'playerNumber6',
            'playerNumber7',
            'playerNumber8',
            'playerNumber9',
            'playerNumber10',
            'playerNumber11',
            'playerNumber12',
        ],
        landscape: {x: 772, y: 208},
        portrait: {x: 164, y: 608},
    },
    playerNumber1: {
        type: 'container',
        landscape: {
            x: 0, y: 0
        },
        portrait: {
            x: 0, y: 0, scale: 0.95
        },
    },
    playerNumber2: {
        type: 'container',
        landscape: {
            x: 170, y: 0
        },
        portrait: {
            x: 161, y: 0,scale: 0.95
        },
    },
    playerNumber3: {
        type: 'container',
        landscape: {
            x: 340, y: 0
        },
        portrait: {
            x: 321, y: 0,scale: 0.95
        },
    },
    playerNumber4: {
        type: 'container',
        landscape: {
            x: 510, y: 0
        },
        portrait: {
            x: 483, y: 0, scale: 0.95
        },
    },
    playerNumber5: {
        type: 'container',
        landscape: {
            x: 0, y: 152
        },
        portrait: {
            x: 0, y: 144, scale: 0.95
        },
    },
    playerNumber6: {
        type: 'container',
        landscape: {
            x: 170, y: 152
        },
        portrait: {
            x: 161, y: 144, scale: 0.95
        },
    },
    playerNumber7: {
        type: 'container',
        landscape: {
            x: 340, y: 152
        },
        portrait: {
            x: 321, y: 144, scale: 0.95
        },
    },
    playerNumber8: {
        type: 'container',
        landscape: {
            x: 510, y: 152
        },
        portrait: {
            x: 483, y: 144, scale: 0.95
        },
    },
    playerNumber9: {
        type: 'container',
        landscape: {
            x: 0, y: 304
        },
        portrait: {
            x: 0, y: 288, scale: 0.95
        },
    },
    playerNumber10: {
        type: 'container',
        landscape: {
            x: 170, y: 304
        },
        portrait: {
            x: 161, y: 288, scale: 0.95
        },
    },
    playerNumber11: {
        type: 'container',
        landscape: {
            x: 340, y: 304
        },
        portrait: {
            x: 321, y: 288, scale: 0.95
        },
    },
    playerNumber12: {
        type: 'container',
        landscape: {
            x: 510, y: 304
        },
        portrait: {
            x: 483, y: 288, scale: 0.95
        },
    },


    /*
     * Lucky Numbers
     */

    luckyNumbers: {
        type: 'container',
        children: [
            'luckyNumber1',
            'luckyNumber2',
            'luckyNumber3'
        ],
        landscape: {x: 158, y: 518},
        portrait: {x: 244, y: 388},
    },

    luckyNumber1: {
        type: 'container',
        landscape: {x: 0, y: 0, scale: 1},
        portrait: {x: 0, y: 0, scale: 0.95},
    },
    luckyNumber2: {
        type: 'container',
        landscape: {x: 170, y: 0, scale: 1},
        portrait: {x: 162, y: 0, scale: 0.95},
    },
    luckyNumber3: {
        type: 'container',
        landscape: {x: 340, y: 0, scale: 1},
        portrait: {x: 323, y: 0, scale: 0.95},
    },

    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1'],
    },
    howToPlayPage1: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {x: 720, y: 415, wordWrapWidth: 1100},
        portrait: {x: 405, y: 550, wordWrapWidth: 560},
    },
});
