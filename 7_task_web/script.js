var canvas, ctx;
var idTimer;
var was_started = false, shoot = false;
var mouseCoords = {
    x: 0,
    y: 0
};
var sea_waves = true;
var was_volley_bought = false;
var was_big_gun_bought = false;
var is_player_changed = true;
var is_game_over = false;
var wave_change = 0;
var shells = []
var ships = []
var enemy_shoots = []
var is_shop = false;

var count_of_shells = 4;

var coins = 0;
var player_health = 10;
var player_name = '';
var player_score = 0;
var game_difficulty = 1;


var reloading = 0;
var shooted_shells = 0;


class Gun {
    constructor(pX, pY){
        this.posX = pX;
        this.posY = pY;
    }
}

class StartGun extends Gun{ 
    constructor(pX, pY){
        super(pX, pY);
        this.color = '#2F4F4F'
        this.offset;
        this.angle;
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.posX + 10, this.posY);
        this.offset = {
            dx: mouseCoords.x - this.posX,
            dy: mouseCoords.y - this.posY
        };
        
        this.angle = Math.atan(this.offset.dy / this.offset.dx);
        if (this.offset.dx < 0) {
            this.angle += Math.PI;
        }
        if (this.offset.dy > 5 / 3 * this.offset.dx || (this.offset.dx < 0 && this.offset.dy > 0)) {
            this.angle = 1.0303768265243125;
        }
        else if (this.offset.dy < - 5 / 3 * this.offset.dx || (this.offset.dx < 0 && this.offset.dy < 0)) {
            this.angle = -1.0303768265243125;
        }
        if (was_started)
            ctx.rotate(this.angle);
        else
            ctx.rotate(0);

        ctx.fillStyle = this.color;
        ctx.arc(-10, 0, 10, Math.PI / 2, 3 * Math.PI / 2, false);
        ctx.lineTo(-10, 0 + 10)
        ctx.lineTo(-10 + 20, 0 + 10);
        ctx.lineTo(-10 + 70, 0 + 7);
        ctx.lineTo(-10 + 70, 0 - 7);
        ctx.lineTo(-10 + 20, 0 - 10);
        ctx.lineTo(-10, 0 - 10);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}


class BigGun extends Gun { 
    constructor(pX, pY) {
        super(pX, pY);
        this.color = '#2F4F4F'
        this.offset;
        this.angle;
    }

    draw(ctx, angle) {
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.posX + 10, this.posY);
        this.offset = {
            dx: mouseCoords.x - this.posX,
            dy: mouseCoords.y - this.posY
        };

        this.angle = Math.atan(this.offset.dy / this.offset.dx);
        if (this.offset.dx < 0) {
            this.angle += Math.PI;
        }
        if (this.offset.dy > 5 / 3 * this.offset.dx || (this.offset.dx < 0 && this.offset.dy > 0)) {
            this.angle = 1.0303768265243125;
        }
        else if (this.offset.dy < - 5 / 3 * this.offset.dx || (this.offset.dx < 0 && this.offset.dy < 0)) {
            this.angle = -1.0303768265243125;
        }

            if (was_started && angle != 0)
            ctx.rotate(this.angle);
        else
            ctx.rotate(0);

        ctx.fillStyle = this.color;
        ctx.arc(-10, 0, 20, Math.PI / 2, 3 * Math.PI / 2, false);
        ctx.lineTo(-10, 0 + 20)
        ctx.lineTo(-10 + 20, 0 + 20);
        ctx.lineTo(-10 + 100, 0 + 15);
        ctx.lineTo(-10 + 100, 0 - 15);
        ctx.lineTo(-10 + 20, 0 - 20);
        ctx.lineTo(-10, 0 - 20);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}


class Enemy{
    constructor(pX, pY){
        this.posX = pX;
        this.posY = pY;
        this.poly;
    }
}

class SmallShip extends Enemy{
    constructor(pX, pY){
        super(pX, pY);
        this.health = 3;
        this.limit = false;
        this.recoil = 0;
        this.speed = 1
    }

