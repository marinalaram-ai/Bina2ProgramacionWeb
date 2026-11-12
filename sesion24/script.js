const listaTareas = document.getElementById("listaTareas");
const btnEliminarPrimero = document.getElementById("btnEliminarPrimero");
const inputNuevaTarea = document.getElementById("inputNuevaTarea");
const btnAgregarTarea = document.getElementById("btnAgregarTarea");

btnEliminarPrimero.addEventListener("click", () => {
    const primeraTarea = listaTareas.querySelector("li");

    if (primeraTarea) {
        primeraTarea.remove();
    } else {
        alert("No hay tareas para eliminar.");
    }
});

btnAgregarTarea.addEventListener("click", () => {
    const texto = inputNuevaTarea.value.trim();

    if (texto === "") {
        alert("Por favor, ingresa una tarea antes de agregarla.");
        return;
    }

    const nuevaTarea = document.createElement("li");
    nuevaTarea.classList.add("list-group-item");
    nuevaTarea.textContent = texto;

    listaTareas.appendChild(nuevaTarea);

    inputNuevaTarea.value = "";
});