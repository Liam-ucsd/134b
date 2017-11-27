'use strict';

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  } else {
    fetchAndDisplay();
    let edit = document.getElementById("edit");
    console.log(edit);
    edit.addEventListener("click", function(e) {
        editGame(e, edit);
    });
  }
}

function fetchAndDisplay() {
    let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : null;
    console.log(games);
    if(games != null) {
        let lastGame = "";
        let currGame = "";
        let nextGame = "";
        //find all current dates of games
        let dates = [];
        for(var date in games) {
            dates.push(date);
        }
        dates.sort();

        //find the next upcoming game as well as previous and future game
        for(var i = 0; i < dates.length; i++) {
            if(!games[dates[i]]['finished']) {
                currGame = games[dates[i]];
                lastGame = (i > 1) ? games[dates[i-1]] : "N/A";
                nextGame = (i < dates.length-1) ? games[dates[i+1]] : "N/A";
                break;
            }
        }

        //display the games
        let editButton = "<div style=\"float: right\"><a href=\"\" id=\"edit\"><span class=\"glyphicon glyphicon-pencil\"></span></a></div>";
        let yesterday = document.getElementById('yesterday');
        let today = document.getElementById('today');
        let tomorrow = document.getElementById('tomorrow');

        let yInfo = "<p><b>Previous Game</b></p>";
        let todInfo = editButton + "<p><b>Today's Game</b></p>";
        let tomInfo = "<p><b>Next Upcoming Game</b></p>"

        if(lastGame != "N/A") {
            let yDate = new Date(lastGame['gameDate'] + " " + lastGame['gameTime']).toLocaleString();
            yInfo += "<p>" + yDate + "</p>";
            yInfo += "<p>" + lastGame['loca'] + "</p>";
            yInfo += "<p>Team Name Here vs. " + lastGame['opp'] + "</p>";
            yInfo += "<h3>" + lastGame['homeScore'] + " : " + lastGame['awayScore'] + "</h3>";
            yInfo += (lastGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";
        } else {
            yInfo += "<p>N/A</p>"
        }

        let todDate = new Date(currGame['gameDate'] + " " + currGame['gameTime']).toLocaleString();
        todInfo += "<p id=\"" + currGame['gameDate'] + "\">" + todDate + "</p>";
        todInfo += "<p>" + currGame['loca'] + "</p>";
        todInfo += "<p>Team Name Here vs. " + currGame['opp'] + "</p>";
        todInfo += (currGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";

        if(nextGame != "N/A") {
            let tomDate = new Date(nextGame['gameDate'] + " " + nextGame['gameTime']).toLocaleString();
            tomInfo += "<p>" + tomDate + "</p>";
            tomInfo += "<p>" + nextGame['loca'] + "</p>";
            tomInfo += "<p>Team Name Here vs. " + nextGame['opp'] + "</p>";
            tomInfo += (nextGame['isHome'] == true) ? "<p>Home Game</p>" : "<p>Away Game</p>";
        } else {
            tomInfo += "<p>N/A</p>"
        }

        yesterday.innerHTML = yInfo;
        today.innerHTML = todInfo;
        tomorrow.innerHTML = tomInfo;
    }
}

function editGame(e, item) {
    e.preventDefault();
    let nodes = item.parentNode.parentNode.childNodes;
    let toEdit = nodes[2].id;
    window.location.href = "./AddGame.html#" + toEdit;
}