    draw(ctx){

        if (this.posX > 500){
            ctx.save();
            ctx.beginPath();

            ctx.moveTo(this.posX, this.posY - 60);
            ctx.lineTo(this.posX - 80, this.posY - 60);
            ctx.lineTo(this.posX - 60, this.posY - 35);
            ctx.lineTo(this.posX - 10, this.posY - 35);
            ctx.lineTo(this.posX, this.posY - 60);
            ctx.fillStyle = '#708090';
            ctx.fill();
            ctx.moveTo(this.posX - 40, this.posY - 60);
            ctx.lineTo(this.posX - 40, this.posY - 100);
            ctx.stroke();
            ctx.quadraticCurveTo(this.posX - 50, this.posY - 85, this.posX - 40, this.posY - 70);
            ctx.stroke();

            ctx.closePath();
            ctx.restore();
            var prevY = this.posY;
            this.posY += Math.random() * 2 - 1;
            if (this.posY < canvas.height - 23 || this.posY > canvas.height - 17){
                this.posY = prevY;
            }
            
            this.posX -= this.speed;
        }
        else{
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.posX, this.posY - 60);
            ctx.lineTo(this.posX - 30, this.posY - 60);
            ctx.lineTo(this.posX - 25, this.posY - 35);
            ctx.lineTo(this.posX - 5, this.posY - 35);
            ctx.lineTo(this.posX, this.posY - 60);
            ctx.fillStyle = '#708090';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(this.posX - 15, this.posY - 60);
            ctx.lineTo(this.posX - 15, this.posY - 100);
            ctx.fillStyle = '#FFFFFF';
            ctx.lineTo(this.posX, this.posY - 100);
            ctx.lineTo(this.posX - 3, this.posY - 70);
            ctx.lineTo(this.posX - 27 , this.posY - 70);
            ctx.lineTo(this.posX - 30, this.posY - 100);
            ctx.lineTo(this.posX - 15, this.posY - 100);
            ctx.fill();
            ctx.stroke();

            ctx.closePath()
            ctx.restore();
            this.limit = true;
        }
    
    }


}

class BigShip extends Enemy {
    constructor(pX, pY) {
        super(pX, pY);
        this.health = 10;
        this.limit = false;
        this.recoil = 0;
        this.speed = 1 / 2;
    }

    draw(ctx) {

        if (this.posX > 700) {
            ctx.save();
            ctx.beginPath();

            ctx.moveTo(this.posX, this.posY - 70);
            ctx.lineTo(this.posX - 180, this.posY - 70);
            ctx.lineTo(this.posX - 160, this.posY - 25);
            ctx.lineTo(this.posX - 10, this.posY - 25);
            ctx.lineTo(this.posX, this.posY - 70);
            ctx.fillStyle = '#708090';
            ctx.fill();
            ctx.moveTo(this.posX - 50, this.posY - 70);
            ctx.lineTo(this.posX - 50, this.posY - 150);
            ctx.quadraticCurveTo(this.posX - 60, this.posY - 110, this.posX - 50, this.posY - 80);
            ctx.stroke();
            ctx.moveTo(this.posX - 100, this.posY - 70);

            ctx.lineTo(this.posX - 100, this.posY - 200);
            ctx.quadraticCurveTo(this.posX - 110, this.posY - 180, this.posX - 100, this.posY - 160);
            ctx.quadraticCurveTo(this.posX - 115, this.posY - 135, this.posX - 100, this.posY - 100);
            ctx.stroke();

            ctx.closePath();
            ctx.restore();
            var prevY = this.posY;
            this.posY += Math.random() * 2 - 1;
            if (this.posY < canvas.height - 23 || this.posY > canvas.height - 17) {
                this.posY = prevY;
            }
            
            this.posX -= this.speed;
        }
        else {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.posX, this.posY - 70);
            ctx.lineTo(this.posX - 60, this.posY - 70);
            ctx.lineTo(this.posX - 50, this.posY - 25);
            ctx.lineTo(this.posX - 10, this.posY - 25);
            ctx.lineTo(this.posX, this.posY - 70);
            ctx.fillStyle = '#708090';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath(); 
            ctx.fillStyle = '#FFFFFF';
            ctx.moveTo(this.posX - 30, this.posY - 70);
            ctx.lineTo(this.posX - 30, this.posY - 200);

            ctx.lineTo(this.posX, this.posY - 200);
            ctx.lineTo(this.posX - 6, this.posY - 100);
            ctx.lineTo(this.posX - 53, this.posY - 100);
            ctx.lineTo(this.posX - 60, this.posY - 200);
            ctx.lineTo(this.posX - 30, this.posY - 200);
            ctx.fill();
            ctx.stroke();

            ctx.closePath()
            ctx.moveTo(this.posX - 60, this.posY - 160);
            ctx.lineTo(this.posX, this.posY - 160);
            ctx.stroke();
            ctx.restore();
            this.limit = true;
        }

    }


}


