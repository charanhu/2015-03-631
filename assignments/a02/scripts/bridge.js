const DEFAULT_NAMES = [
  "North", "East", "South", "West"
];
var BridgeHandler = (function() {

  function BridgeHandler() {
    this.deck = new Deck();
    this.players = [];
    for (var i = 0; i < DEFAULT_NAMES.length; i++) {
      this.players[i] = new Player(DEFAULT_NAMES[i]);
    }

    Player.prototype.display = function() {
      var displayData = {
        title: this.pName,
      };
      Object.keys(this.hand)
        .forEach((function(key) {
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
          })
          .bind(this));
      return displayData;
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
    var i, card;
    this.beginAnew();
    for (i = 0; card = this.deck.draw(); i = ((i + 1) % this.players.length)) {
      this.players[i].addCard(card);
    }
  }
  BridgeHandler.prototype.display = function() {
    this.players.forEach(function(player) {
      console.log(JSON.stringify(player.display()));
    })
  }
  BridgeHandler.prototype.beginAnew = function() {
    this.players.forEach((function(player) {
        player.trashHand(this.deck);
      })
      .bind(this));
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
    return this.players[i].display();
  }

  return BridgeHandler;
})();
