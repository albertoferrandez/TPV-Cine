let tabpeli = document.getElementById('tab-peli');
let tabcom = document.getElementById('tab-comida');
let tabbeb = document.getElementById('tab-bebida');

let contpeli = document.getElementById('peli-content');
let contcom = document.getElementById('comida-content');
let contbeb = document.getElementById('bebida-content');


tabpeli.addEventListener('click', () => {
    contpeli.style.display = 'block';
    contcom.style.display = 'none';
    contbeb.style.display = 'none';
});


tabcom.addEventListener('click', () => {
    contpeli.style.display = 'none';
    contcom.style.display = 'block';
    contbeb.style.display = 'none';
});


tabbeb.addEventListener('click', () => {
    contpeli.style.display = 'none';
    contcom.style.display = 'none';
    contbeb.style.display = 'block';
});