class EnemyShoot{
    constructor(pX, pY){
        this.posX = pX;
        this.posY = pY;
        this.rBall = 5;
        this.angle =  Math.random() * Math.PI / 3 + Math.PI + 0.2;
        this.timer = 0;
        this.created = true;
        this.x0, this.y0;
        this.gunX = pX, this.gunY = pY;
        
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();


        if (this.created) {
            this.x0 = this.posX - 40 +  Math.cos(this.angle);
            this.y0 = this.posY  - 40 +  Math.sin(this.angle);
        }
        this.posX = this.x0 + 100 * this.timer * Math.cos(this.angle);
        this.posY = this.y0 + 100 * this.timer * Math.sin(this.angle) + 4.9 * this.timer * this.timer;
        this.created = false;


        this.timer += 1 / 8

        this.gradient = ctx.createRadialGradient(this.posX + this.rBall / 4, this.posY - this.rBall / 6, this.rBall / 8, this.posX, this.posY, this.rBall);
        this.gradient.addColorStop(0, '#FFFFFF');
        this.gradient.addColorStop(0.5, '#111111');

        ctx.fillStyle = this.gradient;
        ctx.arc(this.posX, this.posY, this.rBall, 0, 2 * Math.PI, false);
        this.created = false;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

    }

}


class Shell{
    constructor(pX, pY, angle){
        this.posX = pX;
        this.posY = pY;
        this.rBall = 7;
        this.created = true;
        this.angle = angle;
        this.timer = 0;
        this.x0, this.y0;
    }

    draw(ctx){
        ctx.save();   
        ctx.beginPath();
        

        if (this.created){
            this.x0 = this.posX + 70 * Math.cos(this.angle);
            this.y0 = this.posY + 70 * Math.sin(this.angle);
        }
        this.posX = this.x0 + 100 * this.timer * Math.cos(this.angle);
        this.posY = this.y0 + 100 * this.timer * Math.sin(this.angle) + 4.9 * this.timer * this.timer;
        this.created = false;
        
        
        this.timer += 1/8

        this.gradient = ctx.createRadialGradient(this.posX + this.rBall / 4, this.posY - this.rBall / 6, this.rBall / 8, this.posX, this.posY, this.rBall);
        this.gradient.addColorStop(0, '#FFFFFF');
        this.gradient.addColorStop(0.5, '#111111');
        
        ctx.fillStyle = this.gradient;
        ctx.arc(this.posX, this.posY, this.rBall, 0, 2 * Math.PI, false);
        this.created = false;
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        
    }
}


class BigShell {
    constructor(pX, pY, angle) {
        this.posX = pX;
        this.posY = pY;
        this.rBall = 15;
        this.created = true;
        this.angle = angle;
        this.timer = 0;
        this.x0, this.y0;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();


        if (this.created) {
            this.x0 = this.posX + 90 * Math.cos(this.angle);
            this.y0 = this.posY + 90 * Math.sin(this.angle);
        }
        this.posX = this.x0 + 100 * this.timer * Math.cos(this.angle);
        this.posY = this.y0 + 100 * this.timer * Math.sin(this.angle) + 4.9 * this.timer * this.timer;
        this.created = false;


        this.timer += 1 / 8

        this.gradient = ctx.createRadialGradient(this.posX + this.rBall / 4, this.posY - this.rBall / 6, this.rBall / 8, this.posX, this.posY, this.rBall);
        this.gradient.addColorStop(0, '#FFFFFF');
        this.gradient.addColorStop(0.5, '#111111');

        ctx.fillStyle = this.gradient;
        ctx.arc(this.posX, this.posY, this.rBall, 0, 2 * Math.PI, false);
        this.created = false;
        ctx.closePath();
        ctx.fill();
        ctx.restore();

    }
}




function init(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        drawBack(ctx, canvas.width, canvas.height); // рисуем фон
        // переделать, волны должны быть позже появления кораблей
        gun = new StartGun(220, 480);
        gun.draw(ctx);
        var x = canvas.width;
        var y = canvas.height - 20;
        ship = new SmallShip(x, y);
        ships.push(ship);
        drawEnv(ctx, canvas.width, canvas.height);
    }
}

