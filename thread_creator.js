window.onload = main

function main() {
    /*
    Initialization function that runs when the page loads.
    */

    generate_navbar_html()
    update_league()

    document.getElementById("league").oninput = update_league
    document.getElementById("date").valueAsDate = new Date(new Date().toLocaleDateString())
    document.getElementById("number_of_games").oninput = generate_games_div
    document.getElementById("generate_output_button").onclick = generate_output
}

function update_league() {
    /*
    Updates the HTML inputs to contain the options for the selected league.
    */

    generate_games_div()
    
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(generate_game_select(), document.getElementById("game"))
}

function generate_games_div() {
    /*
    Generates the HTML divs containing the game inputs for the specified number
    of games and updates the page to display these divs.
    */

    var number_of_games = document.getElementById("number_of_games").value

    var games_div = document.createElement("div")
    games_div.setAttribute("id", "games")

    for (let i = 0; i < number_of_games - 1; i++) {
        number = i + 1

        let game_div = document.createElement("div")
        game_div.setAttribute("id", `game_${number}`)
        games_div.append(game_div)
        games_div.append(document.createElement("br"))

        let away_team_text = document.createTextNode(`Away Team #${number} `)
        game_div.append(away_team_text)
        
        let away_team_select = generate_team_select()
        away_team_select.setAttribute("id", `away_team_${number}`)
        game_div.append(away_team_select)

        let home_team_text = document.createTextNode(` Home Team #${number} `)
        game_div.append(home_team_text)
        
        let home_team_select = generate_team_select()
        home_team_select.setAttribute("id", `home_team_${number}`)
        game_div.append(home_team_select)
    }

    var game_of_the_week_game_div = document.createElement("div")
    game_of_the_week_game_div.setAttribute("id", "game_of_the_week")
    games_div.append(game_of_the_week_game_div)
    games_div.append(document.createElement("br"))

    var game_of_the_week_away_team_text = document.createTextNode("Game of the Week Away Team ")
    game_of_the_week_game_div.append(game_of_the_week_away_team_text)
    
    var game_of_the_week_away_team_select = generate_team_select()
    game_of_the_week_away_team_select.setAttribute("id", "game_of_the_week_away_team")
    game_of_the_week_game_div.append(game_of_the_week_away_team_select)

    var game_of_the_week_home_team_text = document.createTextNode(" Game of the Week Home Team ")
    game_of_the_week_game_div.append(game_of_the_week_home_team_text)
    
    var game_of_the_week_home_team_select = generate_team_select()
    game_of_the_week_home_team_select.setAttribute("id", "game_of_the_week_home_team")
    game_of_the_week_game_div.append(game_of_the_week_home_team_select)

    var old_games_div = document.getElementById("games")
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(games_div, old_games_div)
}

function generate_game_select() {
    /*
    Generates the HTML select containing the list of games for the currently
    selected league. The only difference between the leagues will be the names
    of the conference championship games.

    Returns:
        Returns an HTML select element containing the list of games from the
        selected league as its options.
    */

    var game_select = document.createElement("select")
    game_select.setAttribute("id", "game")

    var league = document.getElementById("league").value

    for (let i = 1; i <= 14; i++) {
        let week_option = document.createElement("option")
        week_option.setAttribute("value", `Week ${i}`)
        game_select.append(week_option)

        let week_text = document.createTextNode(`Week ${i}`)
        week_option.append(week_text)
    }

    for (let conference of leagues[league]["Conferences"]) {
        let conference_championship_option = document.createElement("option")
        conference_championship_option.setAttribute("value", `${conference} Conference Championship`)
        game_select.append(conference_championship_option)

        let conference_championship_text = document.createTextNode(`${conference} Conference Championship`)
        conference_championship_option.append(conference_championship_text)
    }

    var championship_option = document.createElement("option")
    championship_option.setAttribute("value", "Championship")
    game_select.append(championship_option)

    var championship_text = document.createTextNode("Championship")
    championship_option.append(championship_text)

    return game_select
}

