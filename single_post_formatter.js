window.onload = main

function main() {
    /*
    Initialization function that runs when the page loads.
    */

    generate_navbar_html()
    generate_scoreboard_div()

    document.getElementById("spoiler_button").onclick = function() {add_tag("[SPOILER]")}
    document.getElementById("gif_button").onclick = function() {add_tag("[GIF]")}
    document.getElementById("commentary_button").onclick = function() {add_tag("[COMMENTARY]")}
    document.getElementById("blank_line_button").onclick = function() {add_tag("[BLANK LINE]")}
    document.getElementById("home_team_highlight_button").onclick = function() {add_tag("[HOME TEAM HIGHLIGHT]")}
    document.getElementById("away_team_highlight_button").onclick = function() {add_tag("[AWAY TEAM HIGHLIGHT]")}
    document.getElementById("penalty_highlight_button").onclick = function() {add_tag("[PENALTY HIGHLIGHT]")}
    document.getElementById("clock_stoppage_button").onclick = function() {add_tag("[CLOCK STOPPAGE]")}
    document.getElementById("league").oninput = generate_scoreboard_div
    document.getElementById("generate_output_button").onclick = generate_output
}

function generate_scoreboard_div() {
    /*
    Generates the HTML divs containing the scoreboard inputs and updates the
    page to display these divs.
    */

    var scoreboard_div = document.createElement("div")
    scoreboard_div.setAttribute("id", "scoreboard")

    var away_team_text = document.createTextNode("Away Team: ")
    scoreboard_div.append(away_team_text)
    
    var away_team_select = generate_team_select()
    away_team_select.setAttribute("id", "away_team")
    scoreboard_div.append(away_team_select)

    var away_score_text = document.createTextNode(" Away Score: ")
    scoreboard_div.append(away_score_text)
    
    var away_score_input = document.createElement("input")
    away_score_input.setAttribute("id", "away_score")
    away_score_input.setAttribute("type", "number")
    away_score_input.setAttribute("value", "0")
    scoreboard_div.append(away_score_input)

    var home_team_text = document.createTextNode(" Home Team: ")
    scoreboard_div.append(home_team_text)
    
    var home_team_select = generate_team_select()
    home_team_select.setAttribute("id", "home_team")
    scoreboard_div.append(home_team_select)

    var home_score_text = document.createTextNode(" Home Score: ")
    scoreboard_div.append(home_score_text)
    
    var home_score_input = document.createElement("input")
    home_score_input.setAttribute("id", "home_score")
    home_score_input.setAttribute("type", "number")
    home_score_input.setAttribute("value", "0")
    scoreboard_div.append(home_score_input)

    var old_scoreboard_div = document.getElementById("scoreboard")
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(scoreboard_div, old_scoreboard_div)
}

function add_tag(tag) {
    /*
    Adds the given tag in to the original text input field at the currently
    selected location.

    Parameters:
        tag (String): The tag to be added to the text.
    */

    if (tag == "[GIF]") {
        var url = prompt("Enter the URL of the GIF")

        tag = `[SPOILER]\n\n[GIF=${url}]\n\n[SPOILER]`        
    }

    var original_text = document.getElementById("original_text")

    var position = original_text.selectionStart
    var text = original_text.value
    var first_half = text.substring(0, position)
    var second_half = text.substring(position, text.length)

    original_text.value = `${first_half}${tag}${second_half}`
}

