define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenLite;

    const winFrameName = 'numberWin';
    const noWinFrameName = 'numberNoWin';

    class NumberCard extends Pressable {
        constructor() {
            super();

            this.WIDTH = 154;
            this.HEIGHT = 154;

            // Create all the empty sprites
            this.background = new PIXI.Sprite();
            this.win = new PIXI.Sprite();
            this.noWin = new PIXI.Sprite();
            this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.revealAnim.loop = false;
            this.revealAnim.visible = false;
            this.idleAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.idleAnim.loop = false;
            this.idleAnim.animationSpeed = 0.5;
            this.idleAnim.visible = false;

            this.idleAnim.onComplete = () => {
                this.idleAnim.visible = false;
                this.revealAnim.visible = true;
            };

            // Center everything
            this.background.anchor.set(0.5);
            this.win.anchor.set(0.5);
            this.noWin.anchor.set(0.5);
            this.revealAnim.anchor.set(0.5);
            this.idleAnim.anchor.set(0.5);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild(this.win, this.noWin);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.addChild(this.background, this.resultContainer, this.revealAnim, this.idleAnim);

            if(gameConfig.backgroundFade !== undefined) {
                this.background.alpha = 0;
            }

            // State
            this.revealed = false;
            this.revealing = false;
            this.matchTween = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            });
        }

        populate(number) {
            this.number = number;
            var noWintextureName = noWinFrameName + number;
            var wintextureName = winFrameName + number;

            this.noWin.texture = PIXI.Texture.fromFrame(noWintextureName);
            this.win.texture = PIXI.Texture.fromFrame(wintextureName);

            this.noWin.visible = true;
        }

        prompt() {
            if (!this.revealed && this.idleAnim.textures.length > 1) {
                this.revealAnim.visible = false;
                this.idleAnim.visible = true;
                this.idleAnim.gotoAndPlay(0);
            }
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        reset() {
            this.noWin.texture = PIXI.Texture.EMPTY;
            this.win.texture = PIXI.Texture.EMPTY;
            this.enabled = false;
            this.revealAnim.gotoAndStop(0);
            this.revealAnim.visible = true;
            this.noWin.visible = false;
            this.win.visible = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.matched = false;
            this.number = undefined;
            this.matchTween = false;
            this.alpha = 1;

            if(gameConfig.backgroundFade !== undefined) {
                this.background.alpha = 0;
            }
        }

        async uncover() {
            if (this.revealAnim.textures && this.revealAnim.textures.length > 1) {
                await new Promise(resolve => {

                    this.interactive = false;
                    this.revealing = true;
                    // bring to front in case the animation overlaps neighboring cards
                    this.revealAnim.parent.parent.setChildIndex(
                        this.revealAnim.parent,
                        this.revealAnim.parent.parent.children.length - 1
                    );

                    if(gameConfig.backgroundFade !== undefined) {
                        Tween.to(this.background,gameConfig.backgroundFade,{
                            alpha:1
                        });
                    }

                    // Calculate the animation's duration in seconds
                    const duration = this.revealAnim.textures.length / this.revealAnim.animationSpeed / 60;
                    const halfDuration = duration / 2;
                    // Tween in the results over the 2nd half of the animation
                    this.resultContainer.visible = true;
                    Tween.fromTo(
                        this.resultContainer,
                        halfDuration,
                        {alpha: 0},
                        {
                            alpha: 1,
                            delay: halfDuration,
                        }
                    );

                    // Wait for the animation to complete before resolving
                    this.revealAnim.onComplete = () => {
                        this.revealAnim.visible = false;
                        this.revealing = false;
                        this.revealed = true;
                        resolve();
                    };

                    // Disable interactivity to prevent re-reveal, then switch to the animation
                    this.enabled = false;
                    this.revealAnim.gotoAndPlay(0);
                });
            } else {
                // Otherwise just a swap from the cover to the resultsContainer
                this.resultContainer.visible = true;
                this.revealAnim.visible = false;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            }
        }

        match() {
            this.noWin.visible = false;
            this.win.visible = true;
            this.matched = true;
        }

        presentWin() {

            let _this = this;
            // let duration = 0.75;
            // let halfDuration = 0;
            // if (this.revealAnim.textures && this.revealAnim.textures.length > 1) {
            //     duration = this.revealAnim.textures.length / this.revealAnim.animationSpeed / 60;
            //     halfDuration = duration / 2;
            //
            return new Promise(resolve => {
                _this.matchTween = true;
                Tween.fromTo(this.resultContainer.scale,
                    0.75,
                    {
                        x: 0.666,
                        y: 0.666,
                    },
                    {
                        x: 1,
                        y: 1,
                        ease: window.Elastic.easeOut.config(
                            gameConfig.matchAnimAmplitude,
                            gameConfig.matchAnimPeriod
                        ),
                        onComplete: ()=>{
                            _this.matchTween = false;
                            resolve();
                        },
                    }
                );
            });

        }
    }

    return NumberCard;
});
