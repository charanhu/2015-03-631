const
  SUITS = [
    "spades", "hearts", "diamonds", "clubs"
  ],
  VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  NUM_PER_SUIT = 13;
var

/**
 * Deck class for all of the awesome card gaming ever
 *
 */
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

    /**
     * Deck constructor
     * @param Object  configObject = {}   a configuration object to pass into deck creation (right now only supports standard and euchre)
     */
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

    /**
     * Draws a card from the deck
     *
     * @return  Card    the top card from the deck
     */
    Deck.prototype.draw = function() {
      return this.cards.pop();
    }

    /**
     * Returns a card or array of cards back to the deck
     *
     * @param  Card card the card and/or array of cards to return to the deck
     */
    Deck.prototype.return = function(card) {
      if (Array.isArray(card)) {
        for (var item of card) {
          this.cards.push(item);
        }
      } else {
        this.cards.push(card);
      }
    }

    /**
     * Shuffles the deck!
     *
     */
    Deck.prototype.shuffle = function() {
      shuffle(this.cards);
    }

    return Deck;
  }()),

  /**
   * Card class for some awesome card games!
   *
   */
  Card = (function() {

    /**
     * Card constructor, requires a suit and at least display value
     *
     * @param String  suit         the suit of the card
     * @param String  displayValue the display value of a card (default from 2-10, J, Q, K, A)
     * @param Number  intValue     the actual value of a card
     */
    function Card(suit, displayValue, intValue) {
      this.suit = suit;
      this.displayValue = displayValue;
      this.intValue = intValue || VALUES.indexOf(displayValue) + 1;
    }

    /**
     * Compares two cards
     *
     * @param  Card   otherCard   the other card to compare against
     * @return Number             to provide ordering in hand
     */
    Card.prototype.compareTo = function(otherCard) {
      var compVal = this.suit.localeCompare(otherCard.suit);
      if (!compVal) {
        compVal = otherCard.intValue - this.intValue;
      }
      return compVal;
    };

    return Card;
  }()),

  /**
   * Player class for some card gaming
   *
   */
  Player = (function() {
    /**
     * Constructor for player object
     *
     * @param String userName   the user name of the given player
     */
    function Player(userName) {
      this.userName = userName;
      this.hand = new Hand();
    }

    /**
     * Used in conjunction with a player drawing or passing a card
     *
     * @param  Card   card    the card to add to a player's hand
     */
    Player.prototype.addCard = function(card) {
      this.hand.add(card);
    }

    /**
     * Given an array of cards, sets the player's hand to those cards
     *
     * @param  [Card] hand  an array of cards to set the players hand
     * @return [Card]       the cards that the player used to have in their hand
     */
    Player.prototype.setHand = function(hand) {
      return this.trashHand();
      if (Array.isArray(hand)) {
        for (var card of hand) {
          this.addCard(card);
        }
      }
    }

    /**
     * Plays a card from a player's hand
     *
     * @param  Card   card  the card to play from a users hand
     * @return boolean      true if the card existed in the hand, false if not
     */
    Player.prototype.play = function(card) {
      return this.hand.play(card);
    }

    /**
     * Removes all user cards from hand and returns them
     *
     * @return [Card]     the cards from the user's hand
     */
    Player.prototype.trashHand = function() {
      return this.hand.trash();
    }

    /**
     * Creates and returns user data
     *
     * @return Object     player data (username and hand)
     */
    Player.prototype.display = function() {
      var displayData = {
        title: this.userName,
        hand: this.hand.getDisplay()
      };

      return displayData;
    }

    return Player;
  }()),

  /**
   * Hand class for card games (probably doesn't need to be another class)
   *
   */
  Hand = (function() {
    /**
     * Constructor for a Hand object
     */
    function Hand() {
      this.cards = [];
    }

    /**
     * Generates hand display data
     *
     * @return Object   object represeting nicely organized hand
     */
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

    /**
     * Play function removes a card from a hand
     *
     * @param  Card   card    the given card to remove
     * @return boolean        if the card exists in the hand
     */
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

    /**
     * Adds a card to a hand
     *
     * @param  Card   card    the card to add to the hand array
     */
    Hand.prototype.add = function(card) {
      this.cards.push(card);
    }

    /**
     * Clears the player's hand
     *
     * @return [Card]         the card array that did exist
     */
    Hand.prototype.trash = function() {
      var returnCards = this.cards.slice(0);

      this.cards = [];

      return returnCards;
    }

    return Hand;
  }());
