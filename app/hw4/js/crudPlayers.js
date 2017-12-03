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

function getPlayers(){
  document.getElementById('content').textContent = '';
  firebase.database().ref('players').once('value')
  .then(function(players){
    players.forEach(function(player){
      let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
      playerTemplate.querySelector('#name').textContent = player.val().name;
      playerTemplate.querySelector('#position').textContent = player.val().position;
      playerTemplate.querySelector('#jnumber').textContent = player.val().jnumber;
      playerTemplate.querySelector('#birthday').textContent = player.val().birthday;
      playerTemplate.querySelector('#height').textContent = player.val().height;
      playerTemplate.querySelector('#weight').textContent = player.val().weight;
      playerTemplate.querySelector('#goals').textContent = player.val().goals;
      playerTemplate.querySelector('#assists').textContent = player.val().assists;
      playerTemplate.querySelector('#gamesPlayed').textContent = player.val().gamesPlayed;
      playerTemplate.querySelector('#editButton').addEventListener('click',() => editPlayer(player.val(), player.key));
      playerTemplate.querySelector('#deleteButton').addEventListener('click',() => deletePlayer(player.key));
      playerTemplate.querySelector('#addButton').addEventListener('click',() => renderAddPlayerForm());
      document.getElementById('content').appendChild(playerTemplate);
    });
  });
  // let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  // roster.forEach(function(player){
  //   let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
  //   playerTemplate.querySelector('#name').textContent = player.name;
  //   playerTemplate.querySelector('#position').textContent = player.position;
  //   playerTemplate.querySelector('#jnumber').textContent = player.jnumber;
  //   playerTemplate.querySelector('#birthday').textContent = player.birthday;
  //   playerTemplate.querySelector('#height').textContent = player.height;
  //   playerTemplate.querySelector('#weight').textContent = player.weight;
  //   playerTemplate.querySelector('#goals').textContent = player.goals;
  //   playerTemplate.querySelector('#assists').textContent = player.assists;
  //   playerTemplate.querySelector('#gamesPlayed').textContent = player.gamesPlayed;
  //   playerTemplate.querySelector('#editButton').addEventListener('click',() => editPlayer(player));
  //   playerTemplate.querySelector('#deleteButton').addEventListener('click',() => deletePlayer(player));
  //   playerTemplate.querySelector('#addButton').addEventListener('click',() => renderAddPlayerForm());
  //   document.getElementById('content').appendChild(playerTemplate);
  // });
}

function editPlayer(player, key){
  document.getElementById('content').textContent = '';
  let editPlayerForm = document.getElementById('editAddPlayerForm').content.cloneNode(true);
  editPlayerForm.querySelector('#title').textContent = 'Edit this player';
  editPlayerForm.querySelector('#PlayerName').value = player.name;
  editPlayerForm.querySelector('#Position').value = player.position;
  editPlayerForm.querySelector('#jnumber').value = player.jnumber;
  editPlayerForm.querySelector('#Birthday').value = player.birthday;
  editPlayerForm.querySelector('#height').value = player.height;
  editPlayerForm.querySelector('#weight').value = player.weight;
  editPlayerForm.querySelector('#goals').value = player.goals;
  editPlayerForm.querySelector('#assists').value = player.assists;
  editPlayerForm.querySelector('#gamesPlayed').value = player.gamesPlayed;
  editPlayerForm.querySelector('#updateButton').addEventListener('click', () => updatePlayer(key));
  document.getElementById('content').appendChild(editPlayerForm);
}

