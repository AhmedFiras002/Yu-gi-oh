"use strict"
document.addEventListener('DOMContentLoaded',init);
function init(){
    console.log('hi');
    getCards()
}
function getCards(){
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(resp=>resp.json())
    .then(json=>renderCards(json))
}
function renderCards(json){
    console.log(json);
}