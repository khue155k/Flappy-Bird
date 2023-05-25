const canvas= document.getElementById('game-zone');
const context= canvas.getContext('2d');
const gameContainer = document.getElementById('game-container');

var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
birdimg.src="bird.png";
hinhnenchinh.src="nenchinh.png";
ongtren.src="ongtren.png";
ongduoi.src="ongduoi.png";

var hit = new Audio('hit.wav');
var point = new Audio('point.wav');
var wing = new Audio('wing.wav');

const scoreshow=document.getElementById('score-display');
var score = 0;
var bestScore = 0;

var khoangCachHaiOng = 170; 
var khoangCachDenOngDuoi;

var bird={
    x: 91.5,
    y: 252,
    v: 0,//van toc 
    a: 0.2//gia toc
}
var pipe={
    x: 480,
    y: -60
}

var gameStart=false;

document.body.onclick = function() {
    bird.v = -4.5;
    wing.play();
    if (gameStart==false){
        gameStart=true;
        hideStartMenu();
        run();
    }       
}
document.body.onkeyup = function(e) {
    if(e.code=='Space')
    {
        bird.v = -4.5;
        wing.play();
        if (gameStart==false){
            gameStart=true;
            hideStartMenu();
            run();
        }     
    }
}

document.getElementById('restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
})

function hideStartMenu () {
    document.getElementById('start-menu').style.display = 'none';
}

function hideEndMenu () {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}
function showEndMenu () {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    if (bestScore < score) {
        bestScore = score;
    }
    document.getElementById('best-score').innerHTML = bestScore;
}

function resetGame() {
    gameStart = false;
    bird.x = 91.5;
    bird.y = 252;
    bird.v = 0;
    bird.a = 0.2;

    pipe.x = 480;
    pipe.y = -60;

    score = 0;
    scoreshow.innerHTML = score;
    draw();
}
function draw(){
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    khoangCachDenOngDuoi = ongtren.height+khoangCachHaiOng;
    context.drawImage(ongtren,pipe.x,pipe.y);
    context.drawImage(ongduoi,pipe.x,pipe.y+khoangCachDenOngDuoi);
}

function run(){
    draw();
    pipe.x-=1.5;

    bird.v += bird.a;
    bird.y += bird.v;
    
    if (pipe.x < -40) {
        pipe.x = 480;
        pipe.y = Math.floor(Math.random()*(ongtren.height-27))+27-ongtren.height;
    }
    if(pipe.x==bird.x) {
        score++; 
        scoreshow.innerHTML = score;
        point.play();
    }     

    if(bird.y+birdimg.height>=canvas.height||//check va chạm bên dưới
        bird.x+birdimg.width>= pipe.x && bird.x <= pipe.x +ongtren.width && (bird.y<=pipe.y+ongtren.height||bird.y +birdimg.height>= pipe.y+ khoangCachDenOngDuoi))//check va chạm với ống   
        {
            hit.play();
            showEndMenu();
            return;//dừng lại
        }   

    requestAnimationFrame(run);
}