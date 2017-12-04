;(function() {

    // point of income
    var Point = function() { this._init(); };
    Point.prototype = {
        _init: function() {
            // title
            this.title = "";
            // income in period
            this.income = 0;
            // min influence to seize it
            this.influnce = 0;
            // level of the point
            this.level = 0;
            // who this shop belongs to, -1 is neutral, 0 is player, 1, .. - AI
            this.ownership = -1;
            // who this shop belongs to, Player
            this.owner = null;
            // position on the map
            this.x = 0;
            this.y = 0;
        }

        , update: function() {

        }

        , isNeutral: function() {
            return this.ownership == -1;
        }

        , isPlayer: function() {
            return this.ownership == 0;
        }

        , isAI: function() {
            return this.ownership > 0;
        }

    };

    // Player data
    var Player = function(title) { this._init(title); };
    Player.prototype = {
        _init: function(title) {
            // title
            this.title = title;
            // current amount og money gained
            this.money = 0;
            // points owned
            this.pointsOwned = 0;

        }
    };

    // type of event
    window.EventKind = {
        UNKNOWN: 0
        , POINT_SEIZED: 1
        , POLICE: 2
        , RANDOM: 3
        , SEIZE_FAILED: 4
        , GAME_LOSS_MONEY: 5
        , GAME_LOSS_POINTS: 6
        , GAME_WON: 7
    };
    // Some game event
    var Event = function(kind, text, delta, opts) { this._init(kind, text, delta, opts); };
    Event.prototype = {
        _init: function(kind, text, delta, opts) {
            // kind of event, determines icon etc
            this.kind = kind;
            // message text
            this.text = text;
            // money change after event
            this.delta = delta;
            // additional properties
            if (opts) _.extend(this, opts);
        }

    };

    // main game object holder
    var gameLogic = {
        // points on the map
        points: []
        // players on the map, players[0] is the local player
        , players: []
        // police in region
        , police: []
        // current tick
        , tickNo: 0
        // whether game in progress
        , active: true

        /* EVENTS */
        // point generated some income
        , onPointIncome: new Phaser.Signal()
        // game event
        , onPointSeized: new Phaser.Signal()
        // game event
        , onEvent: new Phaser.Signal()
        // game loss
        , onGameLoss: new Phaser.Signal()
        // game win
        , onGameWon: new Phaser.Signal()


        , init: function() {
            // local player
            this.players.length = 0;
            this.players.push(new Player(window.static.S.player1)); // localplayer
            this.players.push(new Player(window.static.S.playerAI)); // AI

            // police
            this.police.length = 0;
            this.police.push(0);
            this.police.push(0);
            this.police.push(0);
            this.police.push(0);

            // points
            this.points.length = 0;
            _.each(window.static.points, function(item) {
                var point = _.extend(new Point(), item);
                point.owner = item.ownership != -1 ? this.players[item.ownership] : null;
                if (point.owner) {
                    this.police[point.level] = window.static.expensesLevels[point.level];
                    point.owner.pointsOwned += 1;
                }
                this.points.push(point);
            }.bind(this));

            this.tickNo = 0;
            this.thisWeekEvents = 0;
            this.active = true;
        }

        , update: function() {
            if (!this.active)
                return;

            this.tickNo += 1;
            var isWeek = this.tickNo % window.static.period == 0;
            if (isWeek) {
                this.thisWeekEvents = 0;
            }

            // one event per tick
            var result = false;
            result = result || this._checkAI(isWeek);
            this._collectIncome(isWeek);
            this._checkPolice(isWeek);
            result = result || this._checkRandom(isWeek);
        }

        , _checkAI: function(isPolice) {
            if (isPolice)
                return;

            if (game.rnd.frac() < 0.25) {
                var free = null;
                for (var i = this.points.length - 1; i >= 0; --i) {
                    if (!this.points[i].isAI()) {
                        if (free == null) {
                            free = this.points[i];
                        }
                        else {
                            free = this.points[i];
                            if (game.rnd.frac() < 0.33)
                                break;
                        }
                    }
                }

                // seize
                if (free != null) {
                    var event = this._updatePointOwner(free, 1);
                    this.onPointSeized.dispatch(event);
                    if (this.players[0].pointsOwned == 0)
                        this.loseGame(EventKind.GAME_LOSS_POINTS);
                }
            }
        }

        , _collectIncome: function(isPolice) {
            _.each(this.points, function(point) {
                if (!point.isNeutral()) {
                    var delta = Math.floor(point.income / window.static.period);
                    point.owner.money += delta;
                    if (point.isPlayer())
                        this.onPointIncome.dispatch(point, delta);
                }
            }.bind(this));
        }

        , _checkPolice: function(isPolice) {
            if (!isPolice)
                return;

            // todo: city district, for each add a pliceman
            var base = this.police[1] + this.police[2] + this.police[3];
            var delta = -Math.floor(base * this.players[0].pointsOwned / 3 * (1 + (this.tickNo / window.static.period) * 0.2));
            var event = new Event(EventKind.POLICE, sprintf(window.static.S.paidPolice, delta), delta);
            this.changeMoney(delta, event);
        }

        , _checkRandom: function(isPolice) {
            // not with police
            if (isPolice || this.thisWeekEvents > 0)
                return;

            if (game.rnd.frac() < 0.25) {
                this.thisWeekEvents += 1;

                var isPositive = this.tickNo < window.static.period || game.rnd.frac() < 0.33;
                var edata = game.rnd.pick(isPositive ? window.static.positiveEvents : window.static.negativeEvents);
                var event = new Event(EventKind.RANDOM, sprintf(edata.title, edata.delta), edata.delta);
                this.changeMoney(edata.delta, event);
            }
        }

        , _updatePointOwner: function(point, ownership) {
            var prevOwner = point.ownership;

            if (point.owner) {
                point.owner.pointsOwned -= 1;
            }

            point.ownership = ownership;
            point.owner = this.players[ownership];
            point.owner.pointsOwned += 1;
            var fmt = ownership == 0 ? window.static.S.youSeized : window.static.S.aiSeized;
            var event = new Event(EventKind.POINT_SEIZED, sprintf(fmt, point.title), 0);
            event.point = point;
            event.wasNeutral = prevOwner == -1;
            event.isPlayer = ownership == 0;

            return event;
        }

        , getPointAt: function(x, y) {
            var radius = window.static.pointRadius;
            return _.find(this.points, function(item) {
                return Phaser.Math.distance(item.x, item.y, x, y) < radius;
            });
        }

        , canSeizePoint: function(point) {
            return point.ownership != 0 && point.influence <= this.players[0].money;
        }

        , seizePoint: function(point, amount) {
            if (point.isNeutral()) {
                if (!this.canSeizePoint(point))
                    return;
            }
            else {
                if (this.players[0].money < amount)
                    return;

                this.players[0].money -= amount;
                if (amount < point.influence) {
                    if (game.rnd.frac() > 0.33) {
                        var event = new Event(EventKind.SEIZE_FAILED, sprintf(window.static.S.seizeFailed, point.title), -1);
                        this.onEvent.dispatch(event);
                        return;
                    }
                }
                else if (amount == point.influence) {
                    if (game.rnd.frac() > 0.66)
                        return;
                }
            }

            var event = this._updatePointOwner(point, 0);
            // update police
            this.police[point.level] = window.static.expensesLevels[point.level];
            this.onPointSeized.dispatch(event);

            // win
            if (this.players[0].pointsOwned == this.points.length)
                this.winGame();
        }

        , changeMoney: function(delta, event) {
            this.players[0].money += delta;
            this.onEvent.dispatch(event);
            if (this.players[0].money <= 0)
                this.loseGame(EventKind.GAME_LOSS_MONEY);
        }

        , loseGame: function(reason) {
            this.active = false;

            var text = window.static.S.outOfMoney;
            if (reason == EventKind.GAME_LOSS_POINTS)
                text = window.static.S.outOfProperty;

            this.onGameLoss.dispatch(new Event(reason, text));
        }

        , winGame: function() {
            this.active = false;
            this.onGameWon.dispatch(new Event(EventInit.GAME_WON, window.static.S.win));
        }

    };

    // exports
    window.logic = gameLogic;

})();
