
function calculate_first_way(){
    let h = document.getElementById("height").value;
    let a = document.getElementById("side").value;
    document.getElementById("result_first").value = a * h;
}

function calculate_second_way(){
    let a = document.getElementById("side1").value;
    let b = document.getElementById("side2").value;
    let x = document.getElementById("angle").value;
    var c = a * b * Math.sin((Math.PI * x) / 180);
    c = strip(c);
    document.getElementById("result_second").value = c;
}

function calculate_third_way(){
    let a = document.getElementById("diagonal1").value;
    let b = document.getElementById("diagonal2").value;
    let x = document.getElementById("angle_diagonal").value;
    var c = a * b * Math.sin((Math.PI * x) / 180) / 2;
    c = strip(c);
    document.getElementById("result_third").value = c;
}

function strip(num){
    return(parseFloat(num).toPrecision(12));
}

function sum_sequence(){
    let x = document.getElementById("element").value;
    let sum = 0;
    for (let i = 0, j = 1; i < 20; i++, j += 2){
        sum += x/j;
    }
    document.getElementById("result_sequence").value = strip(sum);
}


