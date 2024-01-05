function cardCheck(){
    if(pot() != 0){
        console.log("It isn't preflop");
        return null;
    }
    var cardDivs = document.querySelectorAll('.card');
    const cards = [];
    if(cardDivs){
        for (var i = 0; i < cardDivs.length; i++) {
            var cardDiv = cardDivs[i];
            if(cardDiv){
                var valueSpan = cardDiv.querySelector('.value');
                var suitSpan = cardDiv.querySelector('.suit');
                if (valueSpan) {
                    cards.push(valueSpan.textContent + suitSpan.textContent);
                } else {
                    console.log("Value span not found in a card div");
                }
            }
        }
        return cards
    }
    else{
        console.log("Cards not found");
    }
}

function fold(){
    var highlightedbutton = document.querySelector('.button-1.with-tip.fold.red.highlighted');
    if(highlightedbutton){
        console.log("F already pressed");
        return true;
    }
    var button = document.querySelector('.button-1.with-tip.fold.red');
    if (button) {
        button.click();
        console.log("Fold clicked!");
        return true;
    } else {
        console.log("Fold not found");
        return false;
    }
}

function checkFold(){
    var highlightedbutton = document.querySelector('.button-1.with-tip.check-fold.suspended-action.highlighted');
    if(highlightedbutton){
        console.log("XF already pressed");
        return true;
    }
    var button = document.querySelector('.button-1.with-tip.check-fold.suspended-action');
    if (button) {
        button.click();
        console.log("XF clicked!");
        return true;
    } else {
        console.log("XF not found");
        return false;
    }
}

function check(){
    var highlightedbutton = document.querySelector('.button-1.with-tip.check.green.highlighted');
    if(highlightedbutton){
        console.log("X already pressed");
        return true;
    }
    var button = document.querySelector('.button-1.with-tip.check.green');
    if (button) {
        if(button.disabled){
            return false;
        }
        button.click();
        console.log("X clicked!");
        return true;
    } else {
        console.log("X not found");
        return false;
    }
}

function generateFolds(){
    const both = [['2','3'], ['2','4'], ['2','5'], ['2','6'], ['2','7'], ['2','8'], ['2','9'], ['2','10'],  ['2', 'J'], ['2', 'Q'], ['2','K'],
           ['3', '5'], ['3','6'], ['3','7'], ['3','8'], ['3','9'], ['3','10'], ['3', 'J'], ['3', 'Q'], ['3','K'],
            ['4', '7'], ['4','8'], ['4','9'], ['4', '10'], ['4', 'J'], ['4', 'Q'], ['4','K'],
            ['5', '8'], ['5','9'], ['5', 'J'], ['5', 'Q'],
            ['6', '9'], ['6', '10'], ['6', 'Q']];
    const suit = ['s', 'c', 'h', 'd'];
    const suits = suit.flatMap(s1 => suit.map(s2 => s1 + s2));

    const offsuitOnly = [];
    // console.log(suits);
    const hands = [];
    for (const i of both) {
        for (const j of suits) {
            const hand = [];
            hand.push(i[0] + j[0]);
            hand.push(i[1] + j[1]);
            hands.push(hand);
        }
    }
    return hands
}

function tester(){
    console.log("Okeh");
}

function sleep(ms, callback) {
    setTimeout(callback, ms);
  }

function pot(){
    var potSize = document.querySelector(".table-pot-size");
    if(potSize){
        return parseInt(potSize.querySelector('.normal-value').textContent);
    }
    else{
        console.log("pot size not found :(");
        return -1;
    }
}

function main(){
    var flag = true;
    // Checks to make sure we are preflop
    if(pot() === 0){
        const badHands = generateFolds();
        var curhand = cardCheck();
        if(!check()){
            for (let j = 0; j < badHands.length; j++){
                console.log(cardCheck())
                if(curhand.sort().join(',')=== badHands[j].sort().join(',')){
                    flag = false;
                    if(!checkFold()){
                        fold();
                    }
                }
            }
            if(flag){
                console.log("Hand is playable");
            }
        }
    }
}

const el = document.getElementById("Trash");
if (el){
  el.addEventListener("click", main);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "Trash") {
      main();
    }
  });