const boton = document.getElementById("btnCambio");
const imagen = document.getElementById("imagen");
const texto = document.getElementById("texto");

boton.addEventListener("click", function () {
    imagen.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SaLx2mk6-5OpqBXVxWkb_aG-1yIstnb7I9sIhEKTLr_1k3Ql5Lm8qEI&s=10";
    texto.textContent = "¡Hola, mundo!";

});