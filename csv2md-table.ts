

function convertToMarkdown(csv: string, delimiter: string, alignColumns: boolean): string {

    csv = csv.replace(/\r/g, "")

    let lines = csv.split("\n").map((line) => { return line.split(delimiter) })
    
    let columnCount = lines.reduce((accumulator, line) => { return Math.max(line.length, accumulator) }, 0)

    let columnWidths = new Array<number>(columnCount)

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        let maxWidth = 1

        if (alignColumns) {
            for (let i = 0; i < lines.length; i++) {
    
                if (lines[i][columnIndex] == null) {
                    lines[i][columnIndex] = ""
                }
                maxWidth = Math.max(maxWidth, lines[i][columnIndex].length)
            }
        }

        columnWidths[columnIndex] = maxWidth
    }

    let md = ""

    for (let i = 0; i < lines.length; i++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    
            md += "| "
            md += lines[i][columnIndex].padEnd(columnWidths[columnIndex])
            md += " "
        }
        md += "|\n"
    
        if (i == 0) {
            for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        
                md += "| "
                md += "".padEnd(columnWidths[columnIndex], "-")
                md += " "
            }
            md += "|\n"
        }
    }


    return md
} 


function convert(): void {
    let file = (<HTMLInputElement>document.getElementById("csv")).files[0]

    let delimiter = (<HTMLInputElement>document.getElementById("delimiter")).value;

    let alignColumns = (<HTMLInputElement>document.getElementById("align-columns")).checked;

    let reader = new FileReader()

    reader.addEventListener("loadend", (e) => {
        let text = e.target.result.toString();

        let markdown = convertToMarkdown(text, delimiter, alignColumns);


        (<HTMLInputElement>document.getElementById("result")).value = markdown;
    })

    reader.readAsText(file);
}


function copy() {
    let text = (<HTMLInputElement>document.getElementById("result")).value;
    navigator.clipboard.writeText(text);
}
