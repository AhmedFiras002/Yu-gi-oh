"use strict";
document.addEventListener('DOMContentLoaded',init);
let typePlayer1;
let typePlayer2;
let ratingPlayer1;
let ratingPlayer2;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
 function init() {
    const buttonsPlayer1 = document.querySelectorAll("#attackingPlayer1, #defendingPlayer1");
    const buttonsPlayer2 = document.querySelectorAll("#attackingPlayer2, #defendingPlayer2");
    
    buttonsPlayer1.forEach(button=>button.addEventListener('click',function(){
        document.querySelector("#attackingPlayer1").classList.add("hidden");
        document.querySelector("#defendingPlayer1").classList.add("hidden");

        if(button.id==="attackingPlayer1"){
            typePlayer1 = "atk"
        }else if(button.id==="defendingPlayer1"){
            typePlayer1 = "def"
        }
        getCards(typePlayer1, 'containerPlayer1');
    
    }));

    buttonsPlayer2.forEach(button=>button.addEventListener('click',function(){
        document.querySelector("#attackingPlayer2").classList.add("hidden");
        document.querySelector("#defendingPlayer2").classList.add("hidden");

        if(button.id==="attackingPlayer2"){
            typePlayer2 = "atk"
        }else if(button.id==="defendingPlayer2"){
            typePlayer2 = "def"
        }
        getCards(typePlayer2, 'containerPlayer2');
    }));
}

function getCards(playerType, containerId){
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(resp=>resp.json())
    .then(json=>renderCards(json, containerId))
    .catch(error => console.error(error));
}

function renderCards(json, containerId){
    let filterCardsType = json.data.filter(x=>x.type.includes('Monster'));
    let filterCardsRating = filterCardsType.filter(y=>y.atk && y.def > 0); 
    let randomNumber = Math.floor(Math.random() * filterCardsRating.length);
    let container = document.querySelector(`#${containerId}`);
    let picture = filterCardsRating[randomNumber].card_images[0].image_url; 
    let img = `<img src="${picture}" alt="">`
    container.insertAdjacentHTML('beforeend',img);
    if (typePlayer1 === "atk"){
        typePlayer1 ="";
        ratingPlayer1 = filterCardsRating[randomNumber].atk;
    } else if(typePlayer1 ==="def"){
        typePlayer1="";
        ratingPlayer1 = filterCardsRating[randomNumber].def;
    }

    if (typePlayer2 === "atk"){
        typePlayer2=""
        ratingPlayer2 = filterCardsRating[randomNumber].atk;
    } else if(typePlayer2 ==="def"){
        typePlayer2=""
        ratingPlayer2 = filterCardsRating[randomNumber].def;
    }
if (ratingPlayer1 !== undefined && ratingPlayer2 !== undefined) {
    gameLogic()
}
}

function gameLogic(){
    console.log(ratingPlayer1);
    console.log(ratingPlayer2);
    if(ratingPlayer1>ratingPlayer2){
        scorePlayer1++;
        let container = document.querySelector("#player1-points");
        container.innerHTML="";
        container.insertAdjacentHTML("beforeend","points: "+scorePlayer1)
        console.log('player 1 win');
    }else if(ratingPlayer1<ratingPlayer2){
        scorePlayer2++
        console.log('player 2 win');
        let container = document.querySelector("#player2-points");
        container.innerHTML="";
        container.insertAdjacentHTML("beforeend","points: "+scorePlayer2)
    }else{}
    document.querySelector("#restart").addEventListener('click',function(){
        ratingPlayer1 = undefined
        ratingPlayer2 = undefined
        document.querySelector("#attackingPlayer1").classList.remove("hidden");
        document.querySelector("#attackingPlayer2").classList.remove("hidden");
        document.querySelector("#defendingPlayer1").classList.remove("hidden");
        document.querySelector("#defendingPlayer2").classList.remove("hidden");
        document.querySelector("#containerPlayer1").innerHTML="";
        document.querySelector("#containerPlayer2").innerHTML="";
    })
}