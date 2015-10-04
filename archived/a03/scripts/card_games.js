const DEFAULT_NAMES = [
    "North", "East", "South", "West"
  ],
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
      };

    function Deck(configObject) {
      this.cards = [];

      switch (configObject.strippedDeck) {
        case 'euchre':

          break;
        case 'pinochle':

          break;
        case 'standard':
        default:

      }
    };

    return Deck;
  }()),
  Card = (function() {
    function Card(suit, displayValue, intValue) {
      this.suit = suit;
      this.displayValue = displayValue;
      this.intValue = intValue || VALUES.indexOf(displayValue) + 1;
    }

    Card.prototype.compareTo = function(otherCard) {
      return otherCard.intValue - this.intValue;
    };

    return Card;
  }()),
  Player = (function() {

  }()),
  Hand = (function() {

  }());
