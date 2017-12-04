;(function() {

    window.static = {

        // 0 мясная лавка
        // 1 кафе
        // 2 кинотеатр
        // 3 пекарня
        // 4 варьете
        // 5 ресторан
        // 6 кабаре
        // 7 игорный дом
        // 8 закучосная
        // 9 казино
        // 10 ателье
        // 11 парикмахерская
        // 12 прачечная
        // 13 аптека
        // 14 автосалон

        // map
        points: [{
            title: "Po's Laundry",
            district: 1,
            income: 200,
            influence: 5,
            level: 2,
            ownership: -1,
            kind: 12,
            building: 0,
            x: 76,
            y: 92
        },{
            title: "Drug store",
            district: 1,
            income: 300,
            influence: 1000,
            ownership: -1,
            level: 3,
            kind: 13,
            building: 1,
            x: 206,
            y: 122
        },{
            title: "Max' Autoshop",
            district: 1,
            income: 200,
            influence: 500,
            level: 2,
            ownership: -1,
            kind: 14,
            building: 2,
            x: 321,
            y: 115
        },{
            title: "Barber's",
            district: 1,
            income: 100,
            influence: 300,
            ownership: 0,
            level: 1,
            kind: 11,
            building: 3,
            x: 440,
            y: 111
        },{
            title: "Dusk&Dawn",
            district: 1,
            income: 300,
            influence: 1000,
            level: 3,
            ownership: -1,
            kind: 7,
            building: 5,
            x: 540,
            y: 165
        },{
            title: "At Butcher's",
            district: 1,
            income: 200,
            influence: 500,
            ownership: -1,
            level: 2,
            kind: 0,
            building: 4,
            x: 440,
            y: 210
        },{
            title: "Versacce",
            district: 1,
            income: 200,
            influence: 500,
            level: 2,
            ownership: -1,
            kind: 10,
            building: 10,
            x: 340,
            y: 270
        },{
            title: "Little China",
            district: 1,
            income: 100,
            influence: 300,
            ownership: -1,
            level: 1,
            kind: 12,
            building: 11,
            x: 440,
            y: 296
        },{
            title: "At Baker's",
            district: 1,
            income: 100,
            influence: 300,
            level: 1,
            ownership: -1,
            kind: 3,
            building: 12,
            x: 540,
            y: 296
        },{
            title: "Cafe Sunset",
            id: "2_1",
            district: 2,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 1,
            kind: 1,
            building: 6,
            x: 60,
            y: 230
        },{
            title: "Moulen Rouge",
            id: "2_2",
            district: 2,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 6,
            building: 7,
            x: 60,
            y: 330
        },{
            title: "Tequilla Casino",
            id: "2_3",
            district: 2,
            income: 600,
            influence: 2000,
            ownership: -1,
            level: 3,
            kind: 9,
            building: 8,
            x: 180,
            y: 300
        },{
            title: "Lumiere Brs.",
            id: "2_4",
            district: 2,
            income: 600,
            influence: 2000,
            level: 3,
            ownership: -1,
            kind: 2,
            building: 9,
            x: 320,
            y: 360
        },{
            title: "Road Diners",
            id: "2_5",
            district: 2,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 1,
            kind: 8,
            building: 14,
            x: 240,
            y: 460
        },{
            title: "Tres Chic",
            id: "2_6",
            district: 2,
            income: 400,
            influence: 1500,
            level: 2,
            ownership: -1,
            kind: 5,
            building: 15,
            x: 60,
            y: 480
        },{
            title: "Oldsmobile",
            id: "2_7",
            district: 2,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 14,
            building: 16,
            x: 170,
            y: 550
        },{
            title: "At River",
            id: "2_8",
            district: 2,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 12,
            building: 17,
            x: 260,
            y: 540
        },{
            title: "Fashion",
            id: "2_9",
            district: 2,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 1,
            kind: 11,
            building: 22,
            x: 60,
            y: 600
        },{
            title: "Digg's Pharmacy",
            id: "2_10",
            district: 2,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 13,
            building: 23,
            x: 60,
            y: 680
        },{
            title: "Fresh Meat",
            id: "2_11",
            district: 2,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 0,
            building: 19,
            x: 170,
            y: 660
        },{
            title: "Lil' Pleasures",
            id: "2_12",
            district: 2,
            income: 400,
            influence: 1500,
            level: 2,
            ownership: -1,
            kind: 6,
            building: 20,
            x: 280,
            y: 640
        },{
            title: "Bread&Butter",
            id: "2_13",
            district: 2,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 1,
            kind: 3,
            building: 21,
            x: 200,
            y: 740
        },{
            title: "Zum Loewen",
            id: "3_1",
            district: 3,
            income: 900,
            influence: 3000,
            level: 3,
            ownership: -1,
            kind: 5,
            building: 13,
            x: 460,
            y: 430
        },{
            title: "Dice",
            id: "3_2",
            district: 3,
            income: 600,
            influence: 2000,
            ownership: -1,
            level: 2,
            kind: 7,
            building: 18,
            x: 400,
            y: 535
        },{
            title: "Grand Casino",
            id: "3_3",
            district: 3,
            income: 900,
            influence: 3000,
            level: 3,
            ownership: -1,
            kind: 9,
            building: 24,
            x: 540,
            y: 540
        },{
            title: "Can-can",
            id: "3_4",
            district: 3,
            income: 900,
            influence: 3000,
            ownership: -1,
            level: 3,
            kind: 4,
            building: 25,
            x: 700,
            y: 540
        },{
            title: "Men's&Women's",
            id: "3_5",
            district: 3,
            income: 900,
            influence: 3000,
            level: 3,
            ownership: -1,
            kind: 10,
            building: 26,
            x: 390,
            y: 680
        },{
            title: "Cafe Express",
            district: 3,
            income: 600,
            influence: 2000,
            ownership: -1,
            level: 2,
            kind: 1,
            building: 27,
            x: 490,
            y: 710
        },{
            title: "Baguettes",
            district: 3,
            income: 600,
            influence: 2000,
            level: 2,
            ownership: -1,
            kind: 3,
            building: 28,
            x: 590,
            y: 680
        },{
            title: "Fast Wheels",
            district: 3,
            income: 900,
            influence: 3000,
            ownership: -1,
            level: 3,
            kind: 14,
            building: 29,
            x: 700,
            y: 700
        },{
            title: "Bakery",
            district: 4,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 3,
            building: 30,
            x: 770,
            y: 120
        },{
            title: "Chef's",
            district: 4,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 5,
            building: 31,
            x: 900,
            y: 150
        },{
            title: "First Aid",
            district: 4,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 13,
            building: 32,
            x: 990,
            y: 100
        },{
            title: "Butcher Bay",
            district: 4,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 0,
            building: 33,
            x: 1100,
            y: 140
        },{
            title: "High Stakes",
            district: 4,
            income: 400,
            influence: 1500,
            level: 2,
            ownership: -1,
            kind: 7,
            building: 34,
            x: 800,
            y: 250
        },{
            title: "Armani",
            district: 4,
            income: 600,
            influence: 2000,
            ownership: -1,
            level: 3,
            kind: 10,
            building: 35,
            x: 950,
            y: 250
        },{
            title: "John's Syrups",
            district: 4,
            income: 200,
            influence: 600,
            level: 1,
            ownership: -1,
            kind: 13,
            building: 36,
            x: 1040,
            y: 230
        },{
            title: "Hollywood",
            district: 4,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 2,
            building: 37,
            x: 1170,
            y: 275
        },{
            title: "Lights of Paris",
            district: 4,
            income: 600,
            influence: 2000,
            level: 3,
            ownership: -1,
            kind: 6,
            building: 38,
            x: 865,
            y: 385
        },{
            title: "Repair Shop",
            district: 4,
            income: 400,
            influence: 1500,
            ownership: -1,
            level: 2,
            kind: 14,
            building: 39,
            x: 990,
            y: 400
        },{
            title: "Bistrot at Jean's",
            district: 4,
            income: 400,
            influence: 1500,
            level: 2,
            ownership: -1,
            kind: 8,
            building: 40,
            x: 1110,
            y: 440
        },{
            title: "The Tube",
            district: 4,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 1,
            kind: 7,
            building: 41,
            x: 1210,
            y: 370
        },{
            title: "Cannes",
            district: 5,
            income: 200,
            influence: 600,
            level: 2,
            ownership: -1,
            kind: 2,
            building: 42,
            x: 910,
            y: 500
        },{
            title: "Las Vegas",
            district: 5,
            income: 300,
            influence: 1000,
            ownership: -1,
            level: 3,
            kind: 9,
            building: 45,
            x: 960,
            y: 630
        },{
            title: "Pasta Frutti",
            district: 5,
            income: 300,
            influence: 1000,
            level: 3,
            ownership: -1,
            kind: 5,
            building: 43,
            x: 1060,
            y: 560
        },{
            title: "Duchess",
            district: 5,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 2,
            kind: 11,
            building: 44,
            x: 1170,
            y: 510
        },{
            title: "Italian Laundry",
            district: 5,
            income: 100,
            influence: 300,
            level: 1,
            ownership: -1,
            kind: 12,
            building: 46,
            x: 960,
            y: 710
        },{
            title: "Bakery and Cafe",
            district: 5,
            income: 200,
            influence: 600,
            ownership: -1,
            level: 2,
            kind: 3,
            building: 47,
            x: 1060,
            y: 700
        },{
            title: "The Calf",
            district: 5,
            income: 200,
            influence: 600,
            ownership: 1,
            level: 2,
            kind: 0,
            building: 48,
            x: 1195,
            y: 700
        }]

        , negativeEvents: [{
            title: "Pay your taxes: %d$",
            delta: -150
        },{
            title: "Fire inspection: %d$",
            delta: -50
        },{
            title: "Labor union: %d$",
            delta: -100
        },{
            title: "It's mayor's birthday: %d$",
            delta: -50
        },{
            title: "It's city foundation day: %d$",
            delta: -100
        },{
            title: "Don Mafioso sent his guys: %d$",
            delta: -250
        }]

        , positiveEvents: [{
            title: "Here is some bribe: %d$",
            delta: +50
        },{
            title: "You won the derby: %d$",
            delta: +70
        },{
            title: "Good night in casino: %d$",
            delta: +80
        },{
            title: "One must pay their debts: %d$",
            delta: +10
        },{
            title: "It's good to have a judge in court: %d$",
            delta: +20
        }]


        // income levels
        , incomesLevels: [-1, 100, 200, 300]
        // expenses levels
        , expensesLevels: [-1, 50, 100, 150]


        // one logic time tick (virtual day) in ms
        , timestep: 1000
        // logic period in virtual days - virtual week
        , period: 7
        // point radius for clicks
        , pointRadius: 56




        // strings
        , S: {
            player1: "Player 1"
            , playerAI: "Don Mafioso"
            , pointNeutral: "No one helps this property! We can be the first."
            , pointPlayer: "We help and protect this property! Well done."
            , pointAI: "This property is held by %s! That's not right, eh? We can send our boys there."
            , paidPolice: "You paid police %d$"
            , incomeLabel: "Income"
            , influenceNeeded: "You must have %d$ to seize it."
            , seizeButton: "Seize"
            , playerSeized: "You captured \"%s\"!"
            , aiSeized: "Opponent captured \"%s\"!"
            , seizeFailed: "You failed to capture \"%s\"!"
            , maybe: "Maybe"
            , probably: "Probably"
            , forsure: "Sure"
            , outOfMoney: "You ran out of money and were sentenced and imprisoned for life!"
            , outOfProperty: "You lost all your property and were banished from the city!"
            , ok: "OK"
            , playButton: "Play"
            , intro: "Become the great criminal leader!\nTake control of property, deal with the police, destroy competitors.\n Show'em who is in charge!"
            , win: "You won!"
            , winText: "The city is yours. Good job, it's time to take the next one."
            , loss: "Game Over"
            , lossText: "Sic transit gloria mundi"
            , maxIncomeLabel: "Max income"

        }
    };

})();
