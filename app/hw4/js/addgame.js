'use strict';

function addGame(){
  let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : {};
  let opp = document.getElementById('oppName').value;
  let gameDate = document.getElementById('gameDate').value;
  let gameTime = document.getElementById('gameTime').value;
  let loca = document.getElementById('loca').value;
  let isHome = document.getElementById('homeGame').value == 'home' ? true : false;
  if(games[gameDate] && games[gameDate]['gameTime'] == gameTime){
    alert('Time Conflict: a game is already scheduled for that date and time. Please reschedule and try again.');
  } else{
    games[gameDate] = {
      opp : opp,
      gameDate : gameDate,
      gameTime : gameTime,
      loca : loca,
      isHome : isHome,
    }
    localStorage.setItem('games', JSON.stringify(games));
    console.log(localStorage);
    window.location.replace("./GameBootstrap.html");
  }
}