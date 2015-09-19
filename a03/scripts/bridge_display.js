function displayHand(holderDiv, playerJSON) {
  const SUITS = [
    "hearts",
    "spades",
    "clubs",
    "diamonds"
  ];

  const UNICODE_CARD = {
    "hearts": "&#x2665;",
    "spades": "&#x2660;",
    "clubs": "&#x2663;",
    "diamonds": "&#x2666;"
  };

  var toBeInner = `<h2>${playerJSON['title']}</h2>`;
  toBeInner += SUITS.map(function(suit) {
            return `<p>${UNICODE_CARD[suit]} ${playerJSON[suit]}</p>`
          }).join('\n');

  holderDiv.innerHTML = toBeInner;
}

function defaultDisplay(bridgeHandler) {
  const DEFAULT_DIVS = [
    "top",
    "bottom",
    "right",
    "left"
  ];

  for (var i = 0; i < DEFAULT_DIVS.length; i++) {
    displayHand(document.getElementById(DEFAULT_DIVS[i]), bridgeHandler.getPlayer(i));
  }
}
