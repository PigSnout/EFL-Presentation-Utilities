window.onload = main

function main() {
    /*
    Initialization function that runs when the page loads
    */

    generate_navbar_html()

    document.getElementById("generate_output_button").onclick = fix_text
}

function fix_text() {
    /*
    Fixes the format of text that has been input in the original text input
    and displays the fixed version in the updated text output.
    */

    var lines = document.getElementById("original_text").value.split("\n")
    lines = remove_empty_lines(lines)

    var output = ""

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        if (line != "") {
            line = fix_line_spacing(line)

            if(line.includes(": Timeout") || line.includes("Turnover on downs.") || line.includes("spikes the ball to stop the clock")) {
                line = fix_line_time(line, lines[i + 1])
            }
        }

        output += line + "\n"
    }

    document.getElementById("output").value = output.trim()
}

function fix_line_spacing(line) {
    /*
    Fixes the spacing in the given line.

    Parameters:
        line (String): The line whose spacing needs to be fixed.

    Returns:
        An String containing the original line with the spacing corrected.
    */

    // Splits the line after the time.
    
    var split_line = line.split(/(\d+:\d{2})/)

    // Checks if there is already a space after the time (This will occur in
    // the first line of the quarter, so a new space is not neccessary there)
    
    if (split_line.length == 3) {
        line = `${split_line[1].trim()} ${split_line[2].trim()}`
    }

    // Splits the line after the down and distance.
    
    split_line = line.split(/((1st|2nd|3rd|4th) and (\d+|Goal))/)

    // Adds an extra space if the line contains a down and distance (Some
    // plays, such as kickoffs, do not contain down and distance so it is not
    // needed on those lines)
    
    if (split_line.length == 5) {
        line = `${split_line[0].trim()} ${split_line[1].trim()} ${split_line[4].trim()}`
    }

    // Splits the line after the yard line number
    
    split_line = line.split(/(- \d+)/)

    // Field goal plays will have the field goal yardage right next to the yard
    // line number, so we must split the number separately because those two
    // numbers will get combined together
    
    if (line.includes("FG")) {
        if (split_line[1].length == 5) {
            line = `${split_line[0].trim()} ${split_line[1].substr(0, 3)} ${split_line[1].substr(3, 2)} ${split_line[2].trim()}`
        }

        else if (split_line[1].length == 6){
            line = `${split_line[0].trim()} ${split_line[1].substr(0, 4)} ${split_line[1].substr(4, 2)} ${split_line[2].trim()}`
        }
    }
    
    // If the play has a yardage number later in that line, it will also be
    // caught by the regular expression, so there will be extra entries in
    // the array that need to be added back
    
    else {
        if (split_line.length == 3) {
            line = `${split_line[0].trim()} ${split_line[1].trim()} ${split_line[2].trim()}`
        }
        else if (split_line.length == 5) {
            line = `${split_line[0].trim()} ${split_line[1].trim()} ${split_line[2].trim()} ${split_line[3].trim()} ${split_line[4].trim()}`
        }
    }

    // Kickoff plays have additional dashes that need to have a space added after them
    
    split_line = line.split(/(---)/)

    if (split_line.length == 3) {
        line = `${split_line[0].trim()} ${split_line[1].trim()} ${split_line[2].trim()}`
    }

    return line
}

function fix_line_time(line, next_line) {
    /*
    Fixes a line that should have the timestamp present in the following line
    by replacing its timestamp with the correct timestamp.

    Parameters:
        line (String): The line that contains the incorrect timestamp.
        next_line (String): The following line which contains the correct
            timestamp for the original line.

    Returns:
        An String containing the original line with its timestamp replaced with
        the correct timestamp.
    */

    // Split both lines into two halves: the time and the rest of the line
    // after the time.
    
    var split_line = line.split(/(\d+:\d{2})/)
    var split_next_line = next_line.split(/(\d+:\d{2})/)

    var fixed_line = `${split_next_line[1]}${split_line[2]}`

    return fixed_line
}