//  Usa getElementById para seleccionar el banner y cambiar su color de fondo, a través de clases de Bootstrap (bg-warning).

let banner = document.getElementById("banner");
// Solo existe en actividad1.html; sin este if, el script se detiene en actividad2.html
if (banner) {
    banner.classList.add("bg-warning");
}

// 1. Utiliza getElementsByClassName para seleccionar los testimonios de clientes VIP
//    y cambiar su color de texto a text-primary.
let testimonioVip = document.getElementsByClassName("testimonio-vip");
for (let i = 0; i < testimonioVip.length; i++) {
    testimonioVip[i].classList.add("text-primary");
}

// 2. Utiliza getElementsByTagName para seleccionar todos los párrafos de la página
//    y cambiar el color del texto a text-danger.
let parrafos = document.getElementsByTagName("p");
for (let i = 0; i < parrafos.length; i++) {
    parrafos[i].classList.add("text-danger");
}

// ===== Actividad 3 =====

// 2. Utiliza querySelector para seleccionar el primer campo de texto
//    y cambiar su color de fondo a bg-success.
let primerTexto = document.querySelector("input[type='text']");
// Solo existe en actividad3.html
if (primerTexto) {
    primerTexto.classList.add("bg-success");
}

// 3. Utiliza querySelectorAll para seleccionar todos los botones
//    y aplicarles la clase btn-danger (botón rojo).
//    Se usa "form button" para no cambiar el botón de actividad1.html
let botones = document.querySelectorAll("form button");
for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove("btn-primary"); // si no se quita, sigue azul
    botones[i].classList.add("btn-danger");
}

// 4. Utiliza getElementsByName para seleccionar el campo de nombre
//    y cambiar el color del texto a text-warning.
let campoNombre = document.getElementsByName("nombre");
// getElementsByName devuelve una lista, por eso se usa [0]
if (campoNombre.length > 0) {
    campoNombre[0].classList.add("text-warning");
}
