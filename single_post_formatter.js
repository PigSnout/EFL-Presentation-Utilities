window.onload = main

function main() {
    generateScoreboardDiv()

    document.getElementById("spoiler_button").onclick = generateSpoilerTag
    document.getElementById("gif_button").onclick = generateGIFTag
    document.getElementById("generate_output_button").onclick = generateOutput
    document.getElementById("league").oninput = generateScoreboardDiv
}

function generateOutput() {
    var lines = document.getElementById("original_text").value.split("\n")
    lines = removeEmptyLines(lines)

    var output_div = document.createElement("div")
    var parent_element = output_div

    for (var i = 0; i < lines.length; i++) {
        line = lines[i]

        if (line.includes("[SPOILER]")) {
            if (i != 0) {
                parent_element.appendChild(generateEmptyParagraph())
            }

            var spoiler_div = document.createElement("div")
            spoiler_div.setAttribute("class", "ipsSpoiler")
            spoiler_div.setAttribute("data-ipsspoiler", "")
            parent_element.appendChild(spoiler_div)
        
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

            parent_element = spoiler_contents_div
        }

        else if (line.includes("[GIF=")) {
            var split_line = line.split(/\[GIF=(.*)\]/)
            var image_url = split_line[1]

            var image_p = document.createElement("p")
            image_p.setAttribute("style", "text-align: center;")
            parent_element.appendChild(image_p)

            var image_img = document.createElement("img")
            image_img.setAttribute("src", image_url)
            image_p.appendChild(image_img)
        }

        else {
            line_p = document.createElement("p")
            parent_element.appendChild (line_p)

            line_text = document.createTextNode(line)
            line_p.appendChild(line_text)
        }
    }

    var commentary = document.getElementById("commentary").value

    if (commentary != "") {
        parent_element.appendChild(generateEmptyParagraph())

        var commentary_p = document.createElement("p")
        parent_element.appendChild(commentary_p)

        var commentary_strong = document.createElement("strong")
        commentary_p.appendChild(commentary_strong)

        var commentary_text = document.createTextNode(commentary)
        commentary_strong.appendChild(commentary_text)
    }

    var league = document.getElementById("league").value
    var away_team = document.getElementById("away_team").value
    var away_score = document.getElementById("away_score").value
    var home_team = document.getElementById("home_team").value
    var home_score = document.getElementById("home_score").value
    var quarter = document.getElementById("quarter").value
    
    if (quarter.includes("End") || quarter.includes("Final")) {
        var time = ""
    }
    else {
        var time = getScoreboardTime(lines)
    }

    parent_element.appendChild(generateEmptyParagraph())
    parent_element.appendChild(generateScoreboard(league, away_team, away_score, home_team, home_score, quarter, time))

    document.getElementById("output").value = output_div.innerHTML
}

function generateSpoilerTag() {
    var original_text = document.getElementById("original_text")

    var position = original_text.selectionStart
    var text = original_text.value
    var first_half = text.substring(0, position)
    var second_half = text.substring(position, text.length)
    
    if (position == 0) {
        var spoiler_tag = "[SPOILER]\n"
    }
    else {
        var spoiler_tag = "\n[SPOILER]\n"
    }

    original_text.value = first_half + spoiler_tag + second_half
}

function generateGIFTag() {
    var url = prompt("Enter the URL of the GIF")

    var original_text = document.getElementById("original_text")

    var position = original_text.selectionStart
    var text = original_text.value
    var first_half = text.substring(0, position)
    var second_half = text.substring(position, text.length)
    if (position == 0) {
        var gif_tag = `[SPOILER]\n\n[GIF=${url}]\n\n[SPOILER]\n`
    }
    else {
        var gif_tag = `\n[SPOILER]\n\n[GIF=${url}]\n\n[SPOILER]\n`
    }

    original_text.value = first_half + gif_tag + second_half
}

// function generateTimeInput() {
//     var quarter = document.getElementById("quarter").value

//     var time_input = document.createElement("input")
//     time_input.setAttribute("id", "time")
//     time_input.setAttribute("type", "text")
//     time_input.setAttribute("size", "5")
//     time_input.setAttribute("maxlength", "5")

//     if (quarter.includes("End") || quarter == "Final") {
//         time_input.setAttribute("disabled", "true")
//     }
//     else {
//         time_input.setAttribute("value", "15:00")
//     }

//     var old_time_input = document.getElementById("time")
//     var inputs_div = document.getElementById("inputs")
//     inputs_div.replaceChild(time_input, old_time_input)
// }

function generateScoreboardDiv() {
    var scoreboard_div = document.createElement("div")
    scoreboard_div.setAttribute("id", "scoreboard")

    var away_team_text = document.createTextNode("Away Team: ")
    scoreboard_div.appendChild(away_team_text)
    
    var away_team_select = generateTeamsSelect()
    away_team_select.setAttribute("id", "away_team")
    scoreboard_div.appendChild(away_team_select)

    var away_score_text = document.createTextNode(" Away Score: ")
    scoreboard_div.appendChild(away_score_text)
    
    var away_score_input = document.createElement("input")
    away_score_input.setAttribute("id", "away_score")
    away_score_input.setAttribute("type", "number")
    scoreboard_div.appendChild(away_score_input)

    var home_team_text = document.createTextNode(" Home Team: ")
    scoreboard_div.appendChild(home_team_text)
    
    var home_team_select = generateTeamsSelect()
    home_team_select.setAttribute("id", "home_team")
    scoreboard_div.appendChild(home_team_select)

    var home_score_text = document.createTextNode(" Home Score: ")
    scoreboard_div.appendChild(home_score_text)
    
    var home_score_input = document.createElement("input")
    home_score_input.setAttribute("id", "home_score")
    home_score_input.setAttribute("type", "number")
    scoreboard_div.appendChild(home_score_input)

    var old_scoreboard_div = document.getElementById("scoreboard")
    var inputs_div = document.getElementById("inputs")
    inputs_div.replaceChild(scoreboard_div, old_scoreboard_div)
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

function removeEmptyLines(lines) {
    var new_lines = []

    for (var i = 0; i < lines.length; i++) {
        line = lines[i]

        if (line != "") {
            new_lines.push(line)
        }
    }

    return new_lines
}

function generateEmptyParagraph() {
    var empty_paragraph_p = document.createElement("p")

    var empty_paragraph_text = document.createTextNode("\u00A0")
    empty_paragraph_p.appendChild(empty_paragraph_text)

    return empty_paragraph_p
}

function getScoreboardTime(lines) {
    for (i = lines.length - 1; i > -1; i--) {
        var line = lines[i]

        var split_line = line.split(/(\d+:\d{2})/)

        if (split_line.length == 3) {
            return split_line[1]
        }
    }

    return ""
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