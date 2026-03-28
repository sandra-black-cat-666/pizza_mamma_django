const logo = document.querySelector('img');
const h1 = document.querySelector('h1');
const food = document.querySelector('#food');
const subs = document.querySelectorAll('.sub');
const nav = document.querySelector('nav');
const navMenu = document.querySelector('.nav-menu');
const curtain = document.querySelector('#curtain');
const closeCurtain = document.querySelector('#close-curtain');
const pizzaRoulette = document.querySelector('.pizza-roulette');
const randomPizza = document.querySelector('.random-pizza');
const roulette = document.querySelector('#roulette');
const pullOut = document.querySelector('#pull-out');
const finalCountDiv = document.querySelector('.final-countdiv');
const countdown = document.querySelector('#countdown-message');
const closeCountDown = document.querySelector('#close-countdown');
const phone = document.getElementById('phone');


/* Maintenir le numéro de téléphone en bas de page si la fenêtre est étroite. */
/* Dans l'idéal il faudrait faire en sorte de cela puisse évoluer dynamiquement. Appliquer une classe en CSS ? */
if (window.innerWidth < 1080) {
    phone.removeAttribute('data-position');
};


window.addEventListener('resize', ()=> {

    if (window.innerWidth < 1080 || window.innerHeight < 680) {
        location.reload();
    }

})


const fixedElements = document.querySelectorAll('[data-position="fixed"]');

console.log(fixedElements);
console.log(window.innerHeight, window.innerWidth)


/* Conversion de la chaîne de caratères au bon format (en tableau JS) afin que les données puissent être exploitées. */
let ordered_list = JSON.parse(list);

console.log(list, typeof(list));
console.log(ordered_list, typeof(ordered_list));


/* Gestion de l'affichage du menu de navigation. */
food.addEventListener('click' , () => {
    subs.forEach(i => i.classList.toggle('active'));
});


navMenu.addEventListener('mouseleave', () => {
    subs.forEach(i => i.classList.remove('active'));
});



/* Démarrer ou arrêter une campagne promotionnelle. */

// Gestion des mouvements des éléments (y compris en position « fixed ») en cas d'affichage du bandeau de compte à rebours.
function upAndDown(translation, pushDown) {

    fixedElements.forEach((i) => {
        i.style.transform = translation;
    });
    curtain.style.top = pushDown;
    document.body.style.marginTop = `${finalCountDiv.clientHeight}px`;
    
};


// Afficher le bandeau.

function showHeader() {
    finalCountDiv.style.display = 'block';
    upAndDown(`translateY(calc(${finalCountDiv.clientHeight}px))`, `calc(50% + ${finalCountDiv.clientHeight}px)`);
};


// Masquer le bandeau.

function hideHeader() {
    finalCountDiv.style.display = 'none';
    upAndDown('translateY(0)', '50%');
};

closeCountDown.addEventListener('click', () => {
    hideHeader();
});



/* Le compte à rebours. */
function theFinalCountdown(message, deadline) {
    
    showHeader();

    let decrease = setInterval(() => {

        let now = new Date();
        let dDay = new Date(deadline);
        let milliseconds = dDay - now;
        let remainingSeconds = milliseconds / 1000;
    
        let days = Math.floor(remainingSeconds / (60 * 60 * 24));
        let hours = Math.floor(remainingSeconds % (60 * 60 * 24) / 3600);
        let minutes = Math.floor(remainingSeconds % (60 * 60 * 24) % 3600 / 60);
        let seconds = Math.floor(remainingSeconds % (60 * 60 * 24) % 3600 % 60);
        
        hours < 10 ? hours = `0${hours}` : `${hours}`;
        minutes < 10 ? minutes = `0${minutes}` : `${minutes}`;
        seconds < 10 ? seconds = `0${seconds}` : `${seconds}`;

        countdown.innerHTML = `<p>⭐ ${message} Encore ${days} jour(s) ${hours}:${minutes}:${seconds}&nbsp;⭐</p>`;
        if (remainingSeconds == 0) {
            clearInterval(decrease);
            hideHeader();
        };

    }, 1000);
};

theFinalCountdown("Profitez de la livraison offerte jusqu'au dimanche 29 mars !", 'March 29, 2026');




/* Gestion de l'apparition et du camouflage du rideau. */

function curtainOut() {
    curtain.classList.replace('back-in', 'out');
};

function curtainIn() {
    curtain.classList.replace('out', 'back-in');
};

// Compter le nombre de clics effectués sur le bouton pullOut.
let numClicks = 0;

pullOut.addEventListener('click', () => {
    curtain.className = 'out';
    numClicks ++;
});

closeCurtain.addEventListener('click', (e)=> {

    e.stopPropagation();
    curtainIn();
});


/* Proposer la pizza-roulette si aucun clic n'a encore été effectué sur le bouton pullOut. */

setTimeout(function() {
    if (numClicks == 0) {
    curtainOut();
    };
}, 8000);


// if (numClicks == 0) {

//     setTimeout(function() {
//         curtainOut();
//     }, 5000);
// };



/* Animation de la Pizza-roulette (icône seul). */
function spin() {
    roulette.className = 'active';
};


/* Ensemble des animations liées à la Pizza-roulette. */
pizzaRoulette.addEventListener('click', (e) => {
    
    e.stopPropagation();
    
    spin();
    
    /* Obtention d'un index aléatoire. */
    const rollTheDice = setInterval(() => {
        let dice = ordered_list[Math.floor(Math.random() * ordered_list.length)];
        randomPizza.textContent = dice.toUpperCase();
    }, 150);

    /* Activation de l'animation de la Pizza-roulettte et de l'affichage des pizzas tour à tour... jusqu'à la pizza tirée au sort. */
    setTimeout(() => {
        clearInterval(rollTheDice);
        roulette.classList.replace('active', 'initial-position');
        randomPizza.textContent += ' !';
        blink = setInterval (() => {
            randomPizza.classList.toggle('hidden');
        }, 500);

        setTimeout(() => {
            clearInterval(blink);
            randomPizza.classList.remove('hidden');
        }, 2000);
    }, 2000);
    
});







