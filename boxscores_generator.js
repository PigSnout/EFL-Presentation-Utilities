window.onload = main;

function main() {
    generateBoxscoresDiv()

    document.getElementById("league").oninput = generateBoxscoresDiv
    document.getElementById("number_of_boxscores").oninput = generateBoxscoresDiv
    document.getElementById("generate_output_button").onclick = generateOutput
}

function generateBoxscoresDiv() {
    var number_of_boxscores = document.getElementById("number_of_boxscores").value

    var boxscores_div = document.createElement("div")
    boxscores_div.setAttribute("id", "boxscores")

    for (var i = 0; i < number_of_boxscores; i++) {
        number = i + 1

        var boxscore_div = document.createElement("div")
        boxscore_div.setAttribute("id", `boxscore_${number}`)
        boxscores_div.appendChild(boxscore_div)
        boxscores_div.appendChild(document.createElement("br"))

        var away_team_text = document.createTextNode(`Away Team #${number} `)
        boxscore_div.appendChild(away_team_text)
        
        var away_team_select = generateTeamsSelect()
        away_team_select.setAttribute("id", `away_team_${number}`)
        boxscore_div.appendChild(away_team_select)

        var home_team_text = document.createTextNode(` Home Team #${number} `)
        boxscore_div.appendChild(home_team_text)
        
        var home_team_select = generateTeamsSelect()
        home_team_select.setAttribute("id", `home_team_${number}`)
        boxscore_div.appendChild(home_team_select)

        var top_half_url_text = document.createTextNode(` Top Half URL #${number} `)
        boxscore_div.appendChild(top_half_url_text)
        
        var top_half_url_input = document.createElement("input")
        top_half_url_input.setAttribute("id", `top_half_url_${number}`)
        top_half_url_input.setAttribute("type", "url")
        boxscore_div.appendChild(top_half_url_input)

        var bottom_half_url_text = document.createTextNode(` Bottom Half URL #${number} `)
        boxscore_div.appendChild(bottom_half_url_text)
        
        var bottom_half_url_input = document.createElement("input")
        bottom_half_url_input.setAttribute("id", `bottom_half_url_${number}`)
        bottom_half_url_input.setAttribute("type", "url")
        boxscore_div.appendChild(bottom_half_url_input)
    }

    old_boxscores_div = document.getElementById("boxscores")
    inputs = document.getElementById("inputs")
    inputs.replaceChild(boxscores_div, old_boxscores_div)
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
    var number_of_boxscores = document.getElementById("number_of_boxscores").value
    var league = document.getElementById("league").value

    var output_div = document.createElement("div")

    var heading_p = document.createElement("p")
    heading_p.setAttribute("style", "font-size:36px; text-align: center;")

    if (number_of_boxscores == 1) {
        var heading_text = document.createTextNode("Boxscore:")
    }
    else {
        var heading_text = document.createTextNode("Boxscores:")
    }
    heading_p.appendChild(heading_text)

    output_div.appendChild(heading_p)
    output_div.appendChild(generateEmptyParagraph())

    for (var i = 0; i < number_of_boxscores; i++) {
        var number = i + 1

        var away_team = document.getElementById(`away_team_${number}`).value
        var home_team = document.getElementById(`home_team_${number}`).value
        var top_half_url = document.getElementById(`top_half_url_${number}`).value
        var bottom_half_url = document.getElementById(`bottom_half_url_${number}`).value

        output_div.appendChild(generateBoxscore(league, away_team, home_team, top_half_url, bottom_half_url))

        if (number != number_of_boxscores) {
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

function generateBoxscore(league, away_team, home_team, top_half_url, bottom_half_url) {
    var boxscore_div = document.createElement("div")
    boxscore_div.setAttribute("style", "text-align: center;")

    var logos_p = document.createElement("p")
    logos_p.setAttribute("style", "font-size: 36px;")
    boxscore_div.appendChild(logos_p)

    var away_team_logo_img = document.createElement("img")
    away_team_logo_img.setAttribute("data-emoticon", "true")
    away_team_logo_img.setAttribute("src", teams[league][away_team]["Team Logo URL"])
    away_team_logo_img.setAttribute("style", "height:150px; width: 150px;")
    logos_p.appendChild(away_team_logo_img)

    var at_text = document.createTextNode("\u00A0@\u00A0")
    logos_p.appendChild(at_text)

    var home_team_logo_img = document.createElement("img")
    home_team_logo_img.setAttribute("data-emoticon", "true")
    home_team_logo_img.setAttribute("src", teams[league][home_team]["Team Logo URL"])
    home_team_logo_img.setAttribute("style", "height:150px; width: 150px;")
    logos_p.appendChild(home_team_logo_img)

    boxscore_div.appendChild(generateEmptyParagraph())

    var spoiler_div = document.createElement("div")
    spoiler_div.setAttribute("class", "ipsSpoiler")
    spoiler_div.setAttribute("data-ipsspoiler", "")
    boxscore_div.appendChild(spoiler_div)

    var spoiler_header_div = document.createElement("div")
    spoiler_header_div.setAttribute("class", "ipsSpoiler_header")
    spoiler_div.appendChild(spoiler_header_div)

    var spoiler_header_span = document.createElement("span")
    spoiler_header_div.appendChild(spoiler_header_span)

    var spoiler_header_text = document.createTextNode("Spoiler")
    spoiler_header_span.appendChild(spoiler_header_text)

    spoiler_contents_div = document.createElement("div")
    spoiler_contents_div.setAttribute("class", "ipsSpoiler_contents ipsClearfix")
    spoiler_contents_div.setAttribute("data-gramm", "false")
    spoiler_div.appendChild(spoiler_contents_div)

    top_half_img = document.createElement("img")
    top_half_img.setAttribute("src", top_half_url)
    spoiler_contents_div.appendChild(top_half_img)

    bottom_half_img = document.createElement("img")
    bottom_half_img.setAttribute("src", bottom_half_url)
    spoiler_contents_div.appendChild(bottom_half_img)

    return boxscore_div
}