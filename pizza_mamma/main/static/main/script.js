const sliders = document.querySelectorAll('.container');


if (window.innerWidth > 1080) {

    window.addEventListener('load', () => {
        sliders.forEach(i => i.classList.add('active'));
    });
    
};


window.addEventListener('resize', ()=> {

    if (window.innerWidth < 1080) {
        sliders.forEach(i => i.classList.remove('active'));
    }
    else if (window.innerWidth > 1080) {
        sliders.forEach(i => i.classList.add('active'));
    };

});


console.log(window.innerWidth);




