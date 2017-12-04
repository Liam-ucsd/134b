'use strict'

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

function addPlayer(){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let goals = document.getElementById('goals').value;
  let assists = document.getElementById('assists').value;
  let gamesPlayed = document.getElementById('gamesPlayed').value;
  //we get the array of players
  let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  //add to beginning of array
  if(roster.unshift(
    {
      name : name,
      position : position,
      jnumber : jnumber,
      birthday : birthday,
      height : height,
      weight : weight,
      goals : goals,
      assists : assists,
      gamesPlayed : gamesPlayed
    }
  )){
    localStorage.setItem('roster', JSON.stringify(roster));
    // console.log('added player successfully!\n');
  } else{
    // console.log('failed to add player\n');
  }
  // console.log(roster);
  // console.log(localStorage);
  window.location.replace('./Player.html');
}

function renderAddPlayerForm(){
  document.getElementById('content').textContent = '';
  let addPlayerForm = document.getElementById('addPlayerForm').content;
  document.getElementById('content').appendChild(addPlayerForm);
}

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  }
};

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
