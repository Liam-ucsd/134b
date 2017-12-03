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

// let playerStats = [
//   {
//     jnumber : 1,
//     name : 'John Smith',
//     foul : 0,
//     redCard : 1,
//     yellowCard : 1,
//     shotsOnGoal : 1,
//     goals : 0,
//     cornerKicks : 0,
//     goalKicks : 1,
//     penaltyKicks : 1,
//     throwIns : 0,
//     appearances : 1
//   },
//   {
//     jnumber : 22,
//     name : 'Jonny Smitten',
//     foul : 0,
//     redCard : 1,
//     yellowCard : 1,
//     shotsOnGoal : 1,
//     goals : 0,
//     cornerKicks : 0,
//     goalKicks : 1,
//     penaltyKicks : 1,
//     throwIns : 0,
//     appearances : 1
//   },
//   {
//     jnumber : 101,
//     name : 'Yohann Smot',
//     foul : 0,
//     redCard : 1,
//     yellowCard : 1,
//     shotsOnGoal : 1,
//     goals : 0,
//     cornerKicks : 0,
//     goalKicks : 1,
//     penaltyKicks : 1,
//     throwIns : 0,
//     appearances : 1
//   }
// ];

function getStats(){
  document.getElementById('content').textContent = '';
  let statsTemplate = document.getElementById('statsTemplate').content.cloneNode(true);
  document.getElementById('content').appendChild(statsTemplate);
  firebase.database().ref('stats').once('value')
  .then(function(players){
    players.forEach(function(player){
      let playerNamesTemplate = document.getElementById('playerNamesTemplate').content.cloneNode(true);
      let playerStatsTemplate = document.getElementById('playerStatsTemplate').content.cloneNode(true);
      playerNamesTemplate.querySelector('.jnumber').textContent = '#' + player.val().jnumber;
      playerNamesTemplate.querySelector('.name').textContent = player.val().name;
      document.getElementById('playerNames').appendChild(playerNamesTemplate);
      playerStatsTemplate.querySelector('.foul').textContent = player.val().foul;
      playerStatsTemplate.querySelector('.redCard').textContent = player.val().redCard;
      playerStatsTemplate.querySelector('.yellowCard').textContent = player.val().yellowCard;
      playerStatsTemplate.querySelector('.shotsOnGoal').textContent = player.val().shotsOnGoal;
      playerStatsTemplate.querySelector('.goals').textContent = player.val().goals;
      playerStatsTemplate.querySelector('.cornerKicks').textContent = player.val().cornerKicks;
      playerStatsTemplate.querySelector('.goalKicks').textContent = player.val().goalKicks;
      playerStatsTemplate.querySelector('.penaltyKicks').textContent = player.val().penaltyKicks;
      playerStatsTemplate.querySelector('.throwIns').textContent = player.val().throwIns;
      playerStatsTemplate.querySelector('.appearances').textContent = player.val().appearances;
      playerStatsTemplate.querySelector('#renderEditStatsFormButton').addEventListener('click',() => renderEditStatsForm(player.val(), player.key));
      document.getElementById('playerStats').appendChild(playerStatsTemplate);
    });
  });
  // playerStats.forEach(function(player){
  //   let playerNamesTemplate = document.getElementById('playerNamesTemplate').content.cloneNode(true);
  //   let playerStatsTemplate = document.getElementById('playerStatsTemplate').content.cloneNode(true);
  //   playerNamesTemplate.querySelector('.jnumber').textContent = '#' + player.jnumber;
  //   playerNamesTemplate.querySelector('.name').textContent = player.name;
  //   document.getElementById('playerNames').appendChild(playerNamesTemplate);
  //   playerStatsTemplate.querySelector('.foul').textContent = player.foul;
  //   playerStatsTemplate.querySelector('.redCard').textContent = player.redCard;
  //   playerStatsTemplate.querySelector('.yellowCard').textContent = player.yellowCard;
  //   playerStatsTemplate.querySelector('.shotsOnGoal').textContent = player.shotsOnGoal;
  //   playerStatsTemplate.querySelector('.goals').textContent = player.goals;
  //   playerStatsTemplate.querySelector('.cornerKicks').textContent = player.cornerKicks;
  //   playerStatsTemplate.querySelector('.goalKicks').textContent = player.goalKicks;
  //   playerStatsTemplate.querySelector('.penaltyKicks').textContent = player.penaltyKicks;
  //   playerStatsTemplate.querySelector('.throwIns').textContent = player.throwIns;
  //   playerStatsTemplate.querySelector('.appearances').textContent = player.appearances;
  //   document.getElementById('playerStats').appendChild(playerStatsTemplate);
  // });
}

function renderEditStatsForm(player, key){
  document.getElementById('content').textContent = '';
  let editStatsForm = document.getElementById('editStatsForm').content.cloneNode(true);
  editStatsForm.querySelector('#jnumber').value = player.jnumber;
  editStatsForm.querySelector('#name').value = player.name;
  editStatsForm.querySelector('#foul').value = player.foul;
  editStatsForm.querySelector('#redCard').value = player.redCard;
  editStatsForm.querySelector('#yellowCard').value = player.yellowCard;
  editStatsForm.querySelector('#shotsOnGoal').value = player.shotsOnGoal;
  editStatsForm.querySelector('#goals').value = player.goals;
  editStatsForm.querySelector('#cornerKicks').value = player.cornerKicks;
  editStatsForm.querySelector('#goalKicks').value = player.goalKicks;
  editStatsForm.querySelector('#penaltyKicks').value = player.penaltyKicks;
  editStatsForm.querySelector('#throwIns').value = player.throwIns;
  editStatsForm.querySelector('#appearances').value = player.appearances;
  editStatsForm.querySelector('#editStatsButton').addEventListener('click',() => editStats(key));
  document.getElementById('content').appendChild(editStatsForm);
}

function editStats(key){
  let updatedStats = {};
  let updatedProfileStats = {};
  updatedStats.jnumber = document.getElementById('jnumber').value;
  updatedProfileStats.jnumber = document.getElementById('jnumber').value;
  updatedStats.name = document.getElementById('name').value;
  updatedProfileStats.name = document.getElementById('name').value;
  updatedStats.foul = document.getElementById('foul').value;
  updatedStats.redCard = document.getElementById('redCard').value;
  updatedStats.yellowCard = document.getElementById('yellowCard').value;
  updatedStats.shotsOnGoal = document.getElementById('shotsOnGoal').value;
  updatedStats.goals = document.getElementById('goals').value;
  updatedProfileStats.goals = document.getElementById('goals').value;
  updatedStats.cornerKicks = document.getElementById('cornerKicks').value;
  updatedStats.goalKicks = document.getElementById('goalKicks').value;
  updatedStats.penaltyKicks = document.getElementById('penaltyKicks').value;
  updatedStats.throwIns = document.getElementById('throwIns').value;
  updatedStats.appearances = document.getElementById('appearances').value;
  firebase.database().ref('stats/' + key).update(updatedStats)
  .then(function(player){
    firebase.database().ref('players/' + key).update(updatedProfileStats)
    .then(function(){
      console.log('successfully updated stats and players in updateStats()');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
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
