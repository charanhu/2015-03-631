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

    function Card(number) {
      this.suit = SUITS[Math.floor(number / NUM_PER_SUIT)];
      this.number = number % NUM_PER_SUIT;

      this.number = this.number ? this.number : NUM_PER_SUIT;
    }

    Card.prototype.compareTo = function(otherCard) {
      return this.number - otherCard.number;
    }
  }
  BridgeHandler.prototype.deal = function() {
    this.deck.deal(this.players);
  }
  BridgeHandler.prototype.display = function() {
    this.players.forEach(function(player) {
      console.log(JSON.stringify(player.display()));
    })
  }
  return BridgeHandler;
})();
