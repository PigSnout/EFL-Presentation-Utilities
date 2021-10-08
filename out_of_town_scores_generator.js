window.onload = main

function main() {
    generateScoreboardsDiv()

    document.getElementById("league").oninput = generateScoreboardsDiv
    document.getElementById("number_of_scoreboards").oninput = generateScoreboardsDiv
    document.getElementById("generate_output_button").onclick = generateOutput
}

function generateScoreboardsDiv() {
    var number_of_scoreboards = document.getElementById("number_of_scoreboards").value

    var scoreboards_div = document.createElement("div")
    scoreboards_div.setAttribute("id", "scoreboards")

    for (var i = 0; i < number_of_scoreboards; i++) {
        number = i + 1

        var scoreboard_div = document.createElement("div")
        scoreboard_div.setAttribute("id", `scoreboard_${number}`)
        scoreboards_div.appendChild(scoreboard_div)
        scoreboards_div.appendChild(document.createElement("br"))

        var away_team_text = document.createTextNode(`Away Team #${number} `)
        scoreboard_div.appendChild(away_team_text)
        
        var away_team_select = generateTeamsSelect()
        away_team_select.setAttribute("id", `away_team_${number}`)
        scoreboard_div.appendChild(away_team_select)

        var away_score_text = document.createTextNode(` Away Score #${number} `)
        scoreboard_div.appendChild(away_score_text)
        
        var away_score_input = document.createElement("input")
        away_score_input.setAttribute("id", `away_score_${number}`)
        away_score_input.setAttribute("type", "number")
        scoreboard_div.appendChild(away_score_input)

        var home_team_text = document.createTextNode(` Home Team #${number} `)
        scoreboard_div.appendChild(home_team_text)
        
        var home_team_select = generateTeamsSelect()
        home_team_select.setAttribute("id", `home_team_${number}`)
        scoreboard_div.appendChild(home_team_select)

        var home_score_text = document.createTextNode(` Home Score #${number} `)
        scoreboard_div.appendChild(home_score_text)
        
        var home_score_input = document.createElement("input")
        home_score_input.setAttribute("id", `home_score_${number}`)
        home_score_input.setAttribute("type", "number")
        scoreboard_div.appendChild(home_score_input)
    }

    var old_scoreboards_div = document.getElementById("scoreboards")
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(scoreboards_div, old_scoreboards_div)
}

function generateTeamsSelect() {
    var select = document.createElement("select")
    var league = document.getElementById("league").value

    for (team in teams[league]) {
        var team_option = document.createElement("option")
        team_option.setAttribute("value", team)
        select.appendChild(team_option)

        var team_text = document.createTextNode(team)
        team_option.appendChild(team_text)
    }

    return select
}

function generateOutput() {
    var number_of_scoreboards = document.getElementById("number_of_scoreboards").value
    var league = document.getElementById("league").value

    var output_div = document.createElement("div")

    var heading_p = document.createElement("p")
    heading_p.setAttribute("style", "font-size:36px;")

    var heading_text = document.createTextNode("Out of Town Scores")
    heading_p.appendChild(heading_text)

    output_div.appendChild(heading_p)
    output_div.appendChild(generateEmptyParagraph())

    for (var i = 0; i < number_of_scoreboards; i++) {
        var number = i + 1

        var away_team = document.getElementById(`away_team_${number}`).value
        var away_score = document.getElementById(`away_score_${number}`).value
        var home_team = document.getElementById(`home_team_${number}`).value
        var home_score = document.getElementById(`home_score_${number}`).value
        var quarter = document.getElementById("quarter").value
        var time = ""

        output_div.appendChild(generateScoreboard(league, away_team, away_score, home_team, home_score, quarter, time))

        if (number != number_of_scoreboards) {
            output_div.appendChild(generateEmptyParagraph())
        }
    }

    document.getElementById("output").value = output_div.innerHTML
}

