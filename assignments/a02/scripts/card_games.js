const
  SUITS = [
    "hearts", "spades", "clubs", "diamonds"
  ],
  VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  NUM_PER_SUIT = 13,
  UNICODE_CARD = {
    "hearts": "&#x2665;",
    "spades": "&#x2660;",
    "clubs": "&#x2663;",
    "diamonds": "&#x2666;"
  };
var
  Deck = (function() {
    var
      range = function(stop, start = 0, step = 1) {
        var i = start,
          theRange = [];
        for (; i < stop; i += step) {
          theRange[i] = i;
        }
        return theRange;
      },
      shuffle = function(array) {
        var counter = array.length,
          temp, index;

        while (counter > 0) {
          index = Math.floor(Math.random() * counter);

          counter--;

          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }

        return array;
      },
      createDeck = function(cardsArray, startValue) {
        var i, j;

        for (i = 0; i < SUITS.length; i++) {
          for (j = startValue; j < VALUES.length; j++) {
            cardsArray.push(new Card(SUITS[i], VALUES[j]));
          }
        }
      };

    function Deck(configObject = {}) {
      this.cards = [];
      var startValue, numtimes = 1;

      switch (configObject.strippedDeck) {
        case 'pinochle':
          numtimes = 2;
        case 'euchre':
          startValue = VALUES.indexOf('9');
          break;
        case 'standard':
        default:
          startValue = 0;
      }

      while (numtimes--) {
        createDeck(this.cards, startValue);
      }

      shuffle(this.cards);
    };

    Deck.prototype.draw = function() {
      return this.cards.pop();
    }

    Deck.prototype.return = function(card) {
      if (Array.isArray(card)) {
        for (var item of card) {
          this.cards.push(item);
        }
      } else {
        this.cards.push(card);
      }
    }

    Deck.prototype.shuffle = function() {
      shuffle(this.cards);
    }

    return Deck;
  }()),

  Card = (function() {
    function Card(suit, displayValue, intValue) {
      this.suit = suit;
      this.displayValue = displayValue;
      this.intValue = intValue || VALUES.indexOf(displayValue) + 1;
    }

    Card.prototype.compareTo = function(otherCard) {
      var compVal = this.suit.localeCompare(otherCard.suit);
      if (!compVal) {
        compVal = otherCard.intValue - this.intValue;
      }
      return compVal;
    };

    return Card;
  }()),

  Player = (function() {
    function Player(userName) {
      this.userName = userName;
      this.hand = new Hand();
    }

    Player.prototype.addCard = function(card) {
      this.hand.add(card);
    }

    Player.prototype.play = function(card) {
      return this.hand.play(card);
    }

    Player.prototype.trashHand = function() {
      return this.hand.trash();
    }

    Player.prototype.display = function() {
      var displayData = {
        title: this.userName,
        hand: this.hand.getDisplay()
      };

      return displayData;
    }

    return Player;
  }()),

  Hand = (function() {
    function Hand() {
      this.cards = [];
    }

    Hand.prototype.getDisplay = function() {
      var displayData = {},
        item;

      this.cards = this.cards.sort(function(a, b) {
        return a.compareTo(b);
      });
      for (item of this.cards) {
        if (!displayData[item.suit]) {
          displayData[item.suit] = [];
        }
        displayData[item.suit].push(item.displayValue);
      }
      return displayData;
    }

    Hand.prototype.play = function(card) {
      var index = this.cards.indexOf(card);
      if (index < 0) {
        return false;
      }

      delete this.cards[index];
      this.cards = this.cards.filter(function(value) {
        return value;
      });

      return true;
    }

    Hand.prototype.add = function(card) {
      this.cards.push(card);
    }

    Hand.prototype.trash = function() {
      var returnCards = this.cards.slice(0);

      this.cards = [];

      return returnCards;
    }

    return Hand;
  }());
