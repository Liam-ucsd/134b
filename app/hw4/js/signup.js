'use strict';

function signupUser(){
  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
  let name = document.getElementById('name').value;
  let password = document.getElementById('password').value;
  let mail = document.getElementById('mail').value;
  let age = document.getElementById('age').value;
  let isCoach = document.getElementById('isCoach').checked;
  let isPlayer = document.getElementById('isPlayer').checked;
  let isParentFan = document.getElementById('isParentFan').checked;
  console.log(users);
  if(users[name] && (users[name]['name'] == name)){
    alert('name ' + name + ' is taken. Sorry please try again.');
  } else{
    users[name] = {
      name : name,
      password : password,
      mail : mail,
      age : age,
      isCoach : isCoach,
      isPlayer : isPlayer,
      isParentFan : isParentFan
    }
    localStorage.setItem('users', JSON.stringify(users));
    console.log(localStorage);
    window.location.replace("./LoginBootstrap.html");//TODO redirect to url instead
  }
}
