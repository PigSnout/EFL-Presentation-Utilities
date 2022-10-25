window.onload = main

function main() {
    /*
    Initialization function that runs when the page loads.
    */

    generate_navbar_html()
    generate_boxscores_div()

    document.getElementById("league").oninput = generate_boxscores_div
    document.getElementById("number_of_boxscores").oninput = generate_boxscores_div
    document.getElementById("generate_output_button").onclick = generate_output

}

function generate_boxscores_div() {
    /*
    Generates the HTML divs containing the boxscore inputs for the specified
    number of boxscores and updates the page to display these divs.
    */

    var number_of_boxscores = document.getElementById("number_of_boxscores").value

    var boxscores_div = document.createElement("div")
    boxscores_div.setAttribute("id", "boxscores")

    for (let i = 0; i < number_of_boxscores; i++) {
        let number = i + 1

        let boxscore_div = document.createElement("div")
        boxscore_div.setAttribute("id", `boxscore_${number}`)
        boxscores_div.append(boxscore_div)
        boxscores_div.append(document.createElement("br"))

        let away_team_text = document.createTextNode(`Away Team #${number} `)
        boxscore_div.append(away_team_text)
        
        let away_team_select = generate_team_select()
        away_team_select.setAttribute("id", `away_team_${number}`)
        boxscore_div.append(away_team_select)

        let home_team_text = document.createTextNode(` Home Team #${number} `)
        boxscore_div.append(home_team_text)
        
        let home_team_select = generate_team_select()
        home_team_select.setAttribute("id", `home_team_${number}`)
        boxscore_div.append(home_team_select)

        let top_half_url_text = document.createTextNode(` Top Half URL #${number} `)
        boxscore_div.append(top_half_url_text)
        
        let top_half_url_input = document.createElement("input")
        top_half_url_input.setAttribute("id", `top_half_url_${number}`)
        boxscore_div.append(top_half_url_input)

        let bottom_half_url_text = document.createTextNode(` Bottom Half URL #${number} `)
        boxscore_div.append(bottom_half_url_text)
        
        let bottom_half_url_input = document.createElement("input")
        bottom_half_url_input.setAttribute("id", `bottom_half_url_${number}`)
        boxscore_div.append(bottom_half_url_input)
    }

    var old_boxscores_div = document.getElementById("boxscores")
    inputs = document.getElementById("inputs")
    inputs.replaceChild(boxscores_div, old_boxscores_div)
}

function generate_output() {
    /*
    Generates the output HTML that will create the properly formatted EFL forum
    post based on the user's inputs and places the HTML code in the output box.
    */

    var number_of_boxscores = document.getElementById("number_of_boxscores").value

    var output_div = document.createElement("div")

    var heading_p = document.createElement("p")
    heading_p.setAttribute("style", "font-size: 36px; text-align: center;")

    if (number_of_boxscores == 1) {
        var heading_text = document.createTextNode("Boxscore:")
    }

    else {
        var heading_text = document.createTextNode("Boxscores:")
    }

    heading_p.append(heading_text)

    output_div.append(heading_p)
    output_div.append(generate_empty_paragraph())

    for (let i = 0; i < number_of_boxscores; i++) {
        let number = i + 1

        let away_team = document.getElementById(`away_team_${number}`).value
        let home_team = document.getElementById(`home_team_${number}`).value
        let top_half_url = document.getElementById(`top_half_url_${number}`).value
        let bottom_half_url = document.getElementById(`bottom_half_url_${number}`).value

        output_div.append(generate_boxscore(away_team, home_team, top_half_url, bottom_half_url))

        if (number != number_of_boxscores) {
            output_div.append(generate_empty_paragraph())
        }
    }

    document.getElementById("output").value = output_div.innerHTML
}

function generate_boxscore(away_team, home_team, top_half_url, bottom_half_url) {
    /*
    Generates the HTML elements for displaying the boxscore with the given
    parameters.

    Parameters:
        away_team (String): The name of the away team
        home_team (String): The name of the home team
        top_half_url (String): The URL of the image of the top half of the 
            boxscore
        bottom_half_url (String): The URL of the image of the bottom half of
            the boxscore

    Returns:
        An HTML div element containing all the HTML elements for this boxscore.
    */

    var league = document.getElementById("league").value

    var boxscore_div = document.createElement("div")
    boxscore_div.setAttribute("style", "text-align: center;")

    var logos_p = document.createElement("p")
    logos_p.setAttribute("style", "font-size: 36px;")
    boxscore_div.append(logos_p)

    var away_team_logo_img = document.createElement("img")
    away_team_logo_img.setAttribute("data-emoticon", "true")
    away_team_logo_img.setAttribute("src", leagues[league]["Teams"][away_team]["Team Logo URL"])
    away_team_logo_img.setAttribute("style", "height: 150px; width: 150px;")
    away_team_logo_img.setAttribute("alt", away_team)
    away_team_logo_img.setAttribute("title", away_team)
    logos_p.append(away_team_logo_img)

    var at_text = document.createTextNode("\u00A0@\u00A0")
    logos_p.append(at_text)

    var home_team_logo_img = document.createElement("img")
    home_team_logo_img.setAttribute("data-emoticon", "true")
    home_team_logo_img.setAttribute("src", leagues[league]["Teams"][home_team]["Team Logo URL"])
    home_team_logo_img.setAttribute("style", "height: 150px; width: 150px;")
    home_team_logo_img.setAttribute("alt", home_team)
    home_team_logo_img.setAttribute("title", home_team)
    logos_p.append(home_team_logo_img)

    boxscore_div.append(generate_empty_paragraph())

    var spoiler_div = document.createElement("div")
    spoiler_div.setAttribute("class", "ipsSpoiler")
    spoiler_div.setAttribute("data-ipsspoiler", "")
    boxscore_div.append(spoiler_div)

    var spoiler_header_div = document.createElement("div")
    spoiler_header_div.setAttribute("class", "ipsSpoiler_header")
    spoiler_div.append(spoiler_header_div)

    var spoiler_header_span = document.createElement("span")
    spoiler_header_div.append(spoiler_header_span)

    var spoiler_header_text = document.createTextNode("Spoiler")
    spoiler_header_span.append(spoiler_header_text)

    var spoiler_contents_div = document.createElement("div")
    spoiler_contents_div.setAttribute("class", "ipsSpoiler_contents ipsClearfix")
    spoiler_contents_div.setAttribute("data-gramm", "false")
    spoiler_div.append(spoiler_contents_div)

    var top_half_img = document.createElement("img")
    top_half_img.setAttribute("src", top_half_url)
    spoiler_contents_div.append(top_half_img)

    var bottom_half_img = document.createElement("img")
    bottom_half_img.setAttribute("src", bottom_half_url)
    spoiler_contents_div.append(bottom_half_img)

    return boxscore_div
}