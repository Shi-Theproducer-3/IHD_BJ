const startGameBtn = document.querySelector("#start-btn");
const hitBtn = document.querySelector("#hit-btn");
const dealerTotalTxt = document.querySelector("#dealer-ttl"); 
const playerTotalText = document.querySelector("#player-ttl")
const stayBtn = document.querySelector("#stay-btn");
const newHandBtn = document.querySelector("#new-hand");
const dealer = document.querySelector("#dealer");

let dSum = 0;
let pSum = 0;

let dAces = 0;
let pAces = 0;

let dHidden;
let dSecondCard;
let bDeck;

let pCards;
let pHit = true;
let dHit = true;

let won = false;
let push = false;

startGameBtn.addEventListener("click", function() {
  buildDeck();
  shuffle();
  clearDealtCards();
  dealCards();

});

function buildDeck() {
  let cVal = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  let suit = ["PSH","PWH","RMH","RPH"];
  bDeck = [];

  //loop in a loop. loops through cVal first and then loops through suit
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
  for(let k = 0; k < cVal.length; k++) { 
    for(let a = 0; a < suit.length; a++) {
      bDeck.push(cVal[k] + "-" + suit[a]); 
    };
  };
};

function shuffle() {
  for(let k = 0; k < bDeck.length; k++) {
    let a = Math.floor(Math.random()*bDeck.length);
    let temp = bDeck[k];
    bDeck[k] = bDeck[a];
    bDeck[a] = temp;
  };
};



function dealCards() {
  let hiddenImg = document.createElement("img");
  let dShownImg = document.createElement("img");
  hiddenImg.setAttribute("class", "hidden");
  hiddenImg.setAttribute("id", "dealt-cards");
  dShownImg.setAttribute("id", "dealt-cards");
  dHidden = bDeck.pop();
  dSecondCard = bDeck.shift(Math.floor(Math.random()*bDeck.length));
  dSum += findNum(dHidden);
  dAces += checkForAce(dHidden);
  dSum += findNum(dSecondCard);
  dAces += checkForAce(dSecondCard);
  hiddenImg.src = "./cards/Card-Back.png";
  dShownImg.src = "./cards/" + dSecondCard + ".png";
  document.querySelector("#dealer-crds").append(hiddenImg, dShownImg);

  for(let k = 0; k < 2; k++) {
    let cImg = document.createElement("img");
    cImg.setAttribute("id", "dealt-cards");
    pCards = bDeck.pop(Math.floor(Math.random()*bDeck.length));
    cImg.src = "./cards/" + pCards + ".png";
    pSum += findNum(pCards);
    pAces += checkForAce(pCards);
    document.querySelector("#player-crds").append(cImg);
  };

  if (dSum === 21 && dAces === 1 && pSum < 21) {
    words = "R.I.P. That's looking like an ace w/ a big card for me.";
    dealer.textContent = "Dealer: " + words + " On to the next one!";
    stay();
  };
  if (pSum === 21 && pAces === 1 && dSum < 21) {
    stay();
    words = "Black muhhh fu**in Jack, let's go!";
    won = true;
    dealer.textContent = "Dealer: " + words + " Just click New Hand!";
  };
};

hitBtn.addEventListener("click", hit);

function hit() {
  if (!pHit) {
    return;
  };

  let cImg = document.createElement("img");
  cImg.setAttribute("id", "dealt-cards");
  pCards = bDeck.shift();
  cImg.src = "./cards/" + pCards + ".png";
  pSum += findNum(pCards);
  pAces += checkForAce(pCards);
  document.querySelector("#player-crds").append(cImg);

  if(pSum > 21) {
    stay();
  };

  if (reduceCountForAces(pSum, pAces) > 21 && reduceCountForAces(dSum, dAces) > 17) {
    pHit = false;
  };
};

newHandBtn.addEventListener("click", newHand);

function newHand() {
  if(pSum >= 21 || dSum >= 17) {
    clearDealtCards();

    dAces = 0;
    dSum = 0;
    pAces = 0;
    pSum = 0;
    dealerTotalTxt.textContent = "Dealer total:";
    playerTotalText.textContent = "Player total:";
    dealer.textContent = "Dealer:";
    pHit = true;
  
    dealCards();
  }
};

stayBtn.addEventListener("click", stay);

function stay() {
  pHit = false;
  if (pSum === 21 && pAces === 1) {
    dHit = false;
    document.querySelector(".hidden").src = `./cards/${dHidden}.png`
  } else {
    while (dSum < 17 && pSum <= 21) {
      dHit = true;
      let cImg = document.createElement("img");
      cImg.setAttribute("id", "dealt-cards");
      let card = bDeck.shift();
      cImg.src = "./cards/" + card + ".png";
      dSum += findNum(card);
      dAces += checkForAce(card);
      document.querySelector("#dealer-crds").append(cImg);
      reduceCountForAces(dSum,dAces);
    };


    if (reduceCountForAces(dSum,dAces) > 17) {
      dHit = false;
    };

    const dealerSum = reduceCountForAces(dSum, dAces);
    const playerSum = reduceCountForAces(pSum, pAces);

    dealerTotalTxt.textContent += " " + dealerSum;
    playerTotalText.textContent += " " + playerSum;

    document.querySelector(".hidden").src = `./cards/${dHidden}.png`

    if (pSum <= 21 && dSum <= 21 && pSum > dSum) {
      words = "Pulled that one out, ehh?! *Blob*";
      won = true;
    } else if(pSum <= 21 && dSum > 21) {
      words = "Dub...I knew you had it in you!";
      won = true;
    } else if (pSum < dSum && dSum <= 21 && pSum <= 21 && dAces === 0) {
      words = "Better luck next time...*Blob*";
    } else if (pSum === dSum && dSum >= 17 && dSum < 21) {
      words = "That's looking like a push...better than an L!";
      push = true;
    } else if (pSum === 21 && dSum === 21) {
      words = "Not the push on the 21...SHHEEESSHHH...that's unfortunate. *Blob*";
      push = true;
    } else if (pSum === 21 && dSum !== 21) {
      words = "You love to see it! Winners galore";
      gameWinner = true
    } else {
      words = "You got 'em next time!";
    };

    dealer.textContent = "Dealer: " + words;
  }
};

function findNum(card) {
  let cardData = card.split("-"); //.split simply splits "card" into an array at the "-"
  let hNum = cardData[0];

  if (isNaN(hNum)) { //if hNum is not a number- run code
    if (hNum==="A") {
      return 11;
    } else {
      return 10;
    };

  } 
  return parseInt(hNum); //if hNum is a number- return that number
};

function checkForAce(card) {
  if (card[0] === "A") {
    return 1;
  }
  return 0;
};

function reduceCountForAces( sum, aces) {
  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces -= 1;
  }
  return sum;
};

function clearDealtCards() {
  let dealtCards = document.getElementsByTagName("img");
  while(dealtCards.length > 0) {
  dealtCards[0].parentNode.removeChild(dealtCards[0]);
  };
};
