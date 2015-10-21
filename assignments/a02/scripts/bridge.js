const DEFAULT_NAMES = [
  "North", "East", "South", "West"
];
/**
 * The BridgeHandler class handles the entire game of bridge
 *
 * @return BridgeHandler
 */
var BridgeHandler = (function() {
  var currentPlay = [];

  function BridgeHandler() {
    this.deck = new Deck();
    this.players = [];
    for (var i = 0; i < DEFAULT_NAMES.length; i++) {
      this.players[i] = new Player(DEFAULT_NAMES[i]);
    }
  }

  /**
   * Restarts a game and deals cards to each player
   *
   */
  BridgeHandler.prototype.deal = function() {
    var i, card;

    this.beginAnew();
    this.deck.shuffle();

    for (i = 0; card = this.deck.draw(); i = ((i + 1) % this.players.length)) {
      this.players[i].addCard(card);
    }
  }

  /**
   * console.logs the JSON of each player data
   * for debugging only
   */
  BridgeHandler.prototype.display = function() {
    this.players.forEach(function(player) {
      console.log(JSON.stringify(player.display()));
    })
  }

  /**
   * Returns each players hand to the deck
   *
   */
  BridgeHandler.prototype.beginAnew = function() {
    this.players.forEach((function(player) {
        this.deck.return(player.trashHand());
      })
      .bind(this));
  }

  /**
   * Gets player data from a given index or player name
   *
   * @param  Number   player  the index of the player data to get
   * @return Object           player data requested
   */
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

  BridgeHandler.prototype.isValidPlay = function(suit, player) {
    return true; //all cards played are valid cards of course

    if (currentPlay.length === 0) {
      return true;
    }

    if (this.getPlayer(player)
      .hasCard(suit)) {
      return true;
    }

    return false;
  }

  return BridgeHandler;
})();

var bridging = new BridgeHandler(),

  play = function(elem) {
    if (bridging.isValidPlay(elem.suit, elem.player)) {
      //get the card
      //set the card to the `in play` area
      //if not done set the next player
      //if everyone plays, go to next trick
    }
  };
