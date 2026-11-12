/* Buscador de Pokémon:
- Al hacer clic en "Buscar" se lee el texto de search-input.
- Con filter se dejan sólo los Pokémon cuyo nombre contiene ese texto.
- Con map se transforma cada Pokémon en un <li> con nombre, imagen y peso.
- Antes de mostrar los resultados se limpia la lista pokemon-list. */
let listaPokemon = document.getElementById('pokemon-list');
let inputBusqueda = document.getElementById('search-input');
let botonBusqueda = document.getElementById('search-button');

// Aquí guardamos la lista de Pokémon de la primera solicitud
let todosLosPokemon = [];

// Primera solicitud: obtener la lista de todos los Pokémon (nombre y url)
fetch("https://pokeapi.co/api/v2/pokemon/?limit=100000")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        todosLosPokemon = data.results;
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

// Crea un <li> con el nombre, la imagen y el peso de un Pokémon
function crearElementoPokemon(pokemonData) {
    let li = document.createElement('li');
    li.classList.add('list-group-item');

    // Nombre
    let nombre = document.createElement('p');
    nombre.textContent = pokemonData.name;

    // Imagen
    let imagen = document.createElement('img');
    imagen.src = pokemonData.sprites.front_default;
    imagen.alt = pokemonData.name;

    // Peso
    let peso = document.createElement('p');
    peso.textContent = 'Peso: ' + pokemonData.weight;

    li.appendChild(nombre);
    li.appendChild(imagen);
    li.appendChild(peso);
    return li;
}

// Al hacer clic en "Buscar"
botonBusqueda.addEventListener('click', () => {
    let texto = inputBusqueda.value.trim().toLowerCase();

    // d. Limpiar la lista actual antes de mostrar los resultados
    listaPokemon.innerHTML = '';

    // a. filter: sólo los Pokémon cuyo nombre contiene el texto
    let filtrados = todosLosPokemon.filter(pokemon =>
        pokemon.name.includes(texto)
    );

    if (filtrados.length === 0) {
        listaPokemon.innerHTML = '<li class="list-group-item">No se encontraron Pokémon</li>';
        return;
    }

    // b. map en lugar de forEach: cada Pokémon se convierte en una promesa de <li>
    let promesas = filtrados.map(pokemon =>
        fetch(pokemon.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.status);
                }
                return response.json();
            })
            .then(pokemonData => crearElementoPokemon(pokemonData))
    );

    // c. Esperar el nuevo array de <li> y mostrarlos en pokemon-list
    Promise.all(promesas)
        .then(elementosLi => {
            listaPokemon.innerHTML = '';
            listaPokemon.append(...elementosLi);
        })
        .catch(error => {
            console.error('Error al obtener los datos del Pokémon:', error);
        });
});
