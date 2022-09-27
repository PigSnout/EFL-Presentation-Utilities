window.onload = main

function main() {
    /*
    Initialization function that runs when the page loads.
    */

    generate_navbar_html()
    generate_scoreboards_div()

    document.getElementById("league").oninput = generate_scoreboards_div
    document.getElementById("number_of_scoreboards").oninput = generate_scoreboards_div
    document.getElementById("generate_output_button").onclick = generate_output
}

function generate_scoreboards_div() {
    /*
    Generates the HTML divs containing the scoreboard inputs for the specified
    number of games and updates the page to display these divs.
    */

    var number_of_scoreboards = document.getElementById("number_of_scoreboards").value

    var scoreboards_div = document.createElement("div")
    scoreboards_div.setAttribute("id", "scoreboards")

    for (let i = 0; i < number_of_scoreboards; i++) {
        let number = i + 1

        let scoreboard_div = document.createElement("div")
        scoreboard_div.setAttribute("id", `scoreboard_${number}`)
        scoreboards_div.append(scoreboard_div)
        scoreboards_div.append(document.createElement("br"))

        let away_team_text = document.createTextNode(`Away Team #${number} `)
        scoreboard_div.append(away_team_text)
        
        let away_team_select = generate_team_select()
        away_team_select.setAttribute("id", `away_team_${number}`)
        scoreboard_div.append(away_team_select)

        let away_score_text = document.createTextNode(` Away Score #${number} `)
        scoreboard_div.append(away_score_text)
        
        let away_score_input = document.createElement("input")
        away_score_input.setAttribute("id", `away_score_${number}`)
        away_score_input.setAttribute("type", "number")
        scoreboard_div.append(away_score_input)

        let home_team_text = document.createTextNode(` Home Team #${number} `)
        scoreboard_div.append(home_team_text)
        
        let home_team_select = generate_team_select()
        home_team_select.setAttribute("id", `home_team_${number}`)
        scoreboard_div.append(home_team_select)

        let home_score_text = document.createTextNode(` Home Score #${number} `)
        scoreboard_div.append(home_score_text)
        
        let home_score_input = document.createElement("input")
        home_score_input.setAttribute("id", `home_score_${number}`)
        home_score_input.setAttribute("type", "number")
        scoreboard_div.append(home_score_input)
    }

    var old_scoreboards_div = document.getElementById("scoreboards")
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(scoreboards_div, old_scoreboards_div)
}

function generate_output() {
    /*
    Generates the output HTML that will create the properly formatted EFL forum
    post based on the user's inputs and places the HTML code in the output box.
    */

    var number_of_scoreboards = document.getElementById("number_of_scoreboards").value

    var output_div = document.createElement("div")

    var heading_p = document.createElement("p")
    heading_p.setAttribute("style", "font-size: 36px;")
    output_div.append(heading_p)

    var heading_text = document.createTextNode("Out of Town Scores")
    heading_p.append(heading_text)

    output_div.append(generate_empty_paragraph())

    var quarter = document.getElementById("quarter").value

    for (let i = 0; i < number_of_scoreboards; i++) {
        let number = i + 1

        let away_team = document.getElementById(`away_team_${number}`).value
        let away_score = document.getElementById(`away_score_${number}`).value
        let home_team = document.getElementById(`home_team_${number}`).value
        let home_score = document.getElementById(`home_score_${number}`).value
        let time = ""

        output_div.append(generate_scoreboard(away_team, away_score, home_team, home_score, quarter, time))

        if (number != number_of_scoreboards) {
            output_div.append(generate_empty_paragraph())
        }
    }

    if (quarter == "End Q1") {
        document.getElementById("quarter").value = "End Q2"
    }

    else if (quarter == "End Q2") {
        document.getElementById("quarter").value = "End Q3"
    }

    else if (quarter == "End Q3") {
        document.getElementById("quarter").value = "End Q4"
    }

    else if (quarter == "End Q4") {
        document.getElementById("quarter").value = "OT"
    }

    else if (quarter == "OT") {
        document.getElementById("quarter").value = "Final"
    }

    document.getElementById("output").value = output_div.innerHTML
}