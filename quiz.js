// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Sorular
let questions = [
    {
        question : "Yanda yer alan yapı hangi ilimizdedir?",
        imgSrc : "img/titus.jpg",
        choiceA : "Sivas",
        choiceB : "Adana",
        choiceC : "Hatay",
        
        correct : "C"
    },{
        question : "Kemal Sunal hangi filmde oynamamıştır?",
        imgSrc : "img/kemalsunal.png",
        choiceA : "Hababam Sınıfı Tatilde",
        choiceB : "Hababam Sınıfı Dokuz Doğuruyor",
        choiceC : "Hababam Sınıfı Uyanıyor",
        correct : "B"
    },{
        question: "Bir kısmını dinlediğinizin müziğin bestesi kime aittir?",
        imgSrc  : "img/Piyano.jpg",
        choiceA : "Fazıl Say",
        choiceB : "Mozart",
        choiceC : "Bethoven",
        correct : "B"
    },{
        question: "Halk arasında 'zil takıp oynamak' ifadesi kimler için söylenir? ",
        imgSrc  :"img/zil.png",
        choiceA : "Sevinenler",
        choiceB : "Acıkanlar",
        choiceC : "Korkanlar",
        correct : "A"
    },
    {   question: "Yanda görülen resimde hangi yemek yoktur?",
        imgSrc  :"img/yemek.jpg",
        choiceA : "Lahmacun",
        choiceB : "Biberli",
        choiceC : "Oruk",
        correct : "A"
    },
    {question   : "Hababam sınıfında oynayan ve lakabı 'Damat Ferit' olan ve 2016 da vefat eden ünlü aktörümüz kimdir?",
        imgSrc  :"img/damat.jpg",
        choiceA : "Şener Şen",
        choiceB : "Tarık Akan",
        choiceC : "Münir Özkul",
        correct : "B"
    },
    {   question: "Zeze adlı çocuğun başından geçenleri konu eden romanın adı nedir?",
        imgSrc  :"img/kitap.jpg",
        choiceA : "Benim Adım Kırmızı",
        choiceB : "Tehlikeli Oyunlar",
        choiceC : "Şeker Portakalı",
        correct : "C"
    },
    {question: "Osmanlı Döneminde en uzun süre tahtta kalan padişah kimdir? ",
        imgSrc  :"img/osmanlı.png",
        choiceA : "1. Süleyman",
        choiceB : "1. Selim",
        choiceC : "2. Mehmet",
        correct : "A"
    }   
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// soru sorma fonksiyonu
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

//Başla butonuna basınca
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

//kaydedilen ilerleme 
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Soru doğru cevaplanınca yeşil ve kırmızı renkleri oluşturma

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // skor doğru ise 1 arttırılıp yeşile boyanır
        score++;
        answerIsCorrect();
    }else{
        //yanlış ise kırmızıya boyanır
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "darkgreen";
}
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "darkred";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length); 

    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
   
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>" ;
}

audio = new Audio();

audio.src = "img/muzikk.mp4";

audio.loop = true;

audio.play();

function play() {
  audio.play();
}

function pause() {
  audio.pause();
}   