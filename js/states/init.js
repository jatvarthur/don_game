;(function() {

    var stateInit = {

        preload: function () {
            game.load.image("loadingEmpty", "images/loading/progress_none.png");
            game.load.image("loadingFull", "images/loading/progress_all.png");
            /*
            if (isMobile==true) {
                if (useLandscape == true) {
                    game.scale.forceOrientation(true, false);
                } else {
                    game.scale.forceOrientation(false, true);
                }


                game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
                game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
            }
            */
        }

        , create: function () {
            game.state.start("load");
        }

        , update: function () {

        }

    };

    // exports
    window.addGameState("init", stateInit);

})();
