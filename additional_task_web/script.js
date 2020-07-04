var canvas, ctx;
var mouseCoords = {
    x: 0,
    y: 0
};
var year = new Date().getFullYear(), month = new Date().getMonth();
var in_coords = false;

function tick(){
    Calendar(year, month);
    timerId = setTimeout(tick, 200);
}

function init(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        drawBack(ctx, '#f702ff', '#fe2353', canvas.width, canvas.height);
        Calendar(year, month);
    }
    var timerId = setTimeout(tick, 200);
    let timerId_1 = setTimeout(function clear(){
        clearTimeout(timerId);
        timerId = setTimeout(tick, 200);
    }, 10000)
}

function drawBack(ctx, c1, c2, w, h) {
    // закрашиваем канвас градиентным фоном
    ctx.save();
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(1, c1);
    g.addColorStop(0.1 , c2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
}


function Calendar(year, month){
    drawBack(ctx, '#f702ff', '#fe2353', canvas.width, canvas.height);
    ctx.font = "30px Verdana";


    let Dlast = new Date(year, month + 1, 0).getDate(),
        D = new Date(year, month, Dlast),
        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(), // пробелы в первой неделе
        month_names = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    
    let w_space = 30, h_space = 200;
    var DlastMlast = new Date(year, month, 0).getDate();


    if (DNfirst != 0) {//пробелы для первой недели
        for (let i = 1; i < DNfirst; i++) {
            ctx.save();
            let kol_w = 30;
            let kol_h = 40;
            ctx.fillStyle = '#999999'
            if (mouseCoords.x >= w_space - kol_w && mouseCoords.x <= w_space + 100 - kol_w && mouseCoords.y >= h_space - 100 + kol_h && mouseCoords.y <= h_space + kol_h){
                ctx.fillStyle = '#bbbbbb';  
            }
            ctx.fillRect(w_space - kol_w, h_space + kol_h, 100, -100);
            ctx.moveTo(w_space - kol_w, h_space + kol_h);
            ctx.lineTo(w_space + 100 - kol_w, h_space + kol_h);
            ctx.lineTo(w_space + 100 - kol_w, h_space - 100 + kol_h);
            ctx.lineTo(w_space - kol_w, h_space - 100 + kol_h);
            ctx.lineTo(w_space - kol_w, h_space + kol_h);
            ctx.stroke();
            ctx.fillStyle = '#666666';


            
            ctx.fillText(DlastMlast - DNfirst + i + 1, w_space, h_space);
            ctx.restore();
            w_space += 100;
        };
    } else {
        for (let i = 0; i < 6; i++) {
            ctx.save();
            let kol_w = 30;
            let kol_h = 40;
            ctx.fillStyle = '#999999'
            if (mouseCoords.x >= w_space - kol_w && mouseCoords.x <= w_space + 100 - kol_w && mouseCoords.y >= h_space - 100 + kol_h && mouseCoords.y <= h_space + kol_h) {
                ctx.fillStyle = '#bbbbbb';
            }
            ctx.beginPath();
            ctx.fillRect(w_space - kol_w, h_space + kol_h, 100, -100);
            ctx.moveTo(w_space - kol_w, h_space + kol_h);
            ctx.lineTo(w_space + 100 - kol_w, h_space + kol_h);
            ctx.lineTo(w_space + 100 - kol_w, h_space - 100 + kol_h);
            ctx.lineTo(w_space - kol_w, h_space - 100 + kol_h);
            ctx.lineTo(w_space - kol_w, h_space + kol_h);
            ctx.stroke();
            ctx.fillStyle = '#666666';


            ctx.fillText(DlastMlast - 5 + i + 1, w_space, h_space);
            ctx.closePath();
            ctx.restore();
            w_space += 100;
        };
    }
    
    let kol_w = 30;
    let kol_h = 40;
    for (var i = 1; i <= Dlast; i++) {//заполнение дней

        

        if (mouseCoords.x >= w_space - kol_w && mouseCoords.x <= w_space + 100 - kol_w && mouseCoords.y >= h_space - 100 + kol_h && mouseCoords.y <= h_space + kol_h) {
           in_coords = true;
        }

        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0 || new Date(D.getFullYear(), D.getMonth(), i).getDay() == 6){
            ctx.fillStyle = '#ff7777';
            if(in_coords){
                ctx.fillStyle = '#ff3333';
            }
        }
        else {
            ctx.fillStyle = '#ffffff'
            if(in_coords){
                ctx.fillStyle = '#cccccc'
            }
        }
        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            ctx.fillStyle = '#7777ff';
            if (in_coords){
                ctx.fillStyle = '#3333ff';
            }
        }
        


        
        ctx.beginPath();
        
        ctx.fillRect(w_space - kol_w, h_space + kol_h, 100, -100);
        ctx.moveTo(w_space - kol_w, h_space + kol_h);
        ctx.lineTo(w_space + 100 - kol_w, h_space + kol_h);
        ctx.lineTo(w_space + 100 - kol_w, h_space - 100 + kol_h);
        ctx.lineTo(w_space - kol_w, h_space - 100 + kol_h);
        ctx.lineTo(w_space - kol_w, h_space + kol_h);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#000000';
        ctx.fillText(i, w_space, h_space);
        
        in_coords = false;
        w_space += 100;
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {//если неделя закончилась
            w_space = 30;
            h_space += 100;
            
        }
        
    }

    i = 1;
    while (new Date(D.getFullYear(), D.getMonth() + 1, i).getDay() != 1){


        ctx.save();
        let kol_w = 30;
        let kol_h = 40;
        ctx.fillStyle = '#999999'
        if (mouseCoords.x >= w_space - kol_w && mouseCoords.x <= w_space + 100 - kol_w && mouseCoords.y >= h_space - 100 + kol_h && mouseCoords.y <= h_space + kol_h) {
            ctx.fillStyle = '#bbbbbb';
        }
        ctx.beginPath();
        ctx.fillRect(w_space - kol_w, h_space + kol_h, 100, -100);
        ctx.moveTo(w_space - kol_w, h_space + kol_h);
        ctx.lineTo(w_space + 100 - kol_w, h_space + kol_h);
        ctx.lineTo(w_space + 100 - kol_w, h_space - 100 + kol_h);
        ctx.lineTo(w_space - kol_w, h_space - 100 + kol_h);
        ctx.lineTo(w_space - kol_w, h_space + kol_h);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.fillStyle = '#666666';
        ctx.fillText(i, w_space, h_space);
        w_space += 100;
        i++;

    }




    ctx.fillStyle = '#000000';
    ctx.fillText(month_names[D.getMonth()], 290, 115);
    ctx.fillText(D.getFullYear(), 300, 85);

    if (mouseCoords.x > 200 && mouseCoords.x < 250 && mouseCoords.y > 70 && mouseCoords.y < 110 ||
    mouseCoords.x > 450 && mouseCoords.x < 500 && mouseCoords.y > 70 && mouseCoords.y < 110) {
        canvas.style.cursor = 'pointer';
    }
    else{
        canvas.style.cursor = 'default'
    }
    ctx.fillStyle = '#000000';
    ctx.fillText('<', 200, 100);
    ctx.fillText('>', 450, 100);
}



// var mouseCoords = {
//     x: 0,
//     y: 0
// };
function push(){
    if (mouseCoords.x > 200 && mouseCoords.x < 250 && mouseCoords.y > 70 && mouseCoords.y < 110){ // нажали на кнопку прошлого месяца
        
        month -= 1;
        return;
    }
    if (mouseCoords.x > 450 && mouseCoords.x < 500 && mouseCoords.y > 70 && mouseCoords.y < 110) { // нажали на кнопку следующего месяца
        
        month += 1;
        return;
    }
};
