function get_data(){
    let n = document.getElementById("dimension").value;
    let array = getArray(n);
    if (array == false){
        return;
    }
    let new_array = [];
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            new_array[i * n + j] = array[i][j];
        }
    }
    new_array = getResultArray(new_array);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            array[i][j] = new_array[i * n + j];
        }
    }


    let sorted_array = []
    for (let i = n - 1; i >= 0; i--){
        sorted_array[i] = [];
        for (let j = 0; j < n; j++){
            if (n % 2 == 0){
                if (i % 2 == 0) {
                    sorted_array[i][j] = array[i][j];
                }
                else {
                    sorted_array[i][n - j - 1] = array[i][j];
                }
            }
            else{
                if (i % 2 == 0) {
                    sorted_array[i][n - j - 1] = array[i][j];
                }
                else {
                    sorted_array[i][j] = array[i][j];
                }
            }
        }
   }    


    let table = '<table  align="center" style="font-size: 40px; " border="1">';
    for (let i = 0; i < n; i++){
       table += "<tr>";
       for (let j = 0; j < n; j++){
           table += "<td>" + sorted_array[i][j] + "</td>";
       }
       table += "</tr>";
    }
    table += "</table>";
    document.getElementById("sorted_table").innerHTML = table;
}

function getArray(n){
    let array = [];
    let min = document.getElementById("min_value").value;
    let max = document.getElementById("max_value").value;
    max++; // включительно чтобы было
    if (min >= max) {
        alert("Ты что наделол");
        return false;
    }
    for (let i = 0; i < n; i++){
        array[i] = [];
        for (let j = 0; j < n; j++){
            array[i][j] = getRandomInt(min, max);
        }
    }
    return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getResultArray(array){
    let b = array.sort(compare);
    return b;
}

function compare(a, b){
    return b - a;
}