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
    fetchGames();
  }
}
function fetchGames() {
  let dates = firebase.database().ref('games').orderByKey().once('value').then(function(snapshot) {
    displayGames(snapshot.val());
  });
}
function displayGames(data) {
  let lastGame = "N/A";
  let currGame = "N/A";
  let nextGame = "N/A";
  let foundCurr = false;


  //find the next upcoming game as well as previous and future game
  for(var date in data) {
    let game = data[date];
    if(!game['finished']) {
      if(foundCurr == true) {
        nextGame = game;
        break;
      }
      currGame = game;
      foundCurr = true;
    } else {
      lastGame = game;
    }
  }

  //display the games in order with floating edit button
  let editButton = "<div style=\"float: right\"><button type=\"button\" id=\"edit\" class=\"btn btn-primary\" onclick=\"editGame()\">edit</button></div>";
  let yesterday = document.getElementById('yesterday');
  let today = document.getElementById('today');
  let tomorrow = document.getElementById('tomorrow');

  let yInfo = "<h2><b>Previous Game</b></h2>";
  let todInfo = editButton + "<h2><b>Today's Game</b></h2>";
  let tomInfo = "<h2><b>Next Upcoming Game</b></h2>"

  if(lastGame != "N/A") {
      let yDate = new Date(lastGame['gameDate'] + " " + lastGame['gameTime']).toLocaleString();
      yInfo += "<h2>" + yDate + "</h2>";
      yInfo += "<h2>" + lastGame['loca'] + "</h2>";
      yInfo += "<h2>Team Name Here vs. " + lastGame['opp'] + "</h2>";
      yInfo += "<h2>" + lastGame['homeScore'] + " : " + lastGame['awayScore'] + "</h2>";
      yInfo += (lastGame['isHome'] == true) ? "<h2>Home Game</h2>" : "<h2>Away Game</h2>";
  } else {
      yInfo += "<h2>N/A</h2>"
  }

  let todDate = new Date(currGame['gameDate'] + " " + currGame['gameTime']).toLocaleString();
  todInfo += "<h2 id=\"" + currGame['gameDate'] + "\">" + todDate + "</h2>";
  todInfo += "<h2>" + currGame['loca'] + "</h2>";
  todInfo += "<h2>Team Name Here vs. " + currGame['opp'] + "</h2>";
  todInfo += (currGame['isHome'] == true) ? "<h2>Home Game</h2>" : "<h2>Away Game</h2>";

  if(nextGame != "N/A") {
      let tomDate = new Date(nextGame['gameDate'] + " " + nextGame['gameTime']).toLocaleString();
      tomInfo += "<h2>" + tomDate + "</h2>";
      tomInfo += "<h2>" + nextGame['loca'] + "</h2>";
      tomInfo += "<h2>Team Name Here vs. " + nextGame['opp'] + "</h2>";
      tomInfo += (nextGame['isHome'] == true) ? "<h2>Home Game</h2>" : "<h2>Away Game</h2>";
  } else {
      tomInfo += "<h2>N/A</h2>"
  }

  yesterday.innerHTML = yInfo;
  today.innerHTML = todInfo;
  tomorrow.innerHTML = tomInfo;
}

//bring user to edit page associated with correct game
function editGame() {
    console.log("got here first!")
    let edit = document.getElementById("edit");
    let nodes = edit.parentNode.parentNode.childNodes;
    let toEdit = nodes[2].id;
    console.log("got here!");
    window.location.href = "./AddGame.html#" + toEdit;
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