function drawBack(ctx, w, h){
    ctx.save();
    // закрашиваем небо
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(1, '#00BFFF');
    g.addColorStop(0.2, '#87CEEB');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    
    
}



function drawEnv(ctx, w, h){
    // создаем волны
    var g = ctx.createLinearGradient(0, 0, 0, Math.ceil(h / 4));
    g.addColorStop(1, '#191970');
    g.addColorStop(0.4, '#00008B');
    ctx.fillStyle = g;
    var hWave = h - Math.ceil(h / 16);
    ctx.beginPath();
    ctx.moveTo(Math.ceil(w / 8), hWave)
    for (var i = Math.ceil(w / 8); i < w; i += Math.ceil(w / 32)) {
        ctx.quadraticCurveTo(i + Math.ceil(w / 128), hWave - Math.ceil(Math.random() * 15 + 10), i + Math.ceil(w / 32), hWave);
    }
    ctx.fill();
    ctx.fillRect(Math.ceil(w / 8), h - Math.ceil(h / 16), w, h);
    ctx.closePath();

    //создаем крепость
    ctx.beginPath();
    ctx.fillStyle = '#343434'
    ctx.fillRect(0, h, 250, -400);
    ctx.closePath();
    ctx.stroke();

    for (var i = 0; i < 2; i++){
        ctx.beginPath();
        ctx.fillStyle = '#00FFFF'
        ctx.moveTo(200 - i * 100, h - 300)
        ctx.lineTo(200 - i * 100, h - 250);
        ctx.lineTo(170 - i * 100, h - 250);
        ctx.lineTo(170 - i * 100, h - 300);
        ctx.lineTo(200 - i * 100, h - 300);

        ctx.fill();
        ctx.moveTo(185 - i * 100, h - 300);
        ctx.lineTo(185 - i * 100, h - 250);
        ctx.moveTo(170 - i * 100, h - 275);
        ctx.lineTo(200 - i * 100, h - 275);

        ctx.stroke();
    }
    

    //создаем подставку под пушку
    ctx.beginPath();
    ctx.fillStyle = '#B03F35'
    ctx.moveTo(250, 500);
    ctx.lineTo(240, 490);
    ctx.lineTo(220, 490);
    ctx.lineTo(210, 500);
    ctx.fill();


    //создаем камни
    ctx.beginPath();
    ctx.fillStyle = '#808080'
    var Angle = Math.PI * 2;
    ctx.arc(190, h, 100, 0, Angle, true);
    ctx.arc(180, h - 23, 100, 0, Angle, true);
    ctx.arc(80, h - 23, 100, 0, Angle, true);
    ctx.arc(40, h - 23, 100, 0, Angle, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}

function gameProcess(){
    drawBack(ctx, canvas.width, canvas.height);
    gun.draw(ctx);


    if (shoot && shooted_shells < count_of_shells){
        var x = gun.posX;
        var y = gun.posY;
        var N = 1;
        if (was_volley_bought)
            N = 3;
        for (var i = 0; i < N; i++){
            if (gun instanceof StartGun) {
                shell = new Shell(x, y, gun.angle);
            }
            else {
                shell = new BigShell(x, y, gun.angle);
            }
            x += 15;
            y -= 15;
            shells.push(shell);
        }
        shooted_shells++;
    }
    ctx.fillStyle = '#000000'
    ctx.font = "17px Verdana";
    
    

    shoot = false;
    if (shooted_shells >= count_of_shells){
        reloading++;
        if (reloading >= 25){
            shooted_shells = 0;
            reloading = 0;
        }
        ctx.fillText('перезарядка', 180, 430);
    }
    else{
        ctx.fillText('осталось снарядов  ' + (count_of_shells - shooted_shells), 160, 430);
    }
    

    
    for (var i = 0; i < shells.length; i){
        
        if (!checkTouch(ctx, shells[i]) && shells[i].posY + shells[i].rBall < canvas.height - 40){
            shells[i].draw(ctx);
            i++;
        } 
        else{
            shells.splice(i, 1);
        }       
    }

    if (Math.ceil(Math.random() * 200 / game_difficulty) == 1){
        var x = canvas.width;
        var y = canvas.height - 20;
        if (game_difficulty >= 2 && Math.ceil(Math.random() * 40) / game_difficulty == 1){
            ship = new BigShip(x, y);
        }
        else{
            ship = new SmallShip(x, y);
        }
                
        ships.push(ship);
    }

    ctx.fillStyle = "#000000"
    ctx.font = "21px Verdana";
    ctx.fillText('Уровень сложности  ' + game_difficulty, 20, 30);
    ctx.fillText('ИГРОК     ' + player_name, 20, 60)
    ctx.fillText('Монеты   ' + coins, 20, 90);
    ctx.fillText('Счет       ' + player_score, 20, 120);
    ctx.fillText('HP        ' + player_health, 20, 150);
    

    for (var i = 0; i < ships.length; i){
        
        if (ships[i].health > 0){
            ships[i].draw(ctx);
            
            if (ships[i].recoil == 0 && ships[i].limit){
                var enemy_shoot = new EnemyShoot(ships[i].posX, ships[i].posY);
                enemy_shoots.push(enemy_shoot);
                
            }
            if (game_difficulty > 3){
                if(ships[i] instanceof SmallShip){
                    ships[i].speed = 3 / 2;
                }
                if (ships[i] instanceof BigShip && game_difficulty > 4){
                    ships[i].speed = 1;
                }
            }
            ships[i].recoil++;
            if (ships[i].recoil >= 30) {
                ships[i].recoil = 0;
            }
            
            i++;
            
        }
        else{
            if (ships[i] instanceof BigShip){
                coins += 5;
            }
            else{
                coins++;
            }
            ships.splice(i, 1);
        }
    }

    for (var i = 0; i < enemy_shoots.length; i){
        
        if (enemy_shoots[i].posX - enemy_shoots[i].rBall < 250){
            enemy_shoots.splice(i, 1);
            player_health--;
        }
        else{
            enemy_shoots[i].draw(ctx);
        i++;
        }
        

    }
    if (player_score < 50)
        game_difficulty = 1;
    else if(player_score < 150)
        game_difficulty = 2;
    else if (player_score < 300)
        game_difficulty = 3;
    else if(player_score < 100)
        game_difficulty = 4;
    else game_difficulty = 5;


    drawEnv(ctx, canvas.width, canvas.height);

    if (player_health < 0) {
        is_game_over = true;
        exit_game(ctx);
    }
    
}





function startGame(){ 
    if (!was_started && is_player_changed){
        while (player_name == ''){
            player_name = prompt("Как вас зовут?", 'Неизвестный');
        }
    }
    is_player_changed = false;
    was_started = true;
    clearInterval(idTimer);
    if (!is_game_over){
        idTimer = setInterval('gameProcess();', 50);
    }   
    
    
}

function pauseGame(){
    clearInterval(idTimer);
}

function openShop(){
    clearInterval(idTimer);
    if (!is_game_over && was_started) {
        is_shop = true;
        drawBack(ctx, canvas.width, canvas.height);

        ctx.fillStyle = "#000000"
        ctx.font = "30px Verdana";

        ctx.fillText('Ваш баланс    ' + coins, 100, 70);

        ctx.fillText('МАГАЗИН', canvas.width / 2, 70);


        ctx.fillText('Большая пушка', 200, 160);
        var good_1 = new BigGun(200, 200)
        good_1.draw(ctx, 0);

        ctx.fillText('3 снаряда залпом', 800, 160);
        var good_21 = new Shell(800, 200, 0);
        good_21.draw(ctx);
        var good_22 = new Shell(820, 200, 0);
        good_22.draw(ctx);
        var good_23 = new Shell(840, 200, 0);
        good_23.draw(ctx);

        ctx.fillText('+1 ХП', 1300, 160);
        ctx.restore();
        ctx.beginPath();
        ctx.strokeRect(1300, 200, 100, 100);
        ctx.font = "60px Verdana";
        ctx.fillText('+', 1325, 265);

    }

}

function choice(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (y > 100 && y < 300) {
        if (x > 200 && x < 400 && !was_big_gun_bought && coins >= 100) {
            was_big_gun_bought = true;
            gun = new BigGun(220, 480);
            count_of_shells = 2;
            coins -= 100;
        }
        if (x > 750 && x < 900 && !was_volley_bought && coins >= 200){
            coins -= 200;
            was_volley_bought = true

        }
        if (x > 1200 && x < 1400 && coins >= 10){
            player_health++;
            coins -= 10;
        }

        drawBack(ctx, canvas.width, canvas.height);

        ctx.fillStyle = "#000000"
        ctx.font = "30px Verdana";

        ctx.fillText('Ваш баланс    ' + coins, 100, 70);

        ctx.fillText('МАГАЗИН', canvas.width / 2, 70);


        ctx.fillText('Большая пушка', 200, 160);
        var good_1 = new BigGun(200, 200)
        good_1.draw(ctx, 0);

        ctx.fillText('3 снаряда залпом', 800, 160);
        var good_21 = new Shell(800, 200, 0);
        good_21.draw(ctx);
        var good_22 = new Shell(820, 200, 0);
        good_22.draw(ctx);
        var good_23 = new Shell(840, 200, 0);
        good_23.draw(ctx);

        ctx.fillText('+1 ХП', 1300, 160);
        ctx.restore();
        ctx.beginPath();
        ctx.strokeRect(1300, 200, 100, 100);
        ctx.font = "60px Verdana";
        ctx.fillText('+', 1325, 265);

    }
}

function closeShop(){
    clearInterval(idTimer);
    if (!is_game_over && was_started) {
        is_shop = false;
        idTimer = setInterval('gameProcess(ctx);', 50);
    }
}



function checkTouch(ctx, shell){
    for (var i = 0; i < ships.length; i++){
        if (shell.posY - shell.rBall < ships[i].posY - 35) {
            if ((shell.posX - shell.rBall < ships[i].posX - 80) && (shell.posY + shell.rBall > ships[i].posY - 100)) {
                if (shell.posX + shell.rBall > ships[i].posX - 80 && shell.posY + shell.rBall > ships[i].posY - 100) {
                    if (shell instanceof Shell){
                        ships[i].health--;
                        player_score++;
                    }
                    else{
                        ships[i].health -= 3;
                        player_score += 3;
                    }
                    return true;

                }

            }
            else if ((shell.posX - shell.rBall < ships[i].posX) && (shell.posY + shell.rBall > ships[i].posY - 100)) {
                if (shell.posX + shell.rBall > ships[i].posX && shell.posY + shell.rBall > ships[i].posY - 100) {
                    if (shell instanceof Shell) {
                        ships[i].health--;
                        player_score++;
                    }
                    else {
                        ships[i].health -= 3;
                        player_score += 3;
                    }
                    
                    return true;
                }

            }
        }
    }
    return false;
}


function exit_game(ctx){
    clearInterval(idTimer);
    alert('Игра окончена!');
    if (localStorage.getItem(player_name) < player_score ){
        localStorage.setItem(player_name, player_score);
    }

    drawBack(ctx, canvas.width, canvas.height);
    ctx.fillStyle = "#000000"
    ctx.font = "30px Verdana";
    ctx.fillText('ТАБЛИЦА', 50, 40);
    for (var i = 0; i < localStorage.length && i < 10; i++){
        
        
        ctx.fillText((i + 1) + ')' + localStorage.key(i) + '   ' + localStorage.getItem(localStorage.key(i)), 50, 100 + i * 60);
    }
}

function checkTable(){
    clearInterval(idTimer);
    if(!is_game_over){
        drawBack(ctx, canvas.width, canvas.height);
        ctx.fillStyle = "#000000"
        ctx.font = "30px Verdana";
        ctx.fillText('ТАБЛИЦА', 50, 40);
        for (var i = 0; i < localStorage.length && i < 10; i++) {
            
            ctx.fillText((i + 1) + ')' + localStorage.key(i) + '   ' + localStorage.getItem(localStorage.key(i)), 50, 100 + i * 60);
        }
    }
}

function changePlayer(){
    restart();
    is_player_changed = true;
    player_name = ''
    init();
}

function restart(){
    clearInterval(idTimer);
    was_started = false, shoot = false;
    mouseCoords = {
        x: 0,
        y: 0
    };
    was_volley_bought = false;
    was_big_gun_bought = false;
    is_game_over = false;
    wave_change = 0;
    shells = []
    ships = []
    enemy_shoots = []
    is_shop = false;

    count_of_shells = 4;

    coins = 0;
    player_health = 10;
    player_score = 0;
    game_difficulty = 1;


    reloading = 0;
    shooted_shells = 0;
    init();
}
