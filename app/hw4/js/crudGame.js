'use strict';

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  } else {
    if(window.location.href.indexOf('hw4/GameBootstrap.html') != -1) {
      showStats();
    }
    if(window.location.hash) {
      editDelete();
    }
  }
}

function addGame(toDelete){
  if(toDelete == true) {
    delGame(false);
  }
  let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : {};
  let opp = document.getElementById('oppName').value;
  let gameDate = document.getElementById('gameDate').value;
  let gameTime = document.getElementById('gameTime').value;
  let loca = document.getElementById('loca').value;
  let isHome = (document.getElementById('homeGame').checked == true);
  console.log(isHome);
  if(games[gameDate]){
    console.log("time conflict");
    alert('Time Conflict: a game is already scheduled for that date. Please reschedule and try again.');
  } else{
    games[gameDate] = {
      opp : opp,
      gameDate : gameDate,
      gameTime : gameTime,
      loca : loca,
      isHome : isHome,
      finished: false,
      homeScore: 0,
      awayScore: 0
    }
    localStorage.setItem('games', JSON.stringify(games));
    window.location.replace('./Schedule.html');
  }
}

function showStats() {
    let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : null;
    if(games != null) {
        let nextGame = "";
        let homeTotal = 0;
        let awayTotal = 0;
        let wins = 0;
        let losses = 0;
        let ties = 0;

        let dates = [];
        for(var date in games) {
            dates.push(date);
        }
        dates.sort();

        for(var i = 0; i < dates.length; i++) {
            let game = games[dates[i]];
            if(game['finished']) {
                if(game['homeScore'] > game['awayScore']) {
                    wins++;
                } else if(game['homeScore'] < game['awayScore']){
                    losses++;
                } else {
                    ties++;
                }

                homeTotal += game['homeScore'];
                awayTotal += game['awayScore'];
                
            } else {
                nextGame = games[dates[i]];
                break;
            }
        }

        let winDiv = document.getElementById("wins");
        let lossDiv = document.getElementById("losses");
        let tieDiv = document.getElementById("ties");

        let homeDiv = document.getElementById("for");
        let againstDiv = document.getElementById("against");

        let nextDiv = document.getElementById("next");

        let nextInfo = "<p><b>Next Game</b></p>";
        let nextDate = new Date(nextGame['gameDate'] + " " + nextGame['gameTime']).toLocaleString();
        nextInfo += "<p>" + nextDate + "</p>";
        nextInfo += "<p>" + nextGame['loca'] + "</p>";
        nextInfo += "<p>Team Name Here vs. " + nextGame['opp'] + "</p>";
        nextInfo += (nextGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";

        nextDiv.innerHTML = nextInfo;

        winDiv.innerHTML = "<h2>" + wins + "</h2>";
        lossDiv.innerHTML = "<h2>" + losses + "</h2>";
        tieDiv.innerHTML = "<h2>" + ties + "</h2>";

        homeDiv.innerHTML = "<h2>" + homeTotal + "</h2>";
        againstDiv.innerHTML = "<h2>" + awayTotal + "</h2>";
    }


}

function editDelete() {
  let title = document.getElementById("title");
  title.innerHTML = "Edit or Delete a Match";
  
  console.log(window.location.hash);
  let delBtn = document.createElement("button");
  delBtn.className = "btn btn-primary";
  delBtn.type = "button";
  delBtn.addEventListener("click", function(e) {
        delGame(true);
    });
  delBtn.innerHTML = "Delete Game";

  let cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-primary";
  cancelBtn.type = "button";
  cancelBtn.addEventListener("click", function(e) {
        sched();
    });
  cancelBtn.innerHTML = "Cancel";

  let editBtn = document.getElementById("add");
  editBtn.innerHTML = "Save Changes";
  editBtn.onclick = function(){addGame(true)};
  editBtn.parentNode.appendChild(delBtn);
  editBtn.parentNode.appendChild(cancelBtn);
}

function delGame(willRedirect) {
  let hash = window.location.hash;
  hash = hash.substring(1);
  let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : null;
  console.log(games);
  if(games != null) {
    delete games[hash];
    localStorage.setItem('games', JSON.stringify(games));
  }
  if(willRedirect == true) {
    sched();
  }
}

function sched() {
  window.location.replace('./Schedule.html');
}