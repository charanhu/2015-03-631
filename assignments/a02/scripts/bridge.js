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
  }

  BridgeHandler.prototype.deal = function() {
    var i, card;

    this.beginAnew();
    this.deck.shuffle();

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
        this.deck.return(player.trashHand());
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
