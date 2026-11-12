let btnAgregar = document.getElementById("btnAgregar");
let btnEliminar = document.getElementById("btnEliminar");

btnAgregar.addEventListener("click", (event) => {
    event.preventDefault();
    let card = document.getElementById("card");
    card.classList.add("border", "border-success", "shadow");
});

btnEliminar.addEventListener("click", (event) => {
    event.preventDefault();
    let card = document.getElementById("card");
    card.classList.remove("border", "border-success", "shadow");
});