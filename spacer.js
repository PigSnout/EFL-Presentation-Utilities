window.onload = main;

function main() {
    document.getElementById("space_button").onclick = spaceText;
}

function spaceText() {
    var lines = document.getElementById("original_text").value.split("\n");
    var output = "";
    for (var i = 0; i < lines.length; i++) {
        line = lines[i]
        split_line = line.split(/(\d+:\d{2})/)

        if (split_line.length == 3) {
            if (split_line[2].charAt(0) == " "){
                line = split_line[1] + split_line[2]
            }
            else{
                line = split_line[1] + " " + split_line[2]                
            }
        }

        split_line = line.split(/((1st|2nd|3rd|4th) and (\d+|Goal))/)

        if (split_line.length == 5) {
            line = split_line[0] + split_line[1] + " " + split_line[4]
        }

        split_line = line.split(/(- \d+)/)

        if (line.includes("FG")){
            if (split_line[1].length == 5){
                line = split_line[0] + split_line[1].substr(0, 3) + " " + split_line[1].substr(3, 2) + split_line[2]
            }
            else {
                line = split_line[0] + split_line[1].substr(0, 4) + " " + split_line[1].substr(4, 2) + split_line[2]
            }
            console.log(split_line)
            console.log(split_line[1].length)
        }
        else{
            if (split_line.length == 3) {
                line = split_line[0] + split_line[1] + " " + split_line[2]
            }
            else if (split_line.length == 5){
                line = split_line[0] + split_line[1] + " " + split_line[2] + split_line[3] + split_line[4]
            }
        }

        split_line = line.split(/(---)/)
        if (split_line.length == 3) {
            line = split_line[0] + split_line[1] + " " + split_line[2]
        }

        output += line + "\n"
    }
    document.getElementById("spaced_text").value = output.trim();
}