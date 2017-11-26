'use strict'
function addPlayer(){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
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
      weight : weight
    }
  )){
    localStorage.setItem('roster', JSON.stringify(roster));
    console.log('added player successfully!\n');
  } else{
    console.log('failed to add player\n');
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
