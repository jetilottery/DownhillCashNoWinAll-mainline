define(require => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');

    const NumberCard = require('./NumberCard');

    class LuckyNumber extends NumberCard {
        constructor() {
            super();

            // Set background and cover textures
            if (PIXI.utils.TextureCache.symbolBackground !== undefined) {
                this.background.texture = PIXI.Texture.fromFrame('luckyNumberBackground');
            }
            const revealFrames = utils.findFrameSequence('luckyNumberCover');
            this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
            const idleFrames = utils.findFrameSequence('luckyNumbersSymbolIdle');
            if (idleFrames.length > 0) {
                this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
            }

            this.reset();
        }

        populate(number) {
            this.number = number;
            super.populate(number);
        }

        reset() {
            super.reset();
        }

        static fromContainer(container) {
            const card = new LuckyNumber();
            container.addChild(card);
            return card;
        }
    }

    return LuckyNumber;
});
