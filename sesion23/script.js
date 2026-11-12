const formulario = document.getElementById("formulario");
const inputTexto = document.getElementById("inputTexto");
const contenedor = document.getElementById("contenedor");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();

    const url = inputTexto.value.trim();
    mensaje.textContent = "";

    // 1. Validar que no esté vacío
    if (url === "") {
        mensaje.textContent = "Escribe una URL antes de insertar.";
        return;
    }

    const img = document.createElement("img");
    img.src = url;
    // 4. Texto alternativo
    img.alt = "Imagen insertada por el usuario";
    // 2. Controlar el tamaño
    img.classList.add("img-thumbnail");
    img.style.width = "200px";

    // 5. Si la URL no es una imagen válida, se quita y se avisa
    img.addEventListener("error", () => {
        img.remove();
        mensaje.textContent = "No se pudo cargar la imagen. Revisa la URL.";
    });

    contenedor.appendChild(img);
    inputTexto.value = "";
    inputTexto.focus();
});
