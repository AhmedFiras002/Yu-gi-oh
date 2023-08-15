"use strict";
document.addEventListener('DOMContentLoaded',init);
let typePlayer1;
let typePlayer2;
let ratingPlayer1;
let ratingPlayer2;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJYRQUEMcO03ZeuF4bTjuRwx_TvzmqIAk",
  authDomain: "ygluck-1b2c3.firebaseapp.com",
  projectId: "ygluck-1b2c3",
  storageBucket: "ygluck-1b2c3.appspot.com",
  messagingSenderId: "64905646056",
  appId: "1:64905646056:web:2a71be5ead997563b1de5d",
  measurementId: "G-JPH75990S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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

    if(ratingPlayer1>ratingPlayer2){
        scorePlayer1++;
        let container = document.querySelector("#player1-points");
        container.innerHTML="";
        container.insertAdjacentHTML("beforeend","points: "+scorePlayer1)
    }else if(ratingPlayer1<ratingPlayer2){
        scorePlayer2++
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