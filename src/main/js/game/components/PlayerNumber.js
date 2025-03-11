define(require => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenMax;

    const NumberCard = require('./NumberCard');

    class PlayerNumber extends NumberCard {
        constructor() {
            super();

            // Set background and cover textures
            if (PIXI.utils.TextureCache.symbolBackground !== undefined) {
                this.background.texture = PIXI.Texture.fromFrame('yourNumberValueBackground');
            }
            const revealFrames = utils.findFrameSequence('yourNumberCover');
            this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
            const idleFrames = utils.findFrameSequence('yourNumbersSymbolIdle');
            if (idleFrames.length > 0) {
                this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
            }

            this.winAll = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            const winAllFrames = utils.findFrameSequence('winAllCoverAnim');
            this.winAll.textures = winAllFrames.map(PIXI.Texture.from);

            this.winAllBounce = undefined;

            this.winAll.visible = false;
            this.winAll.anchor.set(0.5);
            this.winAll.loop = 0;
            this.winAll.animationSpeed = 0.5;
            this.resultContainer.addChild(this.winAll);

            this.win.scale.set(0.8);
            this.noWin.scale.set(0.8);
            this.winAll.scale.set(0.8);

            this.noWin.y = -20;
            this.win.y = -20;
            this.winAll.y = -20;

            this.winAmount = new fittedText("");
            this.winAmount.maxWidth = 150;
            this.winAmount.anchor.set(0.5);
            this.winAmount.y = 50;

            text.update(this.winAmount, textStyles.cardValue);

            this.resultContainer.addChild(this.winAmount);


            this.reset();
        }

        populate(number) {
            this.value = number.val;
            if (number.num !== 'Z') {
                super.populate(number.num);
                this.number = number.num;
            } else {
                this.winAll.visible = true;
                audio.play('winAll');
                msgBus.publish('Game.WinAll', this.winAll);
            }
            this.winAmount.text = SKBeInstant.formatCurrency(this.value).formattedAmount;
        }

        winAllBonunceEffect() {
            let _this = this;
            this.winAllBounce = Tween.to(_this.resultContainer.scale,0.2,{
                x:1.2,
                y:1.2,
                onComplete:()=>{
                    Tween.to(_this.resultContainer.scale,0.2,{
                        x:1,
                        y:1
                    });
                }
            });
        }

        reset() {
            super.reset();
            this.matched = false;
            this.winAll.visible = false;
            this.winAllBounce = undefined;
            text.update(this.winAmount, textStyles.cardValue);
        }

        match() {
            super.match();
            this.matched = true;
            text.update(this.winAmount, textStyles.cardValueWin);
        }

        static fromContainer(container) {
            const card = new PlayerNumber();
            container.addChild(card);
            return card;
        }
    }

    return PlayerNumber;
});
