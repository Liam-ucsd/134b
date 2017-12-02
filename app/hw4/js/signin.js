'use strict';

window.onload = () => {
  // if(sessionStorage.getItem('currUser')){
  //   window.location.replace("./Manage.html");
  // }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('state changed : signed in!');
      //console.log(user.uid);
      sessionStorage.setItem("currUser", user.uid);
      // window.location.replace("./Manage.html");
    } else {
      // No user is signed in.
      console.log('state changed : signed out!');
      sessionStorage.clear();
      window.location.replace("./Logout.html");;
    }
  });
}

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
var database = firebase.database();

function loginUser() {
    let name = document.getElementById('name').value;
    let pass = document.getElementById('password').value;
    // let user = JSON.parse(localStorage.getItem('users'))[name.value];
    // console.log(user);
    // if(user && user.password == pass.value){
    //     sessionStorage.setItem("currUser", name.value);
    //     window.location.replace("./Manage.html");
    // }
    console.log(name);
    console.log(typeof(name));
    firebase.auth().signInWithEmailAndPassword(name, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
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
