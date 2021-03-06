var BridgeDisplay = (function() {
  var offset = 0;

  const SUIT_DISPLAY = {
      "hearts": {
        "icon": "&#x2665;",
        "color": "red"
      },
      "spades": {
        "icon": "&#x2660;",
        "color": "black"
      },
      "clubs": {
        "icon": "&#x2663;",
        "color": "black"
      },
      "diamonds": {
        "icon": "&#x2666;",
        "color": "red"
      }
    },
    DEFAULT_DIVS = [
      "top",
      "right",
      "bottom",
      "left"
    ];

  /**
   * BridgeDisplay constructor
   *
   * @param BridgeHandler   handler   the bridgeHandler to attach
   */
  function BridgeDisplay(handler) {
    this.handler = handler;
  }

  /**
   * Displays an individual player in a given div
   *
   * @param  HTMLElement  holderDiv  the location to display player data
   * @param  Player       playerJSON player data to display
   */
  function displayHand(holderDiv, playerJSON) {
    var toBeInner = `<h2>${playerJSON['title']}</h2>`;
    toBeInner += SUITS.map(function(suit) {
        var toReturn = `<p class="cards-row ${SUIT_DISPLAY[suit].color}"> ${SUIT_DISPLAY[suit].icon}`;
        if (playerJSON.hand[suit]) {
          for (var card of playerJSON.hand[suit]) {
            toReturn += ` <span class="card-num" player="${playerJSON['title']}" suit="${suit}" displayValue="${card}" onclick="play(this);">${card}</span> `;
          }
        }
        toReturn += `</p>`;

        return toReturn;
      })
      .join('\n');

    holderDiv.innerHTML = toBeInner;
    holderDiv.thePlayer = playerJSON;
  }

  /**
   * Displays all of the play data stored in a game of bridge
   *
   * @param  BridgeHandler  bridgeHandler the game of bridge to display
   * @param  boolean        rotate        whether or not to rotate the display
   */
  function defaultDisplay(bridgeHandler) {
    for (var i = 0; i < DEFAULT_DIVS.length; i++) {
      displayHand(document.getElementById(DEFAULT_DIVS[(i + offset) % DEFAULT_DIVS.length]),
        bridgeHandler.getPlayer(i)
        .display());
    }
  }

  /**
   * The display function to show the current trick in play
   *
   * @param  BridgeHandler  bridgeHandler   the bridgeHandler represeting the game to display
   */
  function displayCurrent(bridgeHandler) {

    for (var i = 0; i < DEFAULT_DIVS.length; i++) {
      // bridgeHandler.currentPlay
      var theCard = bridgeHandler.currentPlay.didPlay(bridgeHandler.getPlayer(i)
          .userName),
        output = '';
      if (theCard) {
        output = `<span class="${SUIT_DISPLAY[theCard.suit].color}">${SUIT_DISPLAY[theCard.suit].icon} ${theCard.displayValue}</span>`;
      }
      document.getElementById(DEFAULT_DIVS[(i + offset) % DEFAULT_DIVS.length] + '-card')
        .innerHTML = output;
    }
  }

  /**
   * displays the current set up of the hand and the current trick in play
   *
   */
  BridgeDisplay.prototype.display = function() {
    defaultDisplay(this.handler);
    displayCurrent(this.handler);
  }

  /**
   * rotates the players sitting locations
   *
   */
  BridgeDisplay.prototype.rotate = function() {
    offset++;
  }

  return BridgeDisplay;
})();
