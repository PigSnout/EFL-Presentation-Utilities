window.onload = main;

function main() {
    generateScoreboardsDiv()

    document.getElementById("submit_button").onclick = submit;
    document.getElementById("number_of_scoreboards").oninput = generateScoreboardsDiv;
}

function submit() {
    var league = document.getElementById("league").value
    var scoreboards = document.getElementById("scoreboards").value
    document.getElementById("container").innerHTML = ""
    console.log(league)
    console.log(scoreboards)
}

function generateScoreboardsDiv() {
    var number_of_scoreboards = document.getElementById("number_of_scoreboards").value

    scoreboards_div = document.createElement("div")
    scoreboards_div.setAttribute("id", "scoreboards")

    for (var i = 0; i < number_of_scoreboards; i++) {
        number = i + 1

        scoreboard_div = document.createElement("div")
        scoreboard_div.setAttribute("id", `scoreboard_${number}`)
        scoreboards_div.appendChild(scoreboard_div)
        scoreboards_div.appendChild(document.createElement("br"))

        away_team_text = document.createTextNode(`Away Team #${number} `)
        scoreboard_div.appendChild(away_team_text)
        
        away_team_input = document.createElement("input")
        away_team_input.setAttribute("id", `away_team_${number}`)
        away_team_input.setAttribute("type", "text")
        scoreboard_div.appendChild(away_team_input)

        away_score_text = document.createTextNode(` Away Score #${number} `)
        scoreboard_div.appendChild(away_score_text)
        
        away_score_input = document.createElement("input")
        away_score_input.setAttribute("id", `away_score_${number}`)
        away_score_input.setAttribute("type", "number")
        scoreboard_div.appendChild(away_score_input)

        home_team_text = document.createTextNode(` Home Team #${number} `)
        scoreboard_div.appendChild(home_team_text)
        
        home_team_input = document.createElement("input")
        home_team_input.setAttribute("id", `home_team_${number}`)
        home_team_input.setAttribute("type", "text")
        scoreboard_div.appendChild(home_team_input)

        home_score_text = document.createTextNode(` Home Score #${number} `)
        scoreboard_div.appendChild(home_score_text)
        
        home_score_input = document.createElement("input")
        home_score_input.setAttribute("id", `home_score_${number}`)
        home_score_input.setAttribute("type", "number")
        scoreboard_div.appendChild(home_score_input)
    }

    old_scoreboards_div = document.getElementById("scoreboards")
    inputs = document.getElementById("inputs")
    inputs.replaceChild(scoreboards_div, old_scoreboards_div)
}

function getTeamList() {
    
}