function deletePlayer(key){
  console.log(key);
  firebase.database().ref('players/' + key).remove()
  .then(function(){
    firebase.database().ref('stats/' + key).remove()
    .then(function(){
      console.log('removed users and stats successfully');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
  });
  // let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : false;
  // if(roster){
  //   let indexOfPlayerToDelete = searchRosterArray(player, roster);
  //   console.log('deleting player at index ' + indexOfPlayerToDelete);
  //   if(indexOfPlayerToDelete != -1){
  //     console.log('old roster: ' + roster);
  //     roster.splice(indexOfPlayerToDelete, 1);
  //     console.log('new roster: ' + roster);
  //     localStorage.setItem('roster', JSON.stringify(roster));
  //     console.log(localStorage.getItem('roster'));
  //     getPlayers();
  //   }
  // }
}

function updatePlayer(key){
  // if(document.getElementById('PlayerName')){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let goals = document.getElementById('goals').value;
  let assists = document.getElementById('assists').value;
  let gamesPlayed = document.getElementById('gamesPlayed').value;
  let updatedPlayer = {
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
  firebase.database().ref('players/' + key).update(updatedPlayer)
  .then(function(player){
    let updatedStats = {
      name : name,
      jnumber : jnumber,
      goals : goals
    };
    firebase.database().ref('stats/' + key).update(updatedStats)
    .then(function(){
      console.log('successfully updated stats and players in updatePlayer()');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
  });
  //we get the array of players and must search for our player
  // let roster  = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : false;
  // if(roster){
  //   let playerIndex = searchRosterArray(player, roster);
  //   // console.log(player);
  //   // console.log(roster);
  //   // console.log(playerIndex);
  //   if(playerIndex != -1){
  //     roster[playerIndex] = newPlayer;
  //     // console.log(newPlayer);
  //     console.log(roster);
  //     localStorage.setItem('roster', JSON.stringify(roster));
  //     console.log(localStorage.getItem('roster'));
  //     getPlayers();
  //   }
  // }
}

function searchRosterArray(object, array){
  console.log('in searchRosterArray');
  console.log(object);
  console.log(array);
  return array.findIndex(function(player, index){
    if(
      object.name === player.name &&
      object.position === player.position &&
      object.jnumber === player.jnumber &&
      object.birthday === player.birthday &&
      object.height === player.height &&
      object.weight === player.weight &&
      object.goals === player.goals &&
      object.assists === player.assists &&
      object.gamesPlayed === player.gamesPlayed
    ){
      console.log('found index at ' + index);
      return true;
    } else{
      console.log('not found index');
      return false;
    }
  });
}

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

  let newPlayer = {
    name : name,
    position : position,
    jnumber : jnumber,
    birthday : birthday,
    height : height,
    weight : weight,
    goals : goals,
    assists : assists,
    gamesPlayed : gamesPlayed
  };
  firebase.database().ref('players').push(newPlayer).then(function(player){
    firebase.database().ref('stats/' + player.key).set({
      jnumber : jnumber,
      name : name,
      foul : 0,
      redCard : 0,
      yellowCard : 0,
      shotsOnGoal : 0,
      goals : goals,
      cornerKicks : 0,
      goalKicks : 0,
      penaltyKicks : 0,
      throwIns : 0,
      appearances : 0
    });
    // console.log(player.key);
  });

  //we get the array of players
  //let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  //add to beginning of array
  // if(roster.unshift(
  //   {
  //     name : name,
  //     position : position,
  //     jnumber : jnumber,
  //     birthday : birthday,
  //     height : height,
  //     weight : weight,
  //     goals : goals,
  //     assists : assists,
  //     gamesPlayed : gamesPlayed
  //   }
  // )){
  //   localStorage.setItem('roster', JSON.stringify(roster));
  //   console.log('added player successfully!\n');
  // } else{
  //   console.log('failed to add player\n');
  // }
  // console.log(roster);
  // console.log(localStorage);
  //window.location.replace('./Player.html');
}

function renderAddPlayerForm(){
  document.getElementById('content').textContent = '';
  let addPlayerForm = document.getElementById('editAddPlayerForm').content.cloneNode(true);
  addPlayerForm.querySelector('#title').textContent = 'Add a new player';
  addPlayerForm.querySelector('#updateButton').addEventListener('click', () => addPlayer());
  document.getElementById('content').appendChild(addPlayerForm);
}

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  } else{
    getPlayers()
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