function generateEmptyParagraph() {
    empty_paragraph_p = document.createElement("p")

    empty_paragraph_text = document.createTextNode("\u00A0")
    empty_paragraph_p.appendChild(empty_paragraph_text)

    return empty_paragraph_p
}

function generateScoreboard(league, away_team, away_score, home_team, home_score, quarter, time) {
    var scoreboard_div = document.createElement("div")
    scoreboard_div.setAttribute("style", "text-align: center")

    var table_div = document.createElement("div")
    table_div.setAttribute("style", "display: inline-block")
    scoreboard_div.appendChild(table_div)

    var table = document.createElement("table")
    table.setAttribute("style", "border-collapse: collapse")
    table_div.appendChild(table)

    var tbody = document.createElement("tbody")
    table.appendChild(tbody)

    var top_tr = document.createElement("tr")
    tbody.appendChild(top_tr)

    var away_team_logo_th = document.createElement("th")
    away_team_logo_th.setAttribute("style", `background-color: ${teams[league][away_team]["Team Color Code"]}; height: 100px; width: 110px; border: 5px solid DarkGrey`)
    top_tr.appendChild(away_team_logo_th)

    var away_team_logo_img = document.createElement("img")
    away_team_logo_img.setAttribute("data-emoticon", "true")
    away_team_logo_img.setAttribute("src", teams[league][away_team]["Team Logo URL"])
    away_team_logo_img.setAttribute("style", "height:105px; width: 105px;")
    away_team_logo_th.appendChild(away_team_logo_img)

    var quarter_th = document.createElement("th")
    quarter_th.setAttribute("style", "background-color: Silver; height: 100px; width: 85px; border: 5px solid DarkGrey")
    top_tr.appendChild(quarter_th)

    var quarter_p = document.createElement("p")
    quarter_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White")
    quarter_th.appendChild(quarter_p)

    var quarter_text = document.createTextNode(quarter)
    quarter_p.appendChild(quarter_text)

    var home_team_logo_th = document.createElement("th")
    home_team_logo_th.setAttribute("style", `background-color: ${teams[league][home_team]["Team Color Code"]}; height: 100px; width: 110px; border: 5px solid DarkGrey`)
    top_tr.appendChild(home_team_logo_th)

    var home_team_logo_img = document.createElement("img")
    home_team_logo_img.setAttribute("data-emoticon", "true")
    home_team_logo_img.setAttribute("src", teams[league][home_team]["Team Logo URL"])
    home_team_logo_img.setAttribute("style", "height:105px; width: 105px;")
    home_team_logo_th.appendChild(home_team_logo_img)

    var bottom_tr = document.createElement("tr")
    tbody.append(bottom_tr)

    var away_score_th = document.createElement("th")
    away_score_th.setAttribute("style", "background-color: Black; height: 50px; width: 110px; border: 5px solid DarkGrey")
    bottom_tr.appendChild(away_score_th)

    var away_score_p = document.createElement("p")
    away_score_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White")
    away_score_th.appendChild(away_score_p)

    var away_score_text = document.createTextNode(away_score)
    away_score_p.appendChild(away_score_text)

    var time_th = document.createElement("th")
    time_th.setAttribute("style", "background-color: Silver; height: 50px; width: 85px; border: 5px solid DarkGrey")
    bottom_tr.appendChild(time_th)

    var time_p = document.createElement("p")
    time_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White")
    time_th.appendChild(time_p)

    var time_text = document.createTextNode(time)
    time_p.appendChild(time_text)

    var home_score_th = document.createElement("th")
    home_score_th.setAttribute("style", "background-color: Black; height: 50px; width: 110px; border: 5px solid DarkGrey")
    bottom_tr.appendChild(home_score_th)

    var home_score_p = document.createElement("p")
    home_score_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White")
    home_score_th.appendChild(home_score_p)

    var home_score_text = document.createTextNode(home_score)
    home_score_p.appendChild(home_score_text)

    return scoreboard_div
}