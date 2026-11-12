const botonesAgregar = document.querySelectorAll(".btn-agregar");
const btnEliminar = document.getElementById("btnEliminar");
const listaCarrito = document.getElementById("listaCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const mensaje = document.getElementById("mensaje");

let contador = 0;
let total = 0;

// Actualiza el contador, el total y el mensaje de carrito vacío
function actualizarCarrito() {
    contadorCarrito.textContent = contador;
    totalCarrito.textContent = "$" + total;

    if (contador === 0) {
        carritoVacio.classList.remove("d-none");
    } else {
        carritoVacio.classList.add("d-none");
    }

    btnEliminar.disabled = contador === 0;
}

// Pone un color al contador por un momento y luego lo regresa a gris
function colorContador(color) {
    contadorCarrito.classList.remove("bg-secondary", "bg-success", "bg-danger");
    contadorCarrito.classList.add(color);

    setTimeout(() => {
        contadorCarrito.classList.remove(color);
        contadorCarrito.classList.add("bg-secondary");
    }, 800);
}

// Muestra un mensaje con color de Bootstrap (alert-success o alert-danger)
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.classList.remove("d-none", "alert-success", "alert-danger");
    mensaje.classList.add(color);
}

// Agrega un producto al final de la lista del carrito
function agregarProducto(nombre, precio) {
    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "list-group-item-success");
    item.dataset.nombre = nombre;
    item.dataset.precio = precio;
    item.innerHTML = "<span>" + nombre + "</span><span>$" + precio + "</span>";
    listaCarrito.appendChild(item);

    contador++;
    total += precio;
    actualizarCarrito();

    // Estados visuales en verde
    colorContador("bg-success");
    mostrarMensaje("Se agregó " + nombre + " al carrito", "alert-success");

    // El verde del ítem dura un momento
    setTimeout(() => {
        item.classList.remove("list-group-item-success");
    }, 800);
}

// Elimina el último producto añadido al carrito
function eliminarProducto() {
    if (contador === 0) return;
    btnEliminar.disabled = true; // evita borrar el mismo ítem dos veces con doble clic

    const item = listaCarrito.lastElementChild;
    const nombre = item.dataset.nombre;
    const precio = Number(item.dataset.precio);

    contador--;
    total -= precio;

    // Estados visuales en rojo
    item.classList.remove("list-group-item-success");
    item.classList.add("list-group-item-danger");
    colorContador("bg-danger");
    mostrarMensaje("Se eliminó " + nombre + " del carrito", "alert-danger");

    // Se quita después de mostrarse en rojo
    setTimeout(() => {
        item.remove();
        actualizarCarrito();
    }, 300);
}

// Botones "Agregar"
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        agregarProducto(boton.dataset.nombre, Number(boton.dataset.precio));

        boton.classList.replace("btn-primary", "btn-success");
        boton.textContent = "¡Agregado!";

        setTimeout(() => {
            boton.classList.replace("btn-success", "btn-primary");
            boton.textContent = "Agregar";
        }, 800);
    });
});

// Botón "Eliminar último"
btnEliminar.addEventListener("click", eliminarProducto);

actualizarCarrito();
