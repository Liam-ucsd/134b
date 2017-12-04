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

function signupUser(){
  //let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
  let name = document.getElementById('name').value;
  let password = document.getElementById('password').value;
  let mail = document.getElementById('mail').value;
  let age = document.getElementById('age').value;
  let isCoach = document.getElementById('isCoach').checked;
  let isPlayer = document.getElementById('isPlayer').checked;
  let isParentFan = document.getElementById('isParentFan').checked;
  // console.log(users);
  // if(users[name] && (users[name]['name'] == name)){
  //   alert('name ' + name + ' is taken. Sorry please try again.');
  // } else{
  //   users[name] = {
  //     name : name,
  //     //password : password,
  //     mail : mail,
  //     age : age,
  //     isCoach : isCoach,
  //     isPlayer : isPlayer,
  //     isParentFan : isParentFan
  //   }
  //   localStorage.setItem('users', JSON.stringify(users));
  //   console.log(localStorage);
  //   window.location.href = "./LoginBootstrap.html";
  // }
  firebase.auth().createUserWithEmailAndPassword(mail, password)
  .then(function(user){
    firebase.database().ref('users/' + user.uid).set({
      name : name,
      mail : mail,
      age : age,
      isCoach : isCoach,
      isPlayer : isPlayer,
      isParentFan : isParentFan
    })
    .then(function(){
      sessionStorage.setItem("currUser", user.uid);
      sessionStorage.setItem('isCoach', isCoach);
      window.location.replace("./Manage.html");
      console.log('finished setting new user in users and auth!');
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}
