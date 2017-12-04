;(function() {

    var stateMain = {

        preload: function() {

        }

        , create: function() {

            logic.onPointIncome.add(this.onPointIncome, this);
            logic.onPointSeized.add(this.onPointSeized, this);
            logic.onEvent.add(this.onEvent, this);
            logic.onGameWon.add(this.onGameWon, this);
            logic.onGameLoss.add(this.onGameLoss, this);


            this.background = game.add.sprite(0, 0, "city");
            this.background.inputEnabled = true;
            this.background.events.onInputDown.add(this.onMapClick, this);

            this.signsNeutral = game.add.sprite(0, 0, "city_signs");
            this.signsNeutral.mask = game.add.graphics(0, 0);

            this.signsPlayer = game.add.sprite(0, 0, "city_signs_green");
            this.signsPlayer.mask = game.add.graphics(0, 0);

            this.signsAI = game.add.sprite(0, 0, "city_signs_red");
            this.signsAI.mask = game.add.graphics(0, 0);

            this.scoreText = game.add.text(game.world.width - 20, 20, "0$", this.style_hudText);
            this.scoreText.anchor.set(1.0, 0);

            this.timeText = game.add.text(game.world.width - 20, 50, "Day: 0", this.style_hudText);
            this.timeText.anchor.set(1.0, 0);


            //define sounds here
            this.soundClick = game.add.audio("click");
            this.backgroundMusic = game.add.audio("backgroundMusic");
            this.backgroundMusic.volume = .05;
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();


            /*
            //add some buttons
            this.btnYes = gameButtons.addButton("yes", -1, -1, this.sayYes, this);
            this.btnNo = gameButtons.addButton("no", -1, this.btnYes.y - this.btnYes.height, this.sayNo, this);

            //add sound buttons
            this.btnMusic = gameButtons.addAudioButton("music", 20, 20, gameButtons.toggleMusic, this);
            this.btnSound = gameButtons.addAudioButton("sound", 20, 70, gameButtons.toggleSound, this);

            //if using a scrolling game uncomment these lines
            //this.audioGroup=game.add.group();
            //this.audioGroup.fixedToCamera=true;

            //define sounds here
            this.elephant = game.add.audio("elephant");

            //define background music
            this.backgroundMusic = game.add.audio("backgroundMusic");
            //pass the background music to the gameMedia object
            gameMedia.setBackgroundMusic(this.backgroundMusic);

            //init the music
            gameMedia.updateMusic();
            //init the sound buttons
            gameButtons.updateButtons();
            */

            this.showIntro();
        }

        , restartGame: function() {
            logic.init();
            this.generateSignMask(this.signsNeutral.mask, -1);
            this.generateSignMask(this.signsPlayer.mask, 0);
            this.generateSignMask(this.signsAI.mask, 1);

            this.nextUpdate = game.time.now + window.static.timestep;
            this.maxIncome = 0;

            this.renderUpdate();
        }

        , generateSignMask: function(mask, ownership) {
            var ofs = window.static.pointRadius;
            mask.clear();
            mask.beginFill(0xffffff);
            mask.drawRect(0, 0, 1, 1);
            _.each(logic.points, function(item) {
                if (item.ownership == ownership)
                    mask.drawRect(item.x - ofs, item.y - ofs, ofs*2, ofs*2);
            });
            mask.endFill();
        }

        , update: function() {
            // while modal is open, pause updates
            if (this._modal) {
                return;
            }
            // update
            if (this.nextUpdate <= game.time.now) {
                logic.update();
                if (this.maxIncome < logic.players[0].money)
                    this.maxIncome = logic.players[0].money;

                this.renderUpdate();
                this.nextUpdate = game.time.now + window.static.timestep;
            }
        }

        , renderUpdate: function() {
            this.scoreText.setText(logic.players[0].money + "$");
            this.timeText.setText("Day: " + logic.tickNo);
        }

        , closeModal: function() {
            if (this._modal) {
                this._modal.destroy();
                this._modal = null;
                this.soundClick.play();
            }
            if (this.overlay) {
                this.overlay.destroy();
                this.overlay = null;
            }
        }

        , style_titleText:    { font: "56px Georgia", fill: "#3b3232", align: "left" }
        , style_normalText:   { font: "24px Georgia", fill: "#3b3232", align: "left" }
        , style_introText:    { font: "24px Georgia", fill: "#3b3232", align: "center" }
        , style_buttonText:   { font: "56px Barlow Condensed", fill: "#ede7db", align: "center" }
        , style_buttonDisText:{ font: "56px Barlow Condensed", fill: "#857f79", align: "center" }
        , style_buttonGreenText:{ font: "56px Barlow Condensed", fill: "#86d500", align: "center" }
        , style_hudText:      { font: "24px Georgia", fill: "#ede7db", align: "right" }

        , showIntro: function() {
            this.closeModal();

            this.overlay = game.add.sprite(0, 0, "overlay");
            this.overlay.scale.set(25.0);

            var width = 927, height = 603;
            var dialog = game.add.group();
            dialog.x = game.world.width / 2 - width / 2;
            dialog.y = game.world.height / 2 - height / 2;

            var back = game.add.sprite(0, 0, "modal");
            back.width = width;
            back.height = height;
            dialog.add(back);

            var building = game.add.sprite(50, 50, "ic_building");
            building.scale.set(2.0);
            building.frame = 49; // title sprite
            dialog.add(building);

            var icon = game.add.sprite(600, 0, "game_logo");
            icon.anchor.set(0.5, 0.35);
            dialog.add(icon);

            var text = game.add.text(600, 250, window.static.S.intro, this.style_introText);
            text.anchor.set(0.5, 0.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            var gleft = game.add.sprite(-70, height / 2, "modal_guys_left");
            gleft.anchor.set(0.15, 0.25);
            dialog.add(gleft);

            var gright = game.add.sprite(width, height / 2, "modal_guys_right");
            gright.anchor.set(0.55, 0.5);
            dialog.add(gright);

            var posx = 480, posy = height - 46;
            var button = game.add.sprite(posx, posy, "button_play");
            button.anchor.set(0, 1.0);
            button.inputEnabled = true;
            button.events.onInputDown.add(function () {
                this.restartGame();
                this.closeModal();
            }, this);
            dialog.add(button);

            var btntext = game.add.text(posx + button.width / 2, posy -  button.height / 2, window.static.S.playButton, this.style_buttonGreenText);
            btntext.anchor.set(0.5, 0.5);
            btntext.wordWrap = true;
            btntext.wordWrapWidth = 200 * .9;
            dialog.add(btntext);
            button.events.onInputOver.add(function () { btntext.scale.set(1.1); }, this);
            button.events.onInputOut.add(function () { btntext.scale.set(1.0); }, this);


            this._modal = dialog;
        }

        , showWin: function() {
            this.closeModal();

            this.overlay = game.add.sprite(0, 0, "overlay");
            this.overlay.scale.set(25.0);

            var width = 927, height = 603;
            var dialog = game.add.group();
            dialog.x = game.world.width / 2 - width / 2;
            dialog.y = game.world.height / 2 - height / 2;

            var back = game.add.sprite(0, 0, "modal");
            back.width = width;
            back.height = height;
            dialog.add(back);

            var building = game.add.sprite(50, 50, "ic_building");
            building.scale.set(2.0);
            building.frame = 49; // title sprite
            dialog.add(building);

            var icon = game.add.sprite(600, 0, "game_logo");
            icon.anchor.set(0.5, 0.35);
            dialog.add(icon);

            var gleft = game.add.sprite(-70, height / 2, "modal_your_place");
            gleft.anchor.set(0.15, 0.25);
            dialog.add(gleft);

            var text = game.add.text(600, 250, window.static.S.win, this.style_titleText);
            text.anchor.set(0.5, 0.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(600, 350, window.static.S.winText, this.style_introText);
            text.anchor.set(0.5, 0.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            var posx = 480, posy = height - 46;
            var button = game.add.sprite(posx, posy, "button_play");
            button.anchor.set(0, 1.0);
            button.inputEnabled = true;
            button.events.onInputDown.add(function () {
                this.restartGame();
                this.closeModal();
            }, this);
            dialog.add(button);

            var btntext = game.add.text(posx + button.width / 2, posy -  button.height / 2, window.static.S.playButton, this.style_buttonGreenText);
            btntext.anchor.set(0.5, 0.5);
            btntext.wordWrap = true;
            btntext.wordWrapWidth = 200 * .9;
            dialog.add(btntext);
            button.events.onInputOver.add(function () { btntext.scale.set(1.1); }, this);
            button.events.onInputOut.add(function () { btntext.scale.set(1.0); }, this);


            this._modal = dialog;
        }

        , showLoss: function() {
            this.closeModal();

            this.overlay = game.add.sprite(0, 0, "overlay");
            this.overlay.scale.set(25.0);

            var width = 927, height = 603;
            var dialog = game.add.group();
            dialog.x = game.world.width / 2 - width / 2;
            dialog.y = game.world.height / 2 - height / 2;

            var back = game.add.sprite(0, 0, "modal");
            back.width = width;
            back.height = height;
            dialog.add(back);

            var building = game.add.sprite(50, 50, "game_loss_photo");
            dialog.add(building);

            var icon = game.add.sprite(100, 0, "game_loss");
            icon.anchor.set(0.5, 0.35);
            dialog.add(icon);

            var text = game.add.text(600, 50, window.static.S.loss, this.style_titleText);
            text.anchor.set(0.5, 0.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(600, 250, window.static.S.lossText, this.style_introText);
            text.anchor.set(0.5, 0.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(400, 350, window.static.S.maxIncomeLabel, this.style_introText);
            text.anchor.set(0.0, 1.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(600, 350, this.maxIncome+"$", this.style_titleText);
            text.anchor.set(0.0, 0.85);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);


            var posx = 500, posy = height - 46;
            var button = game.add.sprite(posx, posy, "button_play");
            button.anchor.set(0, 1.0);
            button.inputEnabled = true;
            button.events.onInputDown.add(function () {
                this.restartGame();
                this.closeModal();
            }, this);
            dialog.add(button);

            var btntext = game.add.text(posx + button.width / 2, posy -  button.height / 2, window.static.S.playButton, this.style_buttonGreenText);
            btntext.anchor.set(0.5, 0.5);
            btntext.wordWrap = true;
            btntext.wordWrapWidth = 200 * .9;
            dialog.add(btntext);
            button.events.onInputOver.add(function () { btntext.scale.set(1.1); }, this);
            button.events.onInputOut.add(function () { btntext.scale.set(1.0); }, this);

            this._modal = dialog;
        }

        , showPointInfo: function(point) {
            this.closeModal();

            this.overlay = game.add.sprite(0, 0, "overlay");
            this.overlay.scale.set(25.0);

            var width = 927, height = 603;
            var dialog = game.add.group();
            dialog.x = game.world.width / 2 - width / 2;
            dialog.y = game.world.height / 2 - height / 2;

            var back = game.add.sprite(0, 0, "modal");
            back.width = width;
            back.height = height;
            dialog.add(back);

            var close = game.add.sprite(width - 65, 65, "button_close");
            close.anchor.set(0.5, 0.5);
            close.inputEnabled = true;
            close.events.onInputDown.add(this.closeModal, this);
            close.events.onInputOver.add(function () { close.scale.set(1.1); }, this);
            close.events.onInputOut.add(function () { close.scale.set(1.0); }, this);
            dialog.add(close);

            var building = game.add.sprite(25, 50, "ic_building");
            building.scale.set(2.0);
            building.frame = point.building;
            dialog.add(building);

            var icon = game.add.sprite(100, 0, "ic_building_type");
            icon.anchor.set(0.0, 0.35);
            icon.frame = point.kind;
            dialog.add(icon);

            var text = game.add.text(350, 100, point.title, this.style_titleText);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            var ownerText = window.static.S.pointNeutral;
            if (point.isPlayer())
                ownerText = window.static.S.pointPlayer;
            else if (point.isAI())
                ownerText = sprintf(window.static.S.pointAI, point.owner.title);
            text = game.add.text(350, 200, ownerText, this.style_normalText);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(350, 350, window.static.S.incomeLabel, this.style_normalText);
            text.anchor.set(0.0, 1.0);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            text = game.add.text(450, 350, point.income+"$", this.style_titleText);
            text.anchor.set(0.0, 0.85);
            text.wordWrap = true;
            text.wordWrapWidth = 500 * .9;
            dialog.add(text);

            if (point.isNeutral()) {
                text = game.add.text(350, 400, sprintf(window.static.S.influenceNeeded, point.influence), this.style_normalText);
                text.anchor.set(0.0, 1.0);
                text.wordWrap = true;
                text.wordWrapWidth = 500 * .9;
                dialog.add(text);

                var gleft = game.add.sprite(-70, height / 2, "modal_guys_left");
                gleft.anchor.set(0.15, 0.25);
                dialog.add(gleft);
            }
            else if (point.isAI()) {
                var gleft = game.add.sprite(-70, height / 2, "modal_guys_left");
                gleft.anchor.set(0.15, 0.25);
                dialog.add(gleft);

                var gright = game.add.sprite(width, height / 2, "modal_guys_right");
                gright.anchor.set(0.55, 0.5);
                dialog.add(gright);
            }
            else {
                var gleft = game.add.sprite(-70, height / 2, "modal_your_place");
                gleft.anchor.set(0.15, 0.25);
                dialog.add(gleft);
            }

            var canSeizePoint = logic.canSeizePoint(point);
            if (point.isNeutral()) {
                this.addDialogButton(dialog, 350, height - 46, window.static.S.seizeButton, canSeizePoint, function () {
                    logic.seizePoint(point);
                    this.closeModal();
                });
            }
            else if (point.isAI()) {
                var money = logic.players[0].money;
                var influence = point.influence;
                var small = Math.floor(influence / 2),
                    norm  = influence,
                    full  = Math.floor(influence * 2);

                this.addDialogButton(dialog, 350, height - 46, small + "$", money > small, function () {
                    logic.seizePoint(point, small);
                    this.closeModal();
                }, window.static.S.maybe);
                this.addDialogButton(dialog, 520, height - 46, norm + "$", money > norm, function () {
                    logic.seizePoint(point, norm);
                    this.closeModal();
                }, window.static.S.probably);
                this.addDialogButton(dialog, 690, height - 46, full + "$", money > full, function () {
                    logic.seizePoint(point, full);
                    this.closeModal();
                }, window.static.S.forsure);
            }
            else {
                this.addDialogButton(dialog, 350, height - 46, window.static.S.ok, true, function () {
                    this.closeModal();
                });
            }

            this._modal = dialog;
        }

        , addDialogButton: function (dialog, posx, posy, label, enabled, handler, overtext) {
            var button = game.add.sprite(posx, posy, "button");
            button.anchor.set(0, 1.0);
            if (!enabled) button.alpha = 0.5;
            button.inputEnabled = enabled;
            button.events.onInputDown.add(handler, this);
            dialog.add(button);

            var text = game.add.text(posx + button.width / 2, posy -  button.height / 2, label,
                enabled ? this.style_buttonText : this.style_buttonDisText);
            text.anchor.set(0.5, 0.5);
            text.wordWrap = true;
            text.wordWrapWidth = 200 * .9;
            dialog.add(text);

            if (enabled) {
                button.events.onInputOver.add(function () {
                    text.scale.set(1.1);
                }, this);
                button.events.onInputOut.add(function () {
                    text.scale.set(1.0);
                }, this);
            }

            if (overtext) {
                text = game.add.text(posx + button.width / 2, posy - button.height, overtext, this.style_normalText);
                text.anchor.set(0.5, 1.0);
                text.wordWrap = true;
                text.wordWrapWidth = button.width * .9;
                dialog.add(text);
            }
        }

        , showEventPopup: function(event) {
            var width = 383, height = 98;
            var popup = game.add.group();
            popup.x = game.world.width - 40 - width;
            popup.y = game.world.height - 40 - height;

            var back = game.add.sprite(0, 0, "popup");
            back.width = width;
            back.height = height;
            popup.add(back);

            var iconType =  "w_popup_neg";
            if (event.kind == EventKind.POLICE) {
                iconType = "w_popup_cop";
            } else if (event.delta > 0) {
                iconType = "w_popup_pos";
            }
            var icon = game.add.sprite(10, height / 2, iconType);
            icon.anchor.set(0.0, 0.55);
            popup.add(icon);

            var text = game.add.text(110, height / 2, event.text, this.style_normalText);
            text.anchor.set(0, 0.5);
            text.wordWrap = true;
            text.wordWrapWidth = 260;
            popup.add(text);

            var tween = game.add.tween(popup).to( { y: game.world.height / 2, alpha: 0.25 }, 3000, Phaser.Easing.Cubic.In, true);
            tween.onComplete.add(function() { popup.destroy(); });
        }

        /* EVENTS */

        , onPointIncome: function(point, delta) {
            var style = { font: "12px Arial", fill: "#06ff15", align: "center" };
            var text = game.add.text(point.x, point.y, "+"+delta+"$", style);
            text.anchor.set(0.5);
            var tween = game.add.tween(text).to( { y: point.y - 40, alpha: 0.25 }, 1000, Phaser.Easing.Quadratic.In, true);
            tween.onComplete.add(function() { text.destroy(); });
        }

        , onPointSeized: function(event) {
            if (event.isPlayer)
                this.generateSignMask(this.signsPlayer.mask, 0);
            else
                this.generateSignMask(this.signsAI.mask, 1);

            if (event.wasNeutral)
                this.generateSignMask(this.signsNeutral.mask, -1);
            else if (event.isPlayer)
                this.generateSignMask(this.signsAI.mask, 1);
            else
                this.generateSignMask(this.signsPlayer.mask, 0);

            if (!event.isPlayer && !event.wasNeutral)
                this.onEvent(event);
        }

        , onEvent: function(event) {
            this.showEventPopup(event);
        }

        , onGameWon: function(event) {
            this.showWin();
        }

        , onGameLoss: function(event) {
            this.showLoss();
        }

        , onMapClick: function(target, pointer) {
            if (this._modal)
                return;

            var point = logic.getPointAt(pointer.x, pointer.y);
            if (point) {
                this.showPointInfo(point);
                this.soundClick.play();
            }
        }

    };

    // exports
    window.addGameState("main", stateMain);

})();
