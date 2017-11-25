'use strict';

function loginUser() {
    var name = document.getElementById('name');
    var pass = document.getElementById('password');
    if(name.value === "Manager" && pass.value === "mrmanager") {
        localStorage.setItem("currUser", "manager");
        window.location.replace("./Manage.html");
    }
}