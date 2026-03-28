const h1 = document.querySelector('h1');
const food = document.querySelector('#food');
const subs = document.querySelectorAll('.sub');
const navMenu = document.querySelector('.nav-menu');
const fixedElements = document.querySelectorAll('[data-position="fixed"]');
const finalCountDiv = document.querySelector('.final-countdiv');
const countdown = document.querySelector('#countdown');
const closeCountDown = document.querySelector('#close-countdown');
const logo = document.querySelector('img');
const stories = document.querySelectorAll('.story');
const arrows = document.querySelectorAll('.arrow');


console.log(window.innerHeight);


/* Gestion du menu déroulant. */
food.addEventListener('click' , () => {
    subs.forEach(i => i.classList.toggle('active'));
});

navMenu.addEventListener('mouseleave', () => {
    subs.forEach(i => i.classList.remove('active'));
});



/* La visionneuse d'anecdotes sur les desserts italiens. */

let storiesArray = Array.from(stories);
let current = 0;


// Gestion du défilement automatique.

let justClicked = false;

function nextDisplay() {

    storiesArray.forEach(i => i.classList.remove('on'));
    storiesArray[current].classList.add('on');
    // console.log(current, justClicked)

};

function autoSlider() {
    
    storiesArray[current].classList.add('on');
    
    setInterval(()=> {
        
        // Pour passer à la diapositive suivante seulement si aucun clic ne vient d'être effectué manuellement. 
        if (!justClicked) {
            
            current ++;
            if (current > storiesArray.length - 1) {
                current = 0;
            };
            nextDisplay();
            
        };
        
        justClicked = false;
        
    }, 16000);
};

autoSlider();



// Gestion du défilement manuel.

arrows.forEach(i => i.addEventListener('click', function(e) {
    
    current += Number(e.target.getAttribute('data-action'));
    
    if (current >= storiesArray.length) {
        current = 0;
    }
    else if (current < 0) {
        current = storiesArray.length - 1;
    };
    
    nextDisplay();
    justClicked = true;

}));






