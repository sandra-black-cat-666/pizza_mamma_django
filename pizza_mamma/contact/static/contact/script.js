const h1 = document.querySelector('h1');
const food = document.querySelector('#food');
const subs = document.querySelectorAll('.sub');
const navMenu = document.querySelector('.nav-menu');
const fixedElements = document.querySelectorAll('[data-position="fixed"]');
const finalCountDiv = document.querySelector('.final-countdiv');
const countdown = document.querySelector('#countdown');
const closeCountDown = document.querySelector('#close-countdown');
const logo = document.querySelector('img');

const entries = document.querySelectorAll('.entry');

const subjectDiv = document.querySelector('#subject-div');
const nameDiv = document.querySelector('#name-div');
const emailDiv = document.querySelector('#email-div');
const messageDiv = document.querySelector('#message-div');

// const formControls = document.querySelectorAll('.form-control');
const inputs = document.querySelectorAll('input');

const subjectField = document.getElementById('subject')
const nameField = document.getElementById('name')
const emailField = document.getElementById('email')
const messageField = document.getElementById('message')
const errorMessages = document.querySelectorAll('small');
const send = document.querySelector('#send');


console.log(window.innerWidth, window.innerHeight);


/* Gestion du menu de navigation. */

food.addEventListener('click' , () => {
    subs.forEach(i => i.classList.toggle('active'));
});

navMenu.addEventListener('mouseleave', () => {
    subs.forEach(i => i.classList.remove('active'));
});


/* Réintialisation des champs du formulaire. */

window.addEventListener('load', () => {
    inputs.forEach(i => i.value = '');
    messageField.value = '';
});


/* Gestion des erreurs dans le formulaire. */

showError = function(div) {
    div.className = 'entry error';
};

function showSuccess(div) {
    div.className = 'entry success';
};

function checkRequired(div) {
    if (div.children[1].value == '') {
        div.lastElementChild.textContent = 'Ce champ ne peut rester vide';
        showError(div);
    };
};


entries.forEach(i => i.addEventListener('input', function() {
    checkRequired(i);
}))

function checkLength(div, min, max) {
    if (div.children[1].value.length < min) {
        div.lastElementChild.textContent = `Un minimum de ${min} caractères est requis pour ce champ`;
        showError(div);
    }
    else if (div.children[1].value.length > max) {
        div.lastElementChild.textContent = `Ce champ ne peut contenir plus de ${max} caractères`;
        showError(div);
    }
    else {
        showSuccess(div);
    };
};


/* SUPER DÉCOUVERTE DE L'UTILISATION DE CLASSNAME PLUTÔT QUE CLASSLIST.ADD, .REMOVE, ETC. COMBINÉE AUX TRANSITIONS EN CSS POUR QUE LA CLASSE SOIT BIEN APPLIQUÉE EN TEMPS RÉEL */

/* MAINTENANT, REVOIR LES REGEX ! */

subjectField.addEventListener('input', () => {
    checkLength(subjectDiv, 3, 50);
});

nameField.addEventListener('input', () => {
    let nameRegex = /[^A-Zà-ÿ'-\s]/ig;
    if (!nameRegex.test(nameField.value)) {
        showSuccess(nameDiv);
    }
    else {
        nameDiv.lastElementChild.textContent = 'Ce champ ne doit contenir que des lettres, apostrophes et tirets';
        showError(nameDiv);
    };
});

emailField.addEventListener('input', () => {
    let emailRegex = /([A-Z]+)([.][-])?([A-Z]+)@([A-Z]+)([-])?.([A-Z]+)/i;
    // let emailRegex = /([A-Z0-9]+)([.][-])?([A-Z0-9]+)@([A-Z]+).([A-Z]+)/i;
    let properEmail = emailField.value.match(emailRegex);
    if (properEmail != null) {
        showSuccess(emailDiv);
    }
    else {
        emailDiv.lastElementChild.textContent = 'Le format e-mail doit être valide';
        showError(emailDiv);
    };
});

messageField.addEventListener('input', () => {
    checkLength(messageDiv, 25, 500);
});


send.addEventListener('click', function(e) {
    e.preventDefault();
    entries.forEach(i => checkRequired(i));

    // console.log(entries); // THIS GAVE ME THE EXPLANATION. the querySelectorAll method returns a nodeList instead of an array! So, I then did the conversion.
    // console.log(Array.from(entries).every(i => i.className == 'entry success'));

    let allCorrect = Array.from(entries).every(i => i.className == 'entry success');
    if (allCorrect) {
        inputs.forEach(i => i.value = '');
        messageField.value = '';   
        send.textContent = 'Message envoyé ✅';
        setTimeout(() => {
            send.textContent = 'Envoyer';
            entries.forEach(i => i.classList.remove('success'));
        }, 2000);
    };
    
});



/* Gestion des mouvements des éléments (y compris en position « fixed ») en cas d'affichage du bandeau de compte à rebours. */
function upAndDown(translation) {

    fixedElements.forEach((i) => {
        i.style.transform = translation;
    });

    logo.style.paddingTop = `calc(${finalCountDiv.clientHeight}px * 0.9)`;
    
};

