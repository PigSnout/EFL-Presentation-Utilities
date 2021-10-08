window.onload = main

function main() {
    document.getElementById("generate_output_button").onclick = spaceText
}

function spaceText() {
    var lines = document.getElementById("original_text").value.split("\n")
    var output = ""
    for (var i = 0; i < lines.length; i++) {
        line = lines[i]

        if (line != "") {
            line = spaceLine(line)

            if(line.includes(": Timeout") || line.includes("Turnover on downs.") || line.includes("spikes the ball to stop the clock")) {
                line = fixTime(line, lines[i + 2])
            }
        }

        output += line + "\n"
    }
    document.getElementById("output").value = output.trim()
}

function spaceLine(line) {
    // Splits the line after the time
    var split_line = line.split(/(\d+:\d{2})/)

    // Checks if there is already a space after the time (This will occur
    // in the first line of the quarter, so a new space is not neccessary 
    // there)
    if (split_line.length == 3) {
        if (split_line[2].charAt(0) == " "){
            line = split_line[1] + split_line[2]
        }
        else{
            line = split_line[1] + " " + split_line[2]                
        }
    }

    // Splits the line after the down and distance
    split_line = line.split(/((1st|2nd|3rd|4th) and (\d+|Goal))/)

    // Adds an extra space if the line contains a down and distance (Some
    // plays, such as kickoffs, do not contain down and distance so it is
    // not needed on those lines)
    if (split_line.length == 5) {
        line = split_line[0] + split_line[1] + " " + split_line[4]
    }

    // Splits the line after the yard line number
    split_line = line.split(/(- \d+)/)

    // Field goal plays will have the field goal yardage right next to the
    // yard line number, so we must split the number separately because
    // those two numbers will get combined together
    if (line.includes("FG")){
        if (split_line[1].length == 5) {
            line = split_line[0] + split_line[1].substr(0, 3) + " " + split_line[1].substr(3, 2) + split_line[2]
        }
        else {
            line = split_line[0] + split_line[1].substr(0, 4) + " " + split_line[1].substr(4, 2) + split_line[2]
        }
    }
    // If the play has a yardage number later in that line, it will also be
    // caught by the regular expression, so there will be extra entries in
    // the array that need to be added back
    else {
        if (split_line.length == 3) {
            line = split_line[0] + split_line[1] + " " + split_line[2]
        }
        else if (split_line.length == 5) {
            line = split_line[0] + split_line[1] + " " + split_line[2] + split_line[3] + split_line[4]
        }
    }

    // Kickoff plays have additional dashes that need to have a space added after them
    split_line = line.split(/(---)/)
    if (split_line.length == 3) {
        line = split_line[0] + split_line[1] + " " + split_line[2]
    }

    return line
}

function fixTime(line, next_line) {
    split_line = line.split(/(\d+:\d{2})/)
    split_next_line = next_line.split(/(\d+:\d{2})/)

    fixed_line = split_next_line[1] + split_line[2]

    return fixed_line
}