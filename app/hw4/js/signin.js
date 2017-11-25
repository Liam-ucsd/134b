'use strict';

window.onload = () => {
  if(sessionStorage.getItem('currUser')){
    window.location.replace("./Manage.html");
  }
};

function loginUser() {
    let name = document.getElementById('name');
    let pass = document.getElementById('password');
    let user = JSON.parse(localStorage.getItem('users'))[name.value];
    console.log(user);
    if(user && user.password == pass.value){
        sessionStorage.setItem("currUser", name.value);
        window.location.replace("./Manage.html");
    }
}
