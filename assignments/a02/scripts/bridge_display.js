offset = 0;

SUIT_DISPLAY = {
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
};

function displayHand(holderDiv, playerJSON) {

  var toBeInner = `<h2>${playerJSON['title']}</h2>`;
  toBeInner += SUITS.map(function(suit) {
      var toReturn = `<p style="color: ${SUIT_DISPLAY[suit].color};"> ${SUIT_DISPLAY[suit].icon} `;
      if (playerJSON.hand[suit]) {
        for (var card of playerJSON.hand[suit]) {
          toReturn += `<span class="card-num"> ${card}</span>`;
        }
      }
      toReturn += `</p>`;

      return toReturn;
    })
    .join('\n');

  holderDiv.innerHTML = toBeInner;
}

function defaultDisplay(bridgeHandler, rotate) {
  const DEFAULT_DIVS = [
    "top",
    "right",
    "bottom",
    "left"
  ];

  if (rotate) {
    offset++;
  }

  for (var i = 0; i < DEFAULT_DIVS.length; i++) {
    displayHand(document.getElementById(DEFAULT_DIVS[(i + offset) % DEFAULT_DIVS.length]),
      bridgeHandler.getPlayer(i));
  }
}
