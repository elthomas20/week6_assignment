console.log("Let's play War!")

class Card {
    constructor(face, suit) {
      this.face = face;
      this.suit = suit;
    }
  }
  
// Define the Deck class
class Deck {
    constructor() {
      this.cards = [];
      let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      let suits = ['S', 'H', 'D', 'C'];
      for (let face of faces) {
        for (let suit of suits) {
          this.cards.push(new Card(face, suit));
        }
     }
     this.shuffle();
    }
      
      
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      } //shuffle code borrowed from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    }
  
    drawCard() {
      return this.cards.pop();
    }
  
    get length() {
      return this.cards.length;
    }

}
  
  /* 
  I needed to create two players.
  Each player needs to play a card.
  They need to gain a point if they had the higher card. 
  Once they play the card, the card needs to be removed from their array.
  */

  class Player {
    constructor(name) {
      this.name = name;
      this.points = 0;
      this.hand = [];
    }
  
    playCard() {
      return this.hand.pop();
    }
  
    addPoints(points) {
      this.points += points;
    }
  
    get score() {
      return this.points;
    }
  
    get handSize() {
      return this.hand.length;
    }
  }
  
  /* Game: The players will play until they are out of cards. 
  The player with the highest card wins. */

  class Game {
    constructor() {
      this.deck = new Deck();
      this.player1 = new Player('Player 1');
      this.player2 = new Player('Player 2');
      this.dealCards();
    }
  
    dealCards() {
      while (this.deck.length > 0) {
        this.player1.hand.push(this.deck.drawCard());
        this.player2.hand.push(this.deck.drawCard());
      }
    }
  
    playTurn() {
      let card1 = this.player1.playCard();
      let card2 = this.player2.playCard();
      let face1 = this.getFaceValue(card1.face);
      let face2 = this.getFaceValue(card2.face);
      
      if (face1 > face2) {
        this.player1.addPoints(1);
      } else if (face1 < face2) {
        this.player2.addPoints(1);
      } else {
        this.player1.addPoints(0);
        this.player2.addPoints(0);
      }
    }
  
    getFaceValue(face) {
      let values = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
      };
      return values[face];
    }
  
    playGame() {
      while (this.player1.handSize > 0 && this.player2.handSize > 0) {
        this.playTurn();
      }
      this.displayScore();
    }


//display the amount of points each player has
    displayScore() {
      console.log(`${this.player1.name}: ${this.player1.score}`);
      console.log(`${this.player2.name}: ${this.player2.score}`);

      if (this.player1.score > this.player2.score){
        console.log("Player 1 has defeated Player 2 in the game of War!")
      } else if (this.player2.score > this.player1.score){
        console.log("Player 2 has defeated Player 1 in the game of War!")
      } else {
        console.log("Looks like these two players have met their match. The game was a tie! Play again to see who will be the true winner of War!")
      }
    }
  }
  
  // Run the game
  let game = new Game();
  game.playGame();