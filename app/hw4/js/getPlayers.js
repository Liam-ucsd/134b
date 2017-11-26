'use strict'
function getPlayers(){
  document.getElementById('content').textContent = '';
  let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  roster.forEach(function(player){
    let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
    playerTemplate.querySelector('#name').textContent = player.name;
    playerTemplate.querySelector('#position').textContent = player.position;
    playerTemplate.querySelector('#jnumber').textContent = player.jnumber;
    playerTemplate.querySelector('#birthday').textContent = player.birthday;
    playerTemplate.querySelector('#editButton').addEventListener('click',() => editPlayer(player));
    document.getElementById('content').appendChild(playerTemplate);
  });
}

function editPlayer(player){
  document.getElementById('content').textContent = '';
  let editPlayerForm = document.getElementById('editPlayer').content.cloneNode(true);
  editPlayerForm.querySelector('#PlayerName').value = player.name;
  editPlayerForm.querySelector('#Position').value = player.position;
  editPlayerForm.querySelector('#jnumber').value = player.jnumber;
  editPlayerForm.querySelector('#Birthday').value = player.birthday;
  editPlayerForm.querySelector('#height').value = player.height;
  editPlayerForm.querySelector('#weight').value = player.weight;
  editPlayerForm.querySelector('#updateButton').addEventListener('click', () => updatePlayer(player));
  document.getElementById('content').appendChild(editPlayerForm);
}

function updatePlayer(player){
  // if(document.getElementById('PlayerName')){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let newPlayer = {
    name : name,
    position : position,
    jnumber : jnumber,
    birthday : birthday,
    height : height,
    weight : weight
  }
  //we get the array of players and must search for our player
  let roster  = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : false;
  if(roster){
    let playerIndex = searchRosterArray(player, roster);
    // console.log(player);
    // console.log(roster);
    // console.log(playerIndex);
    if(playerIndex != -1){
      roster[playerIndex] = newPlayer;
      // console.log(newPlayer);
      console.log(roster);
      localStorage.setItem('roster', JSON.stringify(roster));
      console.log(localStorage.getItem('roster'));
      getPlayers();
    }
  }
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
      object.weight === player.weight
    ){
      console.log('found index at ' + index);
      return true;
    } else{
      console.log('not found index');
      return false;
    }
  });
}

window.onload = () => {getPlayers()};
