
Assignment: Bridge Hands

Create a web page that displays randomly generated bridge deals. Bridge deals should be displayed in a format like this:
	NORTH
S A 4 3
H K Q J 10
D K 5 2
C 9 8 7
WEST
S Q J 10
H A
D 10 8 7 6 4
C J 4 3 2 		EAST
S 9 8 7 6 2
H 9 8 7 6 2
D
C 10 6 5
	SOUTH
S K 5
H 5 4 3
D A Q J 9 3
C A K Q

    Note that each deal consists of four hands, labelled "North", "East", "South" and "West". When a deal is displayed, North, should be at the top, East, to the right, etc.
    Each time the page is loaded it should display a new deal.
    The page should provide a button that deals a new hand, but should do so without forcing the browser to reload the page.
    You should provide a limited version of playing the cards, one trick at a time, by allowing the user to click on cards to play the to the current trick.
    Your source code should be formatted so that it is easily readable: use indentation, etc.

Notes on bridge hands:

Bridge is played with a standard deck of 52 cards. Such a deck consists of 4 suits: spades (S), hearts (H), diamonds (D), and clubs (C). Each suit consists of 13 cards labelled 2,3,4,5,6,7,8,9,10, J, Q, K, A.) Hands are formed by dealing the entire deck out evenly among four players, usually labelled "North", "East", "South" and "West" in the bridge literature. Thus each player ends up with 13 (uniformly) randomly selected cards, and the union of the cards in the four hands (NSEW) should form a complete deck of 52 cards. Because the cards are dealt randomly, you cannot make any assumptions about the distribution of cards within any particular player's hand. A player might have 10 spades, 1 heart, 0 diamonds and 2 clubs, for example (this would be an exceedingly unlikely distribution, but it is possible,) or they might have 4 spades, 2 hearts, 4 diamonds and 3 clubs. Your code should be able to handle any distribution.

The suits of each hand are displayed in the order shown: spades on top, followed by hearts, diamonds and then clubs. Each suit should be ordered: A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2, as shown in the example above (this is called "rank ordering").

Bridge is played in a sequence of 13 "tricks". Each trick consists of exactly one card being played from each of the hands. There are rules concerning which hand should play the first card in a trick, and about "following suit", but you needn't worry about those in this implementation. For the default implementation, the user should be able to "play" a card from any of the four hands to start a trick by clicking on that card. The card should be deleted from its hand (the remaining cards, if any, in its suit sliding to the left to occupy the space vacated by the card that was clicked upon. The played card should then appear in the center of the four hands. The user will then need to play one card from each of the remaining hands in order to complete the trick. Below is an example of what your display might look like after one trick is completed.
	NORTH
S A 4 3
H K Q J 10
D 5 2
C 9 8 7
WEST
S Q J 10
H A
D 8 7 6 4
C J 4 3 2 	
  	DK 	 
D10 	  	C10
  	DA 	 
	EAST
S 9 8 7 6 2
H 9 8 7 6 2
D
C 6 5
	SOUTH
S K 5
H 5 4 3
D Q J 9 3
C A K Q

    Once a hand has played a card to the trick, clicking on any other cards in that hand should be ignored until the trick is complete. After four cards have been played, the trick is complete. The user starts the next trick by clicking (i.e., "playing") any card from any hand. When this occurs, delete the four cards from the previous trick from the center of the hands.
    Submitting Your Page:

    Submit your several files as a zip file to the dropbox. Make sure you include in your zip file all the .html files, as well as any image files (.gif and .jpg, for example) that your page references and any external style sheets or .js files. The main .html file (the one I will access with my browser) should be called bridge.html. Don't forget this!
    Hints:

    There are a number of ways to solve this. I suggest displaying each hand in a <div> having position properties. Each div should have an id for access by JS. In each <div> you might place four <span>, one for each suit. In those spans, you might place a separate span around each card, allowing for pick correlation with the cursor.

    Other approaches involve using 4 text boxes (<input type="text">) for each hand, or using tables.

    See the section in Chapter 6, Dynamic Content, in the textbook for how to redeal the hands and handle the mouse clicks.
    How to Proceed:

    Start by displaying a single hand. The onload event can be used to set the value of the hand. The exact method will vary with the approach that you take.

    Now try to get all four hands to display, but don't worry about positioning the hands in a "circle".

    Next, position the hands into a "circle" by using the position, left, and top properties.

    Next, add a button that "redeals" the hands.

    Add the ability to play (click on) cards only after you get a single deal to display properly.
    Bridge is a Great Game:

    If you are interested in bridge, there is a huge amount of on-line and written literature on the subject. A good starting place is the web site for the American Contract Bridge League (ACBL). There is a link from there to a number of places where you can play bridge on-line with tens of thousands of players.
