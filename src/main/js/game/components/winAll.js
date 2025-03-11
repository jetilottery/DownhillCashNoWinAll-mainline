define((require) => {
    const PIXI = require('com/pixijs/pixi');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const PlayerNumber = require('game/components/playerNumbers');
    const autoPlay = require('game/revealAll');
    const LuckyNumber = require('game/components/luckyNumbers');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenMax;

    let countingTween;

    let _complete = Promise.resolve();

    let total = 0;
    let winAllBar;

    let winAllCoverAnim = undefined;



    function show(val) {
        return new Promise(resolve => {

            let amount = val ? 1 : 0;

            winAllBar.visible = true;

            Tween.to(winAllBar.scale, gameConfig.winAllDisplayDuration, {
                x: amount,
                y: amount,
                ease: window.Elastic.easeOut.config(
                    gameConfig.WinAllAnimAmplitude,
                    gameConfig.WinAllAnimPeriod
                ),
                onComplete: resolve
            });

        });
    }

    function reset() {
        total = 0;
        countingTween = undefined;
        winAllBar = displayList.winAllBar;
        winAllBar.scale.set(0);
        winAllBar.alpha = 1;
        winAllBar.visible = false;
        displayList.winAllValue.text = SKBeInstant.formatCurrency(total).formattedAmount;
    }

    function evaluate(winAllSprite) {
        _complete = new Promise(async resolve => {

            PlayerNumber._cards().forEach(e => {
                e.interactive = false;
            });
            LuckyNumber._cards().forEach(e => {
                e.interactive = false;
            });


            let value = winAllSprite.parent.parent.value;

            msgBus.publish('Game.AutoPlayStop');
            msgBus.publish('UI.updateButtons', {
                autoPlay: {enabled: false},
                help: {enabled: false}
            });

            let a;

            let unrevaled = PlayerNumber._cards().concat(LuckyNumber._cards()).filter(e => {
                if (e.winAll === undefined || e.winAll.visible === false) {
                    return !e.revealed && !e.revealing;
                }
            });

            unrevaled.forEach(e => {
                Tween.to(e, 0.5, {
                    alpha: 0.5
                });
            });


            displayList.winAllValue.alpha = 0;
            displayList.winAllValue.text = SKBeInstant.formatCurrency(value).formattedAmount;

            if (winAllCoverAnim === undefined) {
                winAllCoverAnim = new PIXI.extras.AnimatedSprite(utils.findFrameSequence('winAllSymbol').map(PIXI.Texture.from));
                winAllCoverAnim.anchor.set(0.5);
                winAllCoverAnim.position.set(0, -50);
                winAllCoverAnim.loop = true;

                winAllCoverAnim.animationSpeed = 0.5;

                displayList.winAllBar.addChild(winAllCoverAnim);
            } else {
                winAllCoverAnim.loop = true;
            }

            winAllSprite.onComplete = () => {
                a = autoPlay.start();

                a.eventCallback("onComplete", async () => {


                    function checkAnimationsEnd() {
                        let parsedNumbers = PlayerNumber._cards().map((e) => {
                            return (e.revealed && !e.revealing);
                        });

                        if (parsedNumbers.length === PlayerNumber._cards().length) {
                            continueSequence();
                        } else {
                            Tween.delayedCall(checkAnimationsEnd, 0.5);
                        }
                    }

                    checkAnimationsEnd();

                    function continueSequence() {
                        Tween.delayedCall(gameConfig.winAllWait, async () => {
                            PlayerNumber._cards().map(async (e, i, arr) => {
                                e.interactive = false;
                                Tween.delayedCall(gameConfig.winAllTransformDelay * i, () => {
                                    if (!e.matched) {
                                        e.match();
                                        e.winAllBonunceEffect();
                                        audio.play('bonus');
                                        e.alpha = 1;
                                    }
                                    if (i === arr.length - 1) {
                                        Tween.delayedCall(gameConfig.winAllResolveDelay, async () => {
                                            await show(true);
                                            updateTotal(resolve, value);
                                            displayList.playerNumbers.interactiveChildren = true;
                                            displayList.luckyNumbers.interactiveChildren = true;
                                        });
                                    }
                                });
                            });
                        });
                    }
                });
            };

            winAllSprite.gotoAndPlay(0);
        });
    }

    function updateTotal(e, v) {
        total = meterData.totalWin;
        runTween(e, v);
    }

    function runTween(resolve, startval) {
        let val = startval;
        let tweenComplete = false;
        winAllCoverAnim.gotoAndPlay(0);

        winAllCoverAnim.onLoop = () => {
            if (tweenComplete) {
                winAllCoverAnim.gotoAndStop(0);
                Tween.delayedCall((gameConfig.delaybeforeWinAllEnd + gameConfig.delaybeforeWinAllDissmiss), resolve);
            }
        };

        audio.play('rollup', true);
        countingTween = new Tween({value: val}, 5, {
            value: total,
            onStart: function () {
                Tween.to(displayList.winAllValue, 0.3, {
                    alpha: 1
                });
            },
            onUpdate: function () {
                displayList.winAllValue.text = SKBeInstant.formatCurrency(this.target.value).formattedAmount;
                meterData.win = SKBeInstant.formatCurrency(this.target.value).formattedAmount;
            },
            onComplete: () => {
                Tween.to(displayList.winAllValue.scale, 0.1, {
                    x: 1.5,
                    y: 1.5,
                    onComplete: () => {
                        Tween.to(displayList.winAllValue.scale, 0.1, {
                            x: 1,
                            y: 1,
                            onComplete: () => {
                                Tween.to(displayList.winAllBar.scale, 1, {
                                    x: 0,
                                    y: 0,
                                    delay: (gameConfig.delaybeforeWinAllEnd / 2),
                                    ease: window.Elastic.easeIn.config(
                                        1,
                                        1
                                    ),
                                });
                                Tween.to(displayList.winAllBar, 1, {
                                    delay: gameConfig.delaybeforeWinAllEnd,
                                    alpha: 0
                                });
                                meterData.win = total;
                                audio.stop('rollup');
                                audio.play('rollupTerminator');
                                tweenComplete = true;
                            }
                        });
                    }
                });
            }
        });

        countingTween.play();
    }

    msgBus.subscribe('Game.WinAll', evaluate);

    return {
        reset,
        get complete() {
            return _complete;
        }
    };

});