;(function() {

    var states = {};
    var isMobile = false;

    // exports
    window.addGameState = function(name, state) {
        states[name] = state;
    };

    window.onload = function () {
        isMobile =  navigator.userAgent.indexOf("Mobile") > -1;
        // init global game instance
        if (!isMobile) {
            window.game = new Phaser.Game(1280, 800, Phaser.AUTO, "ph_game");
        } else {
            window.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
        }
        //gameMedia = new GameMedia();
        //gameButtons = new GameButtons();



        //add a state or screen to the game
        game.state.add("init", states.init);
        game.state.add("main", states.main);
        game.state.add("load", states.load);
        //game.state.add("StateTitle", StateTitle);
        //game.state.add("StateOver", StateOver);

        game.state.start("init");
    };

})();
