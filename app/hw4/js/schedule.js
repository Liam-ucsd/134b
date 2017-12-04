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
    let edit = document.getElementById("edit");
    console.log(edit);
    edit.addEventListener("click", function(e) {
        editGame(e, edit);
    });
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

  let yInfo = "<p><b>Previous Game</b></p>";
  let todInfo = editButton + "<p><b>Today's Game</b></p>";
  let tomInfo = "<p><b>Next Upcoming Game</b></p>"

  if(lastGame != "N/A") {
      let yDate = new Date(lastGame['gameDate'] + " " + lastGame['gameTime']).toLocaleString();
      yInfo += "<p>" + yDate + "</p>";
      yInfo += "<p>" + lastGame['loca'] + "</p>";
      yInfo += "<p>Team Name Here vs. " + lastGame['opp'] + "</p>";
      yInfo += "<h3>" + lastGame['homeScore'] + " : " + lastGame['awayScore'] + "</h3>";
      yInfo += (lastGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";
  } else {
      yInfo += "<p>N/A</p>"
  }

  let todDate = new Date(currGame['gameDate'] + " " + currGame['gameTime']).toLocaleString();
  todInfo += "<p id=\"" + currGame['gameDate'] + "\">" + todDate + "</p>";
  todInfo += "<p>" + currGame['loca'] + "</p>";
  todInfo += "<p>Team Name Here vs. " + currGame['opp'] + "</p>";
  todInfo += (currGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";

  if(nextGame != "N/A") {
      let tomDate = new Date(nextGame['gameDate'] + " " + nextGame['gameTime']).toLocaleString();
      tomInfo += "<p>" + tomDate + "</p>";
      tomInfo += "<p>" + nextGame['loca'] + "</p>";
      tomInfo += "<p>Team Name Here vs. " + nextGame['opp'] + "</p>";
      tomInfo += (nextGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";
  } else {
      tomInfo += "<p>N/A</p>"
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
