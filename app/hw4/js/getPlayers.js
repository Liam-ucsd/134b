'use strict'
function getPlayers(){
  let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  roster.forEach(function(player){
    let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
    playerTemplate.querySelector('#name').textContent = player.name;
    playerTemplate.querySelector('#position').textContent = player.position;
    playerTemplate.querySelector('#jnumber').textContent = player.jnumber;
    playerTemplate.querySelector('#birthday').textContent = player.birthday;
    document.body.appendChild(playerTemplate);
  });
}

window.onload = () => {getPlayers()};