function generate_output() {
    /*
    Generates the output HTML that will create the properly formatted EFL forum
    post based on the user's inputs and places the HTML code in the output box.
    */

    var league = document.getElementById("league").value
    var season = document.getElementById("season").value
    var game = document.getElementById("game").value
    var date = document.getElementById("date").value
    var presenter = document.getElementById("presenter").value
    var time = document.getElementById("time").value
    var number_of_games = document.getElementById("number_of_games").value

    var output_div = document.createElement("div")

    var league_logo_p = document.createElement("p")
    league_logo_p.setAttribute("style", "text-align: center;")
    output_div.append(league_logo_p)

    var league_logo_img = document.createElement("img")
    league_logo_img.setAttribute("data-emoticon", "true")
    league_logo_img.setAttribute("src", leagues[league]["League Logo URL"])
    league_logo_img.setAttribute("style", "height: 200px; width: 200px;")
    league_logo_img.setAttribute("alt", league)
    league_logo_img.setAttribute("title", league)
    league_logo_p.append(league_logo_img)

    output_div.append(generate_empty_paragraph())

    var title_p = document.createElement("p")
    title_p.setAttribute("style", "text-align: center; font-size: 20px; font-weight: bold; text-decoration: underline;")
    output_div.append(title_p)

    var title_text = document.createTextNode(`Season ${season} | ${league} | ${game}`)
    title_p.append(title_text)

    var date_p = document.createElement("p")
    date_p.setAttribute("style", "text-align: center;")
    output_div.append(date_p)

    var date_text = document.createTextNode(`Date: ${format_date(date)}`)
    date_p.append(date_text)
    
    var presenter_p = document.createElement("p")
    presenter_p.setAttribute("style", "text-align: center;")
    output_div.append(presenter_p)

    var presenter_text = document.createTextNode(`Presenter: ${presenter}`)
    presenter_p.append(presenter_text)

    var time_p = document.createElement("p")
    time_p.setAttribute("style", "text-align: center;")
    output_div.append(time_p)

    var time_text = document.createTextNode(`Time: ${time}`)
    time_p.append(time_text)

    if (number_of_games > 1) {
        output_div.append(generate_empty_paragraph())
    }

    for (let i = 0; i < number_of_games - 1; i++) {
        var number = i + 1

        let away_team = document.getElementById(`away_team_${number}`).value
        let home_team = document.getElementById(`home_team_${number}`).value

        output_div.append(generate_matchup(away_team, home_team))
    }

    if (number_of_games > 1) {
        output_div.append(generate_empty_paragraph())
    }

    var game_of_the_week_p = document.createElement("p")
    game_of_the_week_p.setAttribute("style", "text-align: center; font-weight: bold;")
    output_div.append(game_of_the_week_p)

    if (number_of_games > 1) {
        var game_of_the_week_text = document.createTextNode("Game of the Week:")
        game_of_the_week_p.append(game_of_the_week_text)
    }

    var game_of_the_week_away_team = document.getElementById("game_of_the_week_away_team").value
    var game_of_the_week_home_team = document.getElementById("game_of_the_week_home_team").value

    output_div.append(generate_matchup(game_of_the_week_away_team, game_of_the_week_home_team))

    document.getElementById("output").value = output_div.innerHTML
}

function generate_matchup(away_team, home_team) {
    /*
    Generates the HTML elements for displaying the matchup with the given
    parameters.

    Parameters:
        away_team (String): The name of the away team
        home_team (String): The name of the home team

    Returns:
        An HTML div element containing all the HTML elements for this matchup.
    */

    var league = document.getElementById("league").value

    var matchup_div = document.createElement("div")
    matchup_div.setAttribute("style", "text-align: center;")

    var logos_p = document.createElement("p")
    matchup_div.append(logos_p)

    var away_team_logo_img = document.createElement("img")
    away_team_logo_img.setAttribute("data-emoticon", "true")
    away_team_logo_img.setAttribute("src", leagues[league]["Teams"][away_team]["Team Logo URL"])
    away_team_logo_img.setAttribute("style", "height: 100px; width: 100px;")
    away_team_logo_img.setAttribute("alt", away_team)
    away_team_logo_img.setAttribute("title", away_team)
    logos_p.append(away_team_logo_img)

    var at_text = document.createTextNode("\u00A0@\u00A0")
    logos_p.append(at_text)

    var home_team_logo_img = document.createElement("img")
    home_team_logo_img.setAttribute("data-emoticon", "true")
    home_team_logo_img.setAttribute("src", leagues[league]["Teams"][home_team]["Team Logo URL"])
    home_team_logo_img.setAttribute("style", "height: 100px; width: 100px;")
    home_team_logo_img.setAttribute("alt", home_team)
    home_team_logo_img.setAttribute("title", home_team)
    logos_p.append(home_team_logo_img)

    return matchup_div
}

function format_date(date) {
    /*
    Formats a date into the proper format for the output.

    Parameters:
        date (String): The date in yyyy-mm-dd format

    Returns:
        The date in the format [Month Name] [Day], [Year].
    */

    var split_date = date.split("-")

    var year = split_date[0]
    var month = split_date[1]
    var day = split_date[2]

    var months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    return `${months[month]} ${parseInt(day).toString()}, ${year}`
}