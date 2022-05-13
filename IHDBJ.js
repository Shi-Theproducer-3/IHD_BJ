const playerSum = document.querySelector("#player-ttl");
const dealerSum = document.querySelector("#dealer-ttl");
const playerCards = document.querySelector("#player-crds");
const dealerCards = document.querySelector("#dealer-crds");
const dealer = document.querySelector("#dealer");
let dealerCardOne = randomCard();
let dealerCardTwo = randomCard();
let playerCardOne = randomCard();
let playerCardTwo = randomCard();
let dSum = dealerCardOne + dealerCardTwo;
let pSum = playerCardOne + playerCardTwo;
let pCards = [playerCardOne,playerCardTwo];
let dCards = [dealerCardOne,dealerCardTwo];
let dealerMSG = "Dealer:"
let alive = true;
let gameWinner = false;
let push = false;

function startBJ() {
  currentBJ();
};

function randomCard() {
  return Math.floor(Math.random(Math.random()+1)*14)+1;
}

function currentBJ() {
  playerCards.textContent = "";
  dealerCards.textContent = "";

  for(let k = 0; k < pCards.length; k++) {
    playerCards.textContent += pCards[k] + " ";
  };
  for(let k = 0; k < dCards.length; k++) {
    dealerCards.textContent += dCards[k] + " ";
  };

  if (pSum < 21 && dSum < 21) {
    words = "Another one?! *Blob*";
  } else if(pSum <= 21 && dSum > 21) {
    words = "Dub...I knew you had it in you!";
    gameWinner = true;
  } else if (pSum < dSum && dSum >= 17 && dSum <= 21) {
    words = "Better luck next time";
    alive = false;
  } else if (pSum === dSum && pSum >= 17 && pSum < 21 && dSum >= 17 && dSum < 21) {
    words = "That's looking like a push...push is a slight win!";
    push = true;
  } else if (pSum === 21 && dSum === 21) {
    words = "Not the push on the 21...SHHEEESSHHH...that's unfortunate. *Blob*";
    push = true;
  } else if (pSum > dSum && pSum < 21 && dSum >= 17 && dSum !== 21) {
    words = "Winner, Winner, Chicken dinner!";
    gameWinner = true;
  } else if (pSum === 21 && dSum !== 21) {
    words = "You love to see it! Winners galore";
    gameWinner = true
  } else {
    words = "You got 'em next time!";
    alive = false;
  };

  dealer.textContent = dealerMSG + " " + words;
  playerSum.textContent = "Player total: " + pSum;
  dealerSum.textContent = "Dealer total: " + dSum;
};

function hit() {
  let newPCard = randomCard();
  pSum += newPCard;
  pCards.push(newPCard);
  currentBJ();
};

function stay() {
  if (dSum < 17 && pSum <= 21) {
    dHit();
    words = "Here I go"
  } else {
    undefined;
  }
}

function dHit() {
  let newDCard = randomCard();
  dSum += newDCard;
  dCards.push(newDCard);
  currentBJ();
}

  /*if (pSum < 17 && dSum < 21) {
    words = "Another card? *Blob*";
  } else if (pSum === 21 && dSum !== 21) {
    words = "Oh my *Blob*...you got 21";
    gameWinner = true;
  } else if (dSum === 21 && pSum === 21) {
    words = "Push on 21...sheesh, you got the next one! *Blob*";
    push = true;
  } else if (dSum === pSum && dSum >= 17 && pSum >= 17 ) {
    words = "Push...at least it's not a loss *Blob*";
    push = true;
  } else if (dSum > 21 && pSum <= 21) {
    words = "Well...there I go busting again, looks like you're a winner!";
    gameWinner = true;
  } else if (pSum > dSum && pSum >= 17 && dSum >= 17) {
    words = "That's a dub...*Blob*";
    gameWinner = true;
  } else {
    words = "R.I.P.";
    alive = false;
  };
*/