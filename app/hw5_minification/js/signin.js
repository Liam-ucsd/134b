'use strict';
//register a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
window.onload = () => {
  if(sessionStorage.getItem('currUser')){
    window.location.replace("./Manage.html");
  }
  // Put this code at the end of the <body>.
  document.querySelector("#password").addEventListener("keyup", event => {
      if(event.key !== "Enter") return; // Use `.key` instead.
      document.querySelector("#login").click(); // Things you want to do.
      event.preventDefault(); // No need to `return false;`.
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('state changed : signed in!');
      //console.log(user.uid);
      sessionStorage.setItem("currUser", user.uid);
      //set the isCoach value in sessionStorage
      firebase.database().ref('users/' + user.uid).once('value')
      .then(function(currentUser){
        sessionStorage.setItem('isCoach', currentUser.val().isCoach);
        if(currentUser.val().isCoach == true){
          window.location.replace("./Manage.html");
        } else{
          window.location.replace("./Manage.html?render=players");
        }
      })
      .catch(function(error){
        console.log('failed to get the current user data!');
      });
      // window.location.replace("./Manage.html");
    } else {
      // No user is signed in.
      console.log('state changed : signed out!');
      sessionStorage.clear();
      // window.location.replace("./Logout.html");;
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
