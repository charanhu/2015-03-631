var BridgeHandler = (function() {
  const DEFAULT_NAMES = [
    "North", "South", "East", "West"
  ];
  const SUITS = [
    "hearts", "spades", "clubs", "diamonds"
  ];
  const NUM_PER_SUIT = 13;
  const UNICODE_CARD = {
    "hearts": "&#x2665;",
    "spades": "&#x2660;",
    "clubs": "&#x2663;",
    "diamonds": "&#x2666;"
  };

  function BridgeHandler() {
    this.deck = new Deck();
    this.players = [];
    for (var i = 0; i < DEFAULT_NAMES.length; i++) {
      this.players[i] = new Player(DEFAULT_NAMES[i]);
    }

    function Player(name) {
      this.pName = name;
      this.hand = [];
      for (var i = 0; i < SUITS.length; i++) {
        this.hand[SUITS[i]] = [];
      }
    }

    Player.prototype.addCard = function(theCard) {
      this.hand[theCard.suit].push(theCard.number);
    }

    Player.prototype.playCard = function(suit, number) {
      var index = this.hand[suit].indexOf(number);
      if (index < 0) {
        throw error;
      }
      delete this.hand[suit][index];
      this.hand[suit] = this.hand[suit].filter(function(value) {
        return value;
      });
    }

    Player.prototype.trashHand = function(deck) {
      Object.keys(this.hand).forEach(function (key) {
        this.hand[key].forEach(function (number) {
          deck.returnCard(key, number);
          this.playCard(key, number);
        }, this);
      }, this);
    }

    Player.prototype.display = function() {
      var displayData = {
        title: this.pName
      };
      Object.keys(this.hand).forEach((function(key) {
        var sorted =
          this.hand[key]
          .sort(function(a, b) {
            return b - a;
          })
          .map(function(item) {
            var result;
            switch (item) {
              case 13:
                result = 'A'
                break;
              case 12:
                result = 'K'
                break;
              case 11:
                result = 'Q'
                break;
              case 10:
                result = 'J'
                break;
              default:
                result = parseInt(item) + 1;
            }
            return result;
          });
        displayData[key] = sorted.join(' ');
      }).bind(this));
      return displayData;
    }

    function Deck() {
      this.cards = shuffle(range(52));
      // this.cards = range(52);
    }

    Deck.prototype.drawCard = function() {
      return this.cards.pop();
    }

    Deck.prototype.deal = function(players) {
      var numPlayers = players.length,
        limit = this.cards.length;
      for (var i = 0; i < limit; i++) {
        players[i % numPlayers].addCard(new Card(this.drawCard()));
      }
    }

    Deck.prototype.returnCard = function(suit, number) {
      this.cards.push(
        (SUITS.indexOf(suit) * NUM_PER_SUIT) + number - 1
      );
    }

    function Card(number) {
      this.suit = SUITS[Math.floor(number / NUM_PER_SUIT)];
      this.number = number % NUM_PER_SUIT;

      this.number = this.number ? this.number : NUM_PER_SUIT;
    }

    Card.prototype.compareTo = function(otherCard) {
      return this.number - otherCard.number;
    }

    Card.prototype.play = function(player, deck) {
      player.playCard(this.suit, this.number);
      deck.returnCard(this.suit, this.number);
    }

  }
  BridgeHandler.prototype.deal = function() {
    this.beginAnew();
    this.deck.deal(this.players);
  }
  BridgeHandler.prototype.display = function() {
    this.players.forEach(function(player) {
      console.log(JSON.stringify(player.display()));
    })
  }
  BridgeHandler.prototype.beginAnew = function() {
    this.players.forEach((function(player) {
      player.trashHand(this.deck);
    }).bind(this));
  }
  BridgeHandler.prototype.getPlayer = function(player) {
    var i;
    if (typeof player != "number") {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].pName == player) {
          break;
        }
      }
      if (i == this.players.length) {
        throw error;
      }
    } else {
      i = player;
    }
    return this.players[i];
  }

  return BridgeHandler;
})();
