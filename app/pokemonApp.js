/**
 * REQUISITO 1
 *
 * Formulario con input y con boton de enviar
 * Buscamos pokemon por su nombre
 *
 * Si el pokemos existe, pintamos una tarjeta con nombre
 * con imagen, y con las habilidades que tiene
 *
 * Si el pokemon no existe, pintamos una tarjetita diciendo
 * que el pokemon no existe
 * Y nos la posibilidad de resetear el formulario
 *
 *
 * REQUISITO 2
 *
 * Tenemos que hacer persistencia de cada pokemon buscado
 * Tenemos que renderizar en una lista los pokemon buscados
 * Recargamos la página, aparecen los pokemon buscados hasta ahora...
 * Boton que resetee la lista de pokemon buscados
 *
 * REQUESITO 3
 *
 * Tenemos que guardar el geoposicionamieto de cada búsqueda de pokemon
 * Mostrarlo en un mapa
 */



let searchedPokemon = ""
let pokemon
let pokemons = []
const form = document.querySelector("form")
const alert = document.querySelector(".alert")
const bienvenida = document.querySelector(".bienvenida")
const button = alert.querySelector("button")
const pokeHolder = document.querySelector(".pokemon_card_holder")
const loader = document.querySelector(".loader") // spiner loader
const resetList = document.querySelector(".reset_list")

const readLocalStorage = () => {
  const isPokemonsSet = localStorage.getItem("pokemons") !== null
  if (isPokemonsSet) {
    pokemons = JSON.parse(localStorage.getItem("pokemons"))
  }
  renderPokemons()
}

const initFormEvents = () => {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault()
    const input = form.querySelector("input")
    searchedPokemon = input.value.toLowerCase()
    fetchPokemon()
    form.reset()
  })
  pokeHolder.innerHTML = ""
}

// se puede buscar por nombre, id etc. mirar aqui las posibilidades https://pokeapi.co/docs/v2#pokemon

const fetchPokemon = async () => {
  const url = " https://pokeapi.co/api/v2/pokemon/" + searchedPokemon;
  loader.classList.remove("hidden")

  pokemon = await fetch(url)
    .then((s) => s.json()).then((d) => {
      pokemon = d

      pokemons.unshift(pokemon)
      localStorage.setItem("pokemons", JSON.stringify(pokemons))
      renderPokemons()
      loader.classList.add("hidden")
    })
    .catch(() => {
      renderError()
      loader.classList.add("hidden")
    })
    
}

const renderPokemons = () => {
  console.log(pokemons)
  let pokemonsHTML = ""
  pokemons.forEach(pokemon => {
    pokemonsHTML += `
        <div
        class="pokemon bg-white rounded-lg border-y-8 border-red-600 mb-8">
        <div class="name flex justify-center">
          <h3 class="pokemon_name text-sky-800 text-2xl text-center py-4 font-bold">
            ${pokemon.name.toUpperCase()} &nbsp
          </h3>
          <h3 class="pokemon_nam text-sky-800 text-2xl text-center py-4">
            #${pokemon.id}
          </h3>
        </div>
        <picture class="flex w-auto text-center justify-center align-middle ">
          <div>
            <img class="w-40"
              src="${pokemon.sprites.front_default}"
              alt="${pokemon.name}"
            />
            <h4 class="text-sky-800 text-md text-center pb-4 font-bold">Delante</h4>
          </div>

          <div>
            <img class="w-40"
              src="${pokemon.sprites.back_default}"
              alt="${pokemon.name}"
            />
            <h4 class="text-sky-800 text-md text-center pb-4 font-bold">Detrás</h4>
          </div>
        </picture>

        <div class="stats bg-sky-800 px-12 py-6 flex">
          <h3 class="pokemon_name text-amber-400 text-md pr-4 font-bold ">Estadísticas</h3>
          <ul>
          <li class=" pb-1 text-md text-white">Altura: ${pokemon.height}</li>
          <li class=" pb-1 text-md text-white">Peso: ${pokemon.weight} </li>
          <li class=" pb-1 text-md text-white">Experiencia: ${
            pokemon.base_experience
          }</li>
         

          </ul>
        </div>

        <div class="abilities bg-amber-400 px-12 py-6 flex font-bold ">
            <h3 class="pokemon_name text-sky-800 text-md pr-4 py-2 ">Movimientos</h3>
            <div class="text-md text-white text-center h-max ">${renderAbilities(
              pokemon.abilities
            )}</div>
        </div>
      </div>
    `
  })
  pokeHolder.innerHTML = pokemonsHTML
  alert.classList.add("hidden")
  bienvenida.classList.add("hidden")
};

const renderError = () => {
  alert.classList.remove("hidden")
  pokeHolder.innerHTML = ""
  bienvenida.classList.add("hidden")
};

const initButtonResetEvent = () => {
  button.addEventListener("click", () => {
    alert.classList.add("hidden")
    form.reset()
    renderPokemons()
    bienvenida.classList.remove("hidden")
  });
};

const initResetListEvent = () => {
  resetList.addEventListener("click", () => {
    pokemons = []
    localStorage.setItem("pokemons", JSON.stringify(pokemons))
    renderPokemons()
    bienvenida.classList.remove("hidden")
  })
}

const renderAbilities = (abilities) => {
  let stringOut = ""
  abilities.forEach((ability) => {
    stringOut += `
            <span class="font-normal bg-sky-800 rounded-md px-2 py-2 leading-10">
            ${ability.ability.name}</span> &nbsp
        `
  })
  return stringOut
}

const initPokemonApp = () => {
  initFormEvents()
  initButtonResetEvent()
  readLocalStorage
  initResetListEvent()
  
};

export {initPokemonApp}