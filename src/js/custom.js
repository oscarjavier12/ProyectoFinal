const contenedor = document.querySelector('.contenido');
const elementos = document.querySelector('.elementos');
const flechaIzquierda = document.querySelector('.izquierda');
const flechaDerecha = document.querySelector('.derecha');

let posicion = 0; // Posición actual del scroll
flechaIzquierda.addEventListener('click', () => {
    posicion -= 100; // Ajusta la cantidad de scroll
    if (posicion < 0) {
        posicion = 0;
    }
    elementos.style.transform = `translateX(-${posicion}px)`;
});

flechaDerecha.addEventListener('click', () => {
    posicion += 100; // Ajusta la cantidad de scroll
    if (posicion > elementos.scrollWidth - contenedor.offsetWidth) {
        posicion = elementos.scrollWidth - contenedor.offsetWidth;
    }
    elementos.style.transform = `translateX(-${posicion}px)`;

});

