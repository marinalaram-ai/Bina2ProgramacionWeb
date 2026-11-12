let botonTexto = document.getElementById("cambiarTexto");
let titulo = document.getElementById("titulo");

botonTexto.addEventListener("click", function () {
    titulo.textContent = "¡Texto cambiado!";
});

let botonColor = document.getElementById("cambiarColor");
let cajas = document.getElementsByClassName("caja");

botonColor.addEventListener("click", function () {
    for (let i = 0; i < cajas.length; i++) {
        cajas[i].style.backgroundColor = "lightcoral";
    }
});

let primeraCaja = document.querySelector(".caja");
primeraCaja.style.backgroundColor = "lightgreen";

let todasLasCajas = document.querySelectorAll(".caja");

todasLasCajas.forEach(caja => {
    caja.style.border = "2px solid darkblue";
});
