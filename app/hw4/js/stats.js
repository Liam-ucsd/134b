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

let playerStats = [
  {
    jnumber : 1,
    name : 'John Smith',
    foul : 0,
    redCard : 1,
    yellowCard : 1,
    shotsOnGoal : 1,
    goals : 0,
    cornerKicks : 0,
    goalKicks : 1,
    penaltyKicks : 1,
    throwIns : 0,
    appearances : 1
  },
  {
    jnumber : 22,
    name : 'Jonny Smitten',
    foul : 0,
    redCard : 1,
    yellowCard : 1,
    shotsOnGoal : 1,
    goals : 0,
    cornerKicks : 0,
    goalKicks : 1,
    penaltyKicks : 1,
    throwIns : 0,
    appearances : 1
  },
  {
    jnumber : 101,
    name : 'Yohann Smot',
    foul : 0,
    redCard : 1,
    yellowCard : 1,
    shotsOnGoal : 1,
    goals : 0,
    cornerKicks : 0,
    goalKicks : 1,
    penaltyKicks : 1,
    throwIns : 0,
    appearances : 1
  }
];

function getStats(){
  playerStats.forEach(function(player){
    let playerNamesTemplate = document.getElementById('playerNamesTemplate').content.cloneNode(true);
    let playerStatsTemplate = document.getElementById('playerStatsTemplate').content.cloneNode(true);
    playerNamesTemplate.querySelector('.jnumber').textContent = '#' + player.jnumber;
    playerNamesTemplate.querySelector('.name').textContent = player.name;
    document.getElementById('playerNames').appendChild(playerNamesTemplate);
    playerStatsTemplate.querySelector('.foul').textContent = player.foul;
    playerStatsTemplate.querySelector('.redCard').textContent = player.redCard;
    playerStatsTemplate.querySelector('.yellowCard').textContent = player.yellowCard;
    playerStatsTemplate.querySelector('.shotsOnGoal').textContent = player.shotsOnGoal;
    playerStatsTemplate.querySelector('.goals').textContent = player.goals;
    playerStatsTemplate.querySelector('.cornerKicks').textContent = player.cornerKicks;
    playerStatsTemplate.querySelector('.goalKicks').textContent = player.goalKicks;
    playerStatsTemplate.querySelector('.penaltyKicks').textContent = player.penaltyKicks;
    playerStatsTemplate.querySelector('.throwIns').textContent = player.throwIns;
    playerStatsTemplate.querySelector('.appearances').textContent = player.appearances;
    document.getElementById('playerStats').appendChild(playerStatsTemplate);
  });
}

window.onload = () => {
  getStats();
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
