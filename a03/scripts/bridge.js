var BridgeHandler = (function () {
  const DEFAULT_NAMES = [
    "North", "South", "East", "West"
  ];
  const SUITS = [
    "hearts", "spades", "clubs", "diamonds"
  ]
  const NUM_PER_SUIT = 13;
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

    function Deck() {
      this.cards = shuffle(range(52));
    }

    Deck.prototype.drawCard = function() {
      return this.cards.pop();
    }

    Deck.prototype.deal = function(players) {
      var numPlayers = players.length, limit = this.cards.length;
      for (var i = 0; i < limit; i++) {
        players[i % numPlayers].addCard(new Card(this.drawCard()));
      }
    }

    function Card(number) {
      this.suit = SUITS[Math.floor(number / NUM_PER_SUIT)];
      this.number = number % NUM_PER_SUIT;
    }
  }
  BridgeHandler.prototype.deal = function() {
    this.deck.deal(this.players);
  }
  return BridgeHandler;
})();
