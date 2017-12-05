'use strict';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXqXv30flt8Xh7bga-wG7IaOGULMaLZ-4",
  authDomain: "cse-134b-cfd78.firebaseapp.com",
  databaseURL: "https://cse-134b-cfd78.firebaseio.com",
  projectId: "cse-134b-cfd78",
  storageBucket: "",
  messagingSenderId: "996134578305"
};
firebase.initializeApp(config);

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  } else {
    if(window.location.href.indexOf('hw4/GameBootstrap.html') != -1) {
      getStats();
    }
    if(window.location.hash) {
      editDelete();
    }
  }
}

function addGame(){
  let opp = document.getElementById('oppName').value;
  let gameDate = document.getElementById('gameDate').value;
  let gameTime = document.getElementById('gameTime').value;
  let loca = document.getElementById('loca').value;
  let isHome = (document.getElementById('homeGame').checked == true);

  if(window.location.hash) {
    delGame(false);
  }

  firebase.database().ref('games').child(gameDate).set({
    opp : opp,
    gameDate : gameDate,
    gameTime : gameTime,
    loca : loca,
    isHome : isHome,
    finished: false,
    homeScore: 0,
    awayScore: 0
  }).then(function() {
    window.location.replace('Schedule.html');
  });
}

function getStats() {
  let dates = firebase.database().ref('games').orderByKey().once('value').then(function(snapshot) {
    showStats(snapshot.val());
  });
}
function showStats(data) {
  let nextGame = "";
  let homeTotal = 0;
  let awayTotal = 0;
  let wins = 0;
  let losses = 0;
  let ties = 0;

  /*tallies up win/loss/tie record and total goals for/against. As games are
   *sorted in ascending date order we know that the first game to not be finished
   *will be the next game to occur in the schedule.
   */
  for(var gameID in data) {
    let game = data[gameID];
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
      nextGame = game;
      break;
    }
  }

  //updates all appropriate data fields on the page
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


function editDelete() {
  let title = document.getElementById("title");
  title.innerHTML = "Edit or Delete a Match";

  console.log(window.location.hash);
  let delBtn = document.createElement("button");
  delBtn.className = "btn btn-primary";
  delBtn.type = "button";
  delBtn.onclick =  function() {
        delGame(true);
    };
  delBtn.innerHTML = "Delete Game";

  let cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-primary";
  cancelBtn.type = "button";
  cancelBtn.onclick = function(){
    window.location.replace('Schedule.html');
  };
  cancelBtn.innerHTML = "Cancel";

  let editBtn = document.getElementById("add");
  editBtn.innerHTML = "Save Changes";
  editBtn.onclick = function(){
    addGame();
  };
  editBtn.parentNode.appendChild(delBtn);
  editBtn.parentNode.appendChild(cancelBtn);
}

function delGame(reloc) {
  let hash = window.location.hash;
  hash = hash.substring(1);
  firebase.database().ref('games').child(hash).set(null).then(function() {
    if(reloc == true) {
      window.location.replace('Schedule.html');
    }
  });

}


function logoutUser(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('signed out');
    sessionStorage.clear();
  }).catch(function(error) {
    // An error happened.
    console.log('failed to sign out!');
  });
}
