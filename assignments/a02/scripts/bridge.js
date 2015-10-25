const DEFAULT_NAMES = [
  "North", "East", "South", "West"
];
/**
 * The BridgeHandler class handles the entire game of bridge
 *
 * @return BridgeHandler
 */
var BridgeHandler = (function() {

  function BridgeHandler() {
    this.deck = new Deck();
    this.players = [];
    for (var i = 0; i < DEFAULT_NAMES.length; i++) {
      this.players[i] = new Player(DEFAULT_NAMES[i]);
    }
    this.currentPlay = [];
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
      // this.players.forEach(function(player) {
      //   console.log(JSON.stringify(player.display()));
      // });
      this.displayer.display();
    }
    /**
     * Rotates everybody's seat
     *
     */
  BridgeHandler.prototype.rotate = function() {
    this.displayer.rotate();
    this.display();
  }

  /**
   * Binds a displaying object to a BridgeHandler
   *
   * @param  BridgeDisplay  theDisplayer   a displayer to handle displaying magic
   */
  BridgeHandler.prototype.bindDisplayer = function(theDisplayer) {
    this.displayer = theDisplayer;
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
        if (this.players[i].userName == player) {
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

  /**
   * checks if a supposed move is valid
   *
   * @param  String   suit    a string representation of a suit to check validity
   * @param  String   player  the name of the player that attempts to play a suit
   * @return Boolean          true if the suit can be played
   */
  BridgeHandler.prototype.isValidPlay = function(suit, player) {
    if (this.currentPlay[player]) {
      return false;
    }

    return true; //all cards played are valid cards of course

    if (this.currentPlay.length === 0) {
      return true;
    }

    if (this.getPlayer(player)
      .hasCard(suit)) {
      return true;
    }

    return false;
  }

  /**
   * sets a card for play in the current trick
   *
   * @param  Card     card       a card to play
   * @param  String   playername the player that is playing said card
   */
  BridgeHandler.prototype.setPlay = function(card, playername) {
    this.currentPlay[playername] = card;
    this.display();
  }

  /**
   * resets the current trick, returns all used cards to the deck
   *
   */
  BridgeHandler.prototype.finishTrick = function() {
    for (var card in this.currentPlay) {
      this.deck.return(card);
    }

    this.currentPlay = [];
    this.display();
  }

  return BridgeHandler;
})();

var bridging = new BridgeHandler();
bridging.bindDisplayer(new BridgeDisplay(bridging));

var play = function(elem) {
  var card, suit = elem.getAttribute('suit'),
    player = elem.getAttribute('player'),
    displayValue = elem.getAttribute('displayValue');

  if (bridging.isValidPlay(suit, player)) {
    //get the card
    card = bridging.getPlayer(player)
      .getCard(suit, displayValue);

    //set the card to the `in play` area
    if (bridging.currentPlay.length < DEFAULT_NAMES.length) {
      bridging.setPlay(card, player);

      player = bridging.getPlayer(player);
      card = player.getCard(suit, displayValue);
      card = player.play(card);
    }
    //if not done set the next player
    //if everyone plays, go to next trick
  }

  for (var i = 0; i < DEFAULT_NAMES.length; i++) {
    if (!bridging.currentPlay[DEFAULT_NAMES[i]]) {
      break;
    }
  }
  if (i === DEFAULT_NAMES.length) {
    bridging.finishTrick();
  }

  bridging.display();
};
