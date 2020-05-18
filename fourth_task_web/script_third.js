var old_table = ' ', new_table = ' ';
var array = [];
var rows = 8, cols = 8
for (let i = 0; i < rows; i++) {
    array[i] = []
    old_table += '<tr>';
    new_table += '<tr>';
    for (let j = 0; j < cols; j++) {
        array[i][j] = getRandomInt(-500,500);
        old_table += '<td>' + array[i][j] + '</td>';
        

    }
    array[i].sort(compare);
    for (let j = 0; j < cols; j++){
        new_table += '<td>' + array[i][j] + '</td>';
    }
    old_table += '</tr>';
    new_table += '</tr>';
}
var first_table = '<table align="center" style="font-size: 40px;" border="1">' + old_table + '</table>';
document.getElementById("prev_table").innerHTML = first_table;

function sort_by_row() {
    var second_table = '<table align="center" style="font-size: 40px;" border="1">' + new_table + '</table>';
    document.getElementById("new_table").innerHTML = second_table;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function compare(a, b){
    return a - b;
}