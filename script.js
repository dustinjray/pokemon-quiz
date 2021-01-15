const startBtn = document.querySelector(".start");
const input = document.querySelector(".guess-input");
const identified = document.querySelector("#correct");
const pokemonNames = [];
const guessed = [];

startBtn.disabled = true;

getPokemonNames();

async function getPokemonNames() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");
    const data = await res.json();
    populateArray(data.results);
}

function addToList(id) {
    const pokemon = document.createElement("div");
    pokemon.classList.add("identified");
    pokemon.innerHTML = `
        <div class="div-sprite">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png" alt="">
        </div>
        <div class="circle"></div>`;
    identified.appendChild(pokemon);
}

function correctGuess() {
    void identified.offsetWidth();
    identified.classList.value = "card sprites";
}

function populateArray(array) {
    for (let i = 0; i < array.length; i++) {
        if(i === 121 || i === 438 || i === 865 || i === 82) {
            switch (i) {
                case 82: pokemonNames.push("farfetch'd");
                break;
                case 121: pokemonNames.push("mr. mime");
                break;
                case 438: pokemonNames.push("mime jr.");
                break;
                case 865: pokemonNames.push("mr. rime");
                break;
            }
        } else {
            pokemonNames.push(array[i].name.toLowerCase());
        }
    }
    console.log(pokemonNames);
    console.log(pokemonNames[121], pokemonNames[438], pokemonNames[865]);
    startBtn.disabled = false;
}

function checkName(name) {
    if (pokemonNames.includes(name)) {
        const index = pokemonNames.indexOf(name);
        guessed.push(name);
        addToList(index);
        return true;
    }
    return false;
}

startBtn.addEventListener('click', () => {
    startBtn.parentElement.classList.add("hidden");
});

input.addEventListener('input', (e) => {
    const inputText = e.target.value.toLowerCase();
    if (!guessed.includes(inputText)) {
        if(checkName(inputText)) {
            input.value = "";
        }
    }
    const identifiedPokemon = identified.children;
    if (identifiedPokemon.length >= 1) {
        identifiedPokemon[identifiedPokemon.length - 1].scrollIntoView(false);
    }
});