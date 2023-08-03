"use strict"
document.addEventListener('DOMContentLoaded',init);
let type;
let randomNumber = Math.floor(Math.random() * 7774);
 function init(){
    document.querySelector("#draw").addEventListener('click',function(){
        getCards()
        
    } );
}

function nav(){}
function getCards(){
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(resp=>resp.json())
    .then(json=>renderCards(json))
    .catch(error => console.error(error));
}
function renderCards(json){console.log();
   let filterCardsType = json.data.filter(x=>x.type.includes('Monster'));
   let filterCardsRating = filterCardsType.filter(y=>y.atk || y.def > 0);
   let picture = filterCardsRating[randomNumber].card_images[0].image_url; 
        let container = document.querySelector('#container');
        let img = `<img src="${picture}" alt="">`
       container.insertAdjacentHTML('beforeend',img)
       document.querySelector("#attacking").addEventListener('click',function(){
       
       })
       document.querySelector("#defending").addEventListener('click',function(){
         return json.data[randomNumber].def;
       })
}