function generate_output() {
    /*
    Generates the output HTML that will create the properly formatted EFL forum
    post based on the user's inputs and places the HTML code in the output box.
    */

    var league = document.getElementById("league").value
    var away_team = document.getElementById("away_team").value
    var away_score = document.getElementById("away_score").value
    var home_team = document.getElementById("home_team").value
    var home_score = document.getElementById("home_score").value
    var quarter = document.getElementById("quarter").value

    var lines = document.getElementById("original_text").value.split("\n")
    lines = remove_empty_lines(lines)

    var output_div = document.createElement("div")
    var parent_element = output_div

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        if (line.includes("[SPOILER]")) {
            if (i != 0 && !(lines[i - 1].includes("[SPOILER]")) && !(lines[i - 1].includes("[COMMENTARY]"))) {
                parent_element.append(generate_empty_paragraph())
            }

            let spoiler_div = document.createElement("div")
            spoiler_div.setAttribute("class", "ipsSpoiler")
            spoiler_div.setAttribute("data-ipsspoiler", "")
            parent_element.append(spoiler_div)
        
            let spoiler_header_div = document.createElement("div")
            spoiler_header_div.setAttribute("class", "ipsSpoiler_header")
            spoiler_div.append(spoiler_header_div)
        
            let spoiler_header_span = document.createElement("span")
            spoiler_header_div.append(spoiler_header_span)
        
            let spoiler_header_text = document.createTextNode("Spoiler")
            spoiler_header_span.append(spoiler_header_text)
        
            let spoiler_contents_div = document.createElement("div")
            spoiler_contents_div.setAttribute("class", "ipsSpoiler_contents ipsClearfix")
            spoiler_contents_div.setAttribute("data-gramm", "false")
            spoiler_div.append(spoiler_contents_div)

            parent_element = spoiler_contents_div
        }

        else if (line.includes("[GIF=")) {
            let split_line = line.split(/\[GIF=(.*)\]/)
            let image_url = split_line[1]

            let image_p = document.createElement("p")
            image_p.setAttribute("style", "text-align: center;")
            parent_element.append(image_p)

            let image_img = document.createElement("img")
            image_img.setAttribute("src", image_url)
            image_p.append(image_img)
        }

        else if (line.includes("[COMMENTARY]")) {
            if (i != 0 && !(lines[i - 1].includes("[SPOILER]")) && !(lines[i - 1].includes("[COMMENTARY]"))) {
                parent_element.append(generate_empty_paragraph())
            }

            let line_p = document.createElement("p")
            parent_element.append(line_p)

            let line_strong = document.createElement("strong")
            line_p.append(line_strong)

            let line_text = document.createTextNode(line.replace("[COMMENTARY]", "").trim())
            line_strong.append(line_text)

            if (i != lines.length - 1) {
                parent_element.append(generate_empty_paragraph())
            }
        }

        else if (line.includes("[BLANK LINE]")) {
            parent_element.append(generate_empty_paragraph())
        }

        else {
            let line_p = document.createElement("p")
            parent_element.append(line_p)

            if (line.includes("[HOME TEAM HIGHLIGHT]")) {
                let line_strong = document.createElement("strong")
                line_p.append(line_strong)

                let line_span = document.createElement("span")
                line_span.setAttribute("style", `color: #ffffff; background-color: ${leagues[league]["Teams"][home_team]["Team Color Code"]};`)
                line_strong.append(line_span)

                let line_text = document.createTextNode("\u00A0" + line.replace("[HOME TEAM HIGHLIGHT]", "").trim() + "\u00A0")
                line_span.append(line_text)
            }

            else if (line.includes("[AWAY TEAM HIGHLIGHT]")) {
                let line_strong = document.createElement("strong")
                line_p.append(line_strong)

                let line_span = document.createElement("span")
                line_span.setAttribute("style", `color: #ffffff; background-color: ${leagues[league]["Teams"][away_team]["Team Color Code"]};`)
                line_strong.append(line_span)

                let line_text = document.createTextNode("\u00A0" + line.replace("[AWAY TEAM HIGHLIGHT]", "").trim() + "\u00A0")
                line_span.append(line_text)
            }

            else if (line.includes("[PENALTY HIGHLIGHT]")) {
                let line_span = document.createElement("span")
                line_span.setAttribute("style", "color: #000000; background-color: #ffff00;")
                line_p.append(line_span)

                let line_text = document.createTextNode("\u00A0" + line.replace("[PENALTY HIGHLIGHT]", "").trim() + "\u00A0")
                line_span.append(line_text)
            }

            else if (line.includes("[CLOCK STOPPAGE]")) {
                let line_u = document.createElement("u")
                line_p.append(line_u)

                let line_strong = document.createElement("strong")
                line_u.append(line_strong)

                let line_text = document.createTextNode(line.replace("[CLOCK STOPPAGE]", "").trim())
                line_strong.append(line_text)
            }

            else {
                let line_text = document.createTextNode(line)
                line_p.append(line_text)
            }
        }
    }

    var commentary = document.getElementById("commentary").value

    if (commentary != "") {
        if (!(lines[lines.length - 1].includes("[SPOILER]"))) {
            parent_element.append(generate_empty_paragraph())
        }

        var commentary_p = document.createElement("p")
        parent_element.append(commentary_p)

        var commentary_strong = document.createElement("strong")
        commentary_p.append(commentary_strong)

        var commentary_text = document.createTextNode(commentary)
        commentary_strong.append(commentary_text)
    }
    
    if (quarter.includes("End") || quarter.includes("Final")) {
        var time = ""
    }
    
    else {
        var time = get_scoreboard_time(lines)
    }

    if (quarter == "End Q1") {
        document.getElementById("quarter").value = "Q2"
    }

    else if (quarter == "End Q2") {
        document.getElementById("quarter").value = "Q3"
    }

    else if (quarter == "End Q3") {
        document.getElementById("quarter").value = "Q4"
    }

    else if (quarter == "End Q4") {
        document.getElementById("quarter").value = "OT"
    }

    parent_element.append(generate_empty_paragraph())
    parent_element.append(generate_scoreboard(away_team, away_score, home_team, home_score, quarter, time))

    document.getElementById("output").value = output_div.innerHTML
}

function get_scoreboard_time(lines) {
    /*
    Gets the proper time for the scoreboard by going through the lines from the
    original text input and finding the latest timestamp that appears.

    Parameters:
        lines (String Array): The list of lines in the original text input.

    Returns:
        A String containing the proper time for the scoreboard or an empty
        string if not timestamp can be found in the provided lines.
    */

    for (let i = lines.length - 1; i > -1; i--) {
        var line = lines[i]

        var split_line = line.split(/(\d+:\d{2})/)

        if (split_line.length == 3) {
            return split_line[1]
        }
    }

    return ""
}