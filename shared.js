var navbar_links = {
    "Thread Creator": "thread_creator.html",
    "Play By Play Format Fixer": "play_by_play_format_fixer.html",
    "Single Post Formatter": "single_post_formatter.html",
    "Out of Town Scores Generator": "out_of_town_scores_generator.html",
    "Boxscores Generator": "boxscores_generator.html",
    "Documentation": "https://github.com/PigSnout/EFL-Presentation-Utilities/blob/master/README.md"
}

function generate_navbar_html() {
    /*
    Generates the HTML elements for displaying the navbar at the top of the
    page and updates the page to display the navbar.
    */

    var navbar_nav = document.createElement("nav")
    navbar_nav.setAttribute("class", "navbar navbar-inverse navbar-static-top")
    document.body.prepend(navbar_nav)

    var navbar_container_div = document.createElement("div")
    navbar_container_div.setAttribute("class", "container")
    navbar_nav.appendChild(navbar_container_div)

    var navbar_div = document.createElement("div")
    navbar_div.setAttribute("id", "navbar")
    navbar_div.setAttribute("class", "collapse navbar-collapse")
    navbar_container_div.appendChild(navbar_div)

    var navbar_ul = document.createElement("ul")
    navbar_ul.setAttribute("class", "nav navbar-nav")
    navbar_div.appendChild(navbar_ul)

    var navbar_links_keys = Object.keys(navbar_links)

    for (let navbar_link_key of navbar_links_keys) {
        let navbar_link_value = navbar_links[navbar_link_key]

        let navbar_link_li = document.createElement("li")
        navbar_ul.appendChild(navbar_link_li)

        let navbar_link_a = document.createElement("a")
        navbar_link_a.setAttribute("href", navbar_link_value)
        navbar_link_li.appendChild(navbar_link_a)

        let navbar_link_text = document.createTextNode(navbar_link_key)
        navbar_link_a.appendChild(navbar_link_text)
    }
}

function generate_team_select() {
    /*
    Generates the HTML select containing the list of teams for the currently
    selected league.

    Returns:
        Returns an HTML select element containing the list of teams from the
        selected league as its options.
    */

    var select = document.createElement("select")
    var league = document.getElementById("league").value

    for (let team in leagues[league]["Teams"]) {
        let team_option = document.createElement("option")
        team_option.setAttribute("value", team)
        select.append(team_option)

        let team_text = document.createTextNode(team)
        team_option.append(team_text)
    }

    return select
}

function generate_empty_paragraph() {
    /*
    Generates the HTML code for an empty paragraph, which can be used when you
    want to include a blank space between elements on the EFL forum post. The
    structure of this paragraph is designed to replicate the empty paragraph
    that naturally occurs in a post's HTML on the EFL forum when you have a
    blank line with no text. This will result in the creation of a p element
    containing only an nbsp character. This structure is used so that empty
    lines generated by this program will follow the exact same format as empty
    lines that occur naturally on the forum.

    Returns:
        An HTML p element containing an nbsp character.
    */

    empty_paragraph_p = document.createElement("p")

    empty_paragraph_text = document.createTextNode("\u00A0")
    empty_paragraph_p.append(empty_paragraph_text)

    return empty_paragraph_p
}

function generate_scoreboard(away_team, away_score, home_team, home_score, quarter, time) {
    /*
    Generates the HTML elements for displaying the scoreboard with the given
    parameters.

    Parameters:
        away_team (String): The name of the away team
        away_score (String): The away team's score
        home_team (String): The name of the home team
        home_score (String): The home team's score
        quarter (String): The current quarter
        time (String): How much time is left in the quarter

    Returns:
        An HTML div element containing all the HTML elements for this scoreboard.
    */

    var league = document.getElementById("league").value

    var scoreboard_div = document.createElement("div")
    scoreboard_div.setAttribute("style", "text-align: center;")

    var table_div = document.createElement("div")
    table_div.setAttribute("style", "display: inline-block;")
    scoreboard_div.append(table_div)

    var table = document.createElement("table")
    table.setAttribute("style", "border-collapse: collapse;")
    table_div.append(table)

    var tbody = document.createElement("tbody")
    table.append(tbody)

    var top_tr = document.createElement("tr")
    tbody.append(top_tr)

    var away_team_logo_th = document.createElement("th")
    away_team_logo_th.setAttribute("style", `background-color: ${leagues[league]["Teams"][away_team]["Team Color Code"]}; height: 100px; width: 110px; border: 5px solid DarkGrey;`)
    top_tr.append(away_team_logo_th)

    var away_team_logo_img = document.createElement("img")
    away_team_logo_img.setAttribute("data-emoticon", "true")
    away_team_logo_img.setAttribute("src", leagues[league]["Teams"][away_team]["Team Logo URL"])
    away_team_logo_img.setAttribute("style", "height: 105px; width: 105px;")
    away_team_logo_img.setAttribute("alt", away_team)
    away_team_logo_img.setAttribute("title", away_team)
    away_team_logo_th.append(away_team_logo_img)

    var quarter_th = document.createElement("th")
    quarter_th.setAttribute("style", "background-color: Silver; height: 100px; width: 85px; border: 5px solid DarkGrey;")
    top_tr.append(quarter_th)

    var quarter_p = document.createElement("p")
    quarter_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White;")
    quarter_th.append(quarter_p)

    var quarter_text = document.createTextNode(quarter)
    quarter_p.append(quarter_text)

    var home_team_logo_th = document.createElement("th")
    home_team_logo_th.setAttribute("style", `background-color: ${leagues[league]["Teams"][home_team]["Team Color Code"]}; height: 100px; width: 110px; border: 5px solid DarkGrey;`)
    top_tr.append(home_team_logo_th)

    var home_team_logo_img = document.createElement("img")
    home_team_logo_img.setAttribute("data-emoticon", "true")
    home_team_logo_img.setAttribute("src", leagues[league]["Teams"][home_team]["Team Logo URL"])
    home_team_logo_img.setAttribute("style", "height: 105px; width: 105px;")
    home_team_logo_img.setAttribute("alt", home_team)
    home_team_logo_img.setAttribute("title", home_team)
    home_team_logo_th.append(home_team_logo_img)

    var bottom_tr = document.createElement("tr")
    tbody.append(bottom_tr)

    var away_score_th = document.createElement("th")
    away_score_th.setAttribute("style", "background-color: Black; height: 50px; width: 110px; border: 5px solid DarkGrey;")
    bottom_tr.append(away_score_th)

    var away_score_p = document.createElement("p")
    away_score_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White;")
    away_score_th.append(away_score_p)

    var away_score_text = document.createTextNode(away_score)
    away_score_p.append(away_score_text)

    var time_th = document.createElement("th")
    time_th.setAttribute("style", "background-color: Silver; height: 50px; width: 85px; border: 5px solid DarkGrey;")
    bottom_tr.append(time_th)

    var time_p = document.createElement("p")
    time_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White;")
    time_th.append(time_p)

    var time_text = document.createTextNode(time)
    time_p.append(time_text)

    var home_score_th = document.createElement("th")
    home_score_th.setAttribute("style", "background-color: Black; height: 50px; width: 110px; border: 5px solid DarkGrey;")
    bottom_tr.append(home_score_th)

    var home_score_p = document.createElement("p")
    home_score_p.setAttribute("style", "font-family: Georgia; font-size: 25px; color: White;")
    home_score_th.append(home_score_p)

    var home_score_text = document.createTextNode(home_score)
    home_score_p.append(home_score_text)

    return scoreboard_div
}

function remove_empty_lines(lines) {
    /*
    Removes the empty lines from the given list of lines.

    Parameters:
        lines (String Array): The list of lines in the original text input.

    Returns:
        A String Array containing the list of non-empty lines in the original
        text input.
    */

    var new_lines = []

    for (let line of lines) {
        if (line != "") {
            new_lines.push(line)
        }
    }

    return new_lines
}
