const startBtn = document.querySelector(".start");
const input = document.querySelector(".guess-input");
const identified = document.querySelector("#correct");
const gameArea = document.querySelector(".game");
const fiveBtn = document.querySelector("#five");
const twelveBtn = document.querySelector("#twelve");
const twentyFiveBtn = document.querySelector("#twenty-five");
const endBtn = document.querySelector(".end");
const restartBtn = document.querySelector(".restart");
const pokemonNames = [];
const guessed = [];
const guessedIndex = [];

let gameStart = false;
let gameEnd = false;
let minutes = 1;
let seconds = 1;
let interval;

startBtn.disabled = true;
restartBtn.disabled = true;

getPokemonNames();

async function getPokemonNames() {
    // Get a list of every pokemon from the pokemon api
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");
    const data = await res.json();
    populateArray(data.results);
}

function addToList(id) {
    // Adds sprite of correctly guessed pokemon to the 'identified' section of the game area.
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
    void identified.offsetWidth;
    identified.classList.remove("correct");
    void identified.offsetWidth;
    identified.classList.add("correct");
}

function populateArray(array) {
    for (let i = 0; i < array.length; i++) {
        // Fix names that have unnecessary characters or regional qualifiers.
        switch (i) {
            case 82: pokemonNames.push("farfetch'd");
                break;
            case 121: pokemonNames.push("mr. mime");
                break;
            case 385: pokemonNames.push("deoxys");
                break;
            case 412: pokemonNames.push("wormadam");
                break;
            case 438: pokemonNames.push("mime jr.");
                break;
            case 486: pokemonNames.push("giratina");
                break;
            case 491: pokemonNames.push("shaymin");
                break;
            case 549: pokemonNames.push("basculin");
                break;
            case 554: pokemonNames.push("darmanitan");
                break;
            case 640: pokemonNames.push("tornadus");
                break;
            case 641: pokemonNames.push("thundurus");
                break;
            case 644: pokemonNames.push("landorus");
                break;
            case 646: pokemonNames.push("keldeo");
                break;
            case 647: pokemonNames.push("meloetta");
                break;
            case 677: pokemonNames.push("meowstic");
                break;
            case 680: pokemonNames.push("aegislash");
                break;
            case 709: pokemonNames.push("pumpkaboo");
                break;
            case 710: pokemonNames.push("gourgeist");
                break;
            case 740: pokemonNames.push("oricorio");
                break;
            case 744: pokemonNames.push("lycanroc");
                break;
            case 745: pokemonNames.push("wishiwashi");
                break;
            case 771: pokemonNames.push("type: null");
                break;
            case 773: pokemonNames.push("minior");
                break;
            case 777: pokemonNames.push("mimikyu");
                break;
            case 784: pokemonNames.push("tapu koko");
                break;
            case 785: pokemonNames.push("tapu lele");
                break;
            case 786: pokemonNames.push("tapu bulu");
                break;
            case 787: pokemonNames.push("tapu fini");
                break;
            case 848: pokemonNames.push("toxtricity");
                break;
            case 864: pokemonNames.push("sirfetch'd");
                break;
            case 865: pokemonNames.push("mr. rime");
                break;
            case 874: pokemonNames.push("eiscue");
                break;
            case 887: pokemonNames.push("zacian");
                break;
            case 888: pokemonNames.push("zamazenta");
                break;
            case 891: pokemonNames.push("urshifu");
                break;
            default: pokemonNames.push(array[i].name.toLowerCase());
        }
    }
    startBtn.disabled = false;
}

function checkName(name) {
    if (pokemonNames.includes(name)) {
        const index = pokemonNames.indexOf(name);
        guessed.push(name);
        guessedIndex.push(index);
        addToList(index);
        return true;
    }
    return false;
}

function countdownSeconds() {
    if (seconds === 0) {
        if (minutes === 0) {
            setSecondsText();
            endGame();
        } else {
            countdownMinutes();
            seconds = 59;
            setSecondsText();
        }
    } else {
        seconds--;
        setSecondsText();
    }
}

function countdownMinutes() {
    minutes--;
    setMinutesText();
}

function setMinutesText() {
    // Change the minutes display text to the current minutes remaining.
    const minutesText = document.querySelector(".minutes");
    minutesText.innerText = minutes.toString();
}

function setSecondsText() {
    // Change the seconds display text to the current seconds remaining.
    const secondsText = document.querySelector(".seconds");
    secondsText.innerText = seconds.toString().padStart(2, "0");
}

function disableTimeBtns() {
    // Disable all the time selection buttons.
    fiveBtn.disabled = true;
    twelveBtn.disabled = true;
    twentyFiveBtn.disabled = true;
}

function enableTimeBtns() {
    // Enable all the time selection buttons.
    fiveBtn.disabled = false;
    twelveBtn.disabled = false;
    twentyFiveBtn.disabled = false;
}

function endGame() {
    gameEnd = true;
    gameStart = false;
    input.value = "";
    restartBtn.disabled = false;
    clearInterval(interval);
    input.disabled = true;
    populateMissed();
    enableTimeBtns();
}

function populateMissed() {
    const scoreText = document.querySelector(".score");
    scoreText.innerText = `You Remembered ${guessed.length} / ${pokemonNames.length}!`
    const missedCard = document.querySelector(".missed-div");
    const missed = document.querySelector(".missed");
    const missedList = pokemonNames.filter(name => !guessed.includes(name));
    for (let name of missedList) {
        const item = document.createElement("li");
        item.innerHTML = `<span>${name}</span>`;
        missed.appendChild(item);
    }
    missedCard.classList.remove("hidden");
    missedCard.scrollIntoView(true);
}

function clearMissed() {
    const missedCard = document.querySelector(".missed-div");
    const missed = document.querySelector(".missed");
    missedCard.classList.add("hidden");
    missed.innerHTML = "";
}

function clearSprites() {
    identified.innerHTML = "";
}


startBtn.addEventListener('click', () => {
    startBtn.parentElement.classList.add("hidden");
    gameArea.classList.remove("hidden");
});

fiveBtn.addEventListener('click', () => {
    minutes = 5;
    setMinutesText();
});
twelveBtn.addEventListener('click', () => {
    minutes = 12;
    setMinutesText();
});
twentyFiveBtn.addEventListener('click', () => {
    minutes = 25;
    setMinutesText();
});

endBtn.addEventListener('click', () => {
    minutes = 0;
    seconds = 0;
    setMinutesText();
    setSecondsText();
    endGame();
});

restartBtn.addEventListener('click', () => {
    gameEnd = false;
    gameStart = false;
    clearMissed();
    clearSprites();
    if (minutes <= 0) {
        minutes = 25;
        setMinutesText();
    };
    guessed.length = 0;
    guessedIndex.length = 0;
    restartBtn.disabled = true;
    input.disabled = false;
});

input.addEventListener('input', (e) => {
    if (gameStart && !gameEnd) {
        const inputText = e.target.value.toLowerCase().trim();
        if (!guessed.includes(inputText)) {
            if (checkName(inputText)) {
                input.value = "";
                correctGuess();
            }
        }
    } else {
        gameStart = true;
        interval = setInterval(countdownSeconds, 1000);
        disableTimeBtns();
        console.log("Game started");
    }
    const identifiedPokemon = identified.children;
    if (identifiedPokemon.length >= 1) {
        identifiedPokemon[identifiedPokemon.length - 1].scrollIntoView(false);
    }
});