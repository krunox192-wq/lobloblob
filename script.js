// --- CORAZONES DE FONDO ---
function createHeart(){
    const heart = document.createElement('div');
    heart.className='heart';
    heart.style.left = Math.random()*window.innerWidth+'px';
    heart.style.animationDuration = 3 + Math.random()*3 + 's';
    heart.innerText = '❤️';
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,200);

// --- PATRÓN TULIPÁN ---
const tulipanPattern = [
    [0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,3,0,0,0,0,3,3,3,3,3,3,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,0,0,3,2,3,3,3,3,3,3,0,0,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,2,3,2,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const colors = {1:'green',2:'pink',3:'red'};
let attemptsNo = 0;

window.addEventListener('DOMContentLoaded',()=>{

    const introText = document.getElementById("introText");
    const nextBtn = document.getElementById("nextBtn");
    const question = document.getElementById("question");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const bgm = document.getElementById("bgm");
    const soundAngry = document.getElementById("soundAngry");

    // --- REPRODUCIR MÚSICA DESDE EL INICIO ---
    bgm.play().catch(err => {
        console.log("Autoplay bloqueado, se reproducirá al interactuar");
    });

    // --- BOTÓN SIGUIENTE ---
    nextBtn.addEventListener('click',()=>{
        introText.style.display='none';
        question.style.display='block';
        bgm.play(); // asegura que suene si el navegador bloqueó autoplay
    });

    // --- BOTÓN NO escurridizo + sonido cada 2 intentos ---
    noBtn.addEventListener('mouseenter',()=>{
        attemptsNo++;
        let x = Math.random()*(window.innerWidth - 80);
        let y = Math.random()*(window.innerHeight - 50);
        noBtn.style.left = x+'px';
        noBtn.style.top = y+'px';
        if(attemptsNo % 2 === 0) soundAngry.play();
    });

    // --- BOTÓN SÍ dibuja tulipán ---
    yesBtn.addEventListener('click',()=>{
        question.style.display='none';
        document.getElementById("flower").style.display='grid';
        drawTulipan();
    });

    // --- FUNCION TULIPAN PIXELADO ---
    function drawTulipan(){
        const flower = document.getElementById("flower");
        flower.innerHTML='';
        flower.style.gridTemplateColumns = `repeat(${tulipanPattern[0].length}, 15px)`;
        flower.style.gridTemplateRows = `repeat(${tulipanPattern.length}, 15px)`;
        flower.style.justifyContent = 'center';
        flower.style.alignContent = 'center';

        for(let r=0;r<tulipanPattern.length;r++){
            for(let c=0;c<tulipanPattern[r].length;c++){
                const div = document.createElement('div');
                div.classList.add('pixel');
                flower.appendChild(div);
            }
        }

        let index=0;
        const pixels = flower.querySelectorAll('.pixel');
        const interval = setInterval(()=>{
            let row = Math.floor(index / tulipanPattern[0].length);
            let val = tulipanPattern[row][index % tulipanPattern[0].length];
            if(val!==0) pixels[index].style.background = colors[val];
            index++;
            if(index>=pixels.length) clearInterval(interval);
        },50);
    }

    // --- GENERAR CORAZONES ALEATORIOS ---
    setInterval(()=>{
        const heart = document.createElement('div');
        heart.className='heart';
        heart.textContent='❤️';
        heart.style.left = Math.random()*window.innerWidth + 'px';
        heart.style.fontSize = (10+Math.random()*20)+'px';
        heart.style.animationDuration = (4+Math.random()*3)+'s';
        document.body.appendChild(heart);
        setTimeout(()=>document.body.removeChild(heart),7000);
    },300);
});
