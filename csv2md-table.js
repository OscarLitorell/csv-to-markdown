function convertToMarkdown(csv, delimiter, alignColumns) {
    csv = csv.replace(/\r/g, "");
    var lines = csv.split("\n").map(function (line) { return line.split(delimiter); });
    var columnCount = lines.reduce(function (accumulator, line) { return Math.max(line.length, accumulator); }, 0);
    var columnWidths = new Array(columnCount);
    for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        var maxWidth = 1;
        if (alignColumns) {
            for (var i = 0; i < lines.length; i++) {
                if (lines[i][columnIndex] == null) {
                    lines[i][columnIndex] = "";
                }
                maxWidth = Math.max(maxWidth, lines[i][columnIndex].length);
            }
        }
        columnWidths[columnIndex] = maxWidth;
    }
    var md = "";
    for (var i = 0; i < lines.length; i++) {
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            md += "| ";
            md += lines[i][columnIndex].padEnd(columnWidths[columnIndex]);
            md += " ";
        }
        md += "|\n";
        if (i == 0) {
            for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                md += "| ";
                md += "".padEnd(columnWidths[columnIndex], "-");
                md += " ";
            }
            md += "|\n";
        }
    }
    return md;
}
function convert() {
    var file = document.getElementById("csv").files[0];
    var delimiter = document.getElementById("delimiter").value;
    var alignColumns = document.getElementById("align-columns").checked;
    var reader = new FileReader();
    reader.addEventListener("loadend", function (e) {
        var text = e.target.result.toString();
        var markdown = convertToMarkdown(text, delimiter, alignColumns);
        document.getElementById("result").value = markdown;
    });
    reader.readAsText(file);
}
function copy() {
    var text = document.getElementById("result").value;
    navigator.clipboard.writeText(text);
}
