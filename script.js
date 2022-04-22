const startBtn = document.querySelector(".start");
const input = document.querySelector(".guess-input");
const identified = document.querySelector("#correct");
const gameArea = document.querySelector(".game");
const fiveBtn = document.querySelector("#five");
const twelveBtn = document.querySelector("#twelve");
const twentyFiveBtn = document.querySelector("#twenty-five");
const endBtn = document.querySelector(".end");
const restartBtn = document.querySelector(".restart");
// const pokemonNames = [];
// const guessed = [];
// const guessedIndex = [];

const pokemonInfo = {};
const guessed = {};


let gameStart = false;
let gameEnd = false;
let minutes = 25;
let seconds = 0;
let interval;
let numberGuessed = 0;
let totalPokemon = 0;

startBtn.disabled = true;
restartBtn.disabled = true;

getPokemonNames();

async function getPokemonNames() {
    // Get a list of every pokemon from the pokemon api
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");
    const data = await res.json();
    totalPokemon = data.results.length;
    populateAnswers(data.results);
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

function playCorrectGuessAnimation() {
    // Utiilize offsetWidth to force a page repaint so that CSS animation will play again when a correct answer is entered.
    // Technique found here: https://stackoverflow.com/questions/50612096/removing-class-from-element-isnt-triggering-css-animation
    void identified.offsetWidth;
    identified.classList.remove("correct");
    void identified.offsetWidth;
    identified.classList.add("correct");
}

function populateAnswers(array) {
    // Adds the name of each pokemon to the object that manages correct answers.
    for (let i = 0; i < array.length; i++) {
        // Fix names that have unnecessary characters or regional qualifiers.
        switch (i) {
            case 82:
                pokemonInfo["farfetch'd"] = { number: i, guessed: false };
                // pokemonNames.push("farfetch'd");
                break;
            case 121:
                pokemonInfo["mr. mime"] = { number: i, guessed: false };
                // pokemonNames.push("mr. mime");
                break;
            case 385:
                pokemonInfo["deoxys"] = { number: i, guessed: false };
                //pokemonNames.push("deoxys");
                break;
            case 412:
                pokemonInfo["wormadam"] = { number: i, guessed: false };
                //pokemonNames.push("wormadam");
                break;

            case 438:
                pokemonInfo["mime jr."] = { number: i, guessed: false };
                // pokemonNames.push("mime jr.");
                break;

            case 486:
                pokemonInfo["giratina"] = { number: i, guessed: false };
                //pokemonNames.push("giratina");
                break;

            case 491:
                pokemonInfo["shaymin"] = { number: i, guessed: false };
                //pokemonNames.push("shaymin");
                break;

            case 549:
                pokemonInfo["basculin"] = { number: i, guessed: false };
                //pokemonNames.push("basculin");
                break;

            case 554:
                pokemonInfo["darmanitan"] = { number: i, guessed: false };
                //pokemonNames.push("darmanitan");
                break;

            case 640:
                pokemonInfo["tornadus"] = { number: i, guessed: false };
                //pokemonNames.push("tornadus");
                break;

            case 641:
                pokemonInfo["thundurus"] = { number: i, guessed: false };
                //pokemonNames.push("thundurus");
                break;

            case 644:
                pokemonInfo["landorus"] = { number: i, guessed: false };
                //pokemonNames.push("landorus");
                break;

            case 646:
                pokemonInfo["keldeo"] = { number: i, guessed: false };
                //pokemonNames.push("keldeo");
                break;

            case 647:
                pokemonInfo["meloetta"] = { number: i, guessed: false };
                //pokemonNames.push("meloetta");
                break;

            case 677:
                pokemonInfo["meowstic"] = { number: i, guessed: false };
                //pokemonNames.push("meowstic");
                break;

            case 680:
                pokemonInfo["aegislash"] = { number: i, guessed: false };
                //pokemonNames.push("aegislash");
                break;

            case 709:
                pokemonInfo["pumpkaboo"] = { number: i, guessed: false };
                //pokemonNames.push("pumpkaboo");
                break;

            case 710:
                pokemonInfo["gourgeist"] = { number: i, guessed: false };
                //pokemonNames.push("gourgeist");
                break;

            case 740:
                pokemonInfo["oricorio"] = { number: i, guessed: false };
                //pokemonNames.push("oricorio");
                break;

            case 744:
                pokemonInfo["lycanroc"] = { number: i, guessed: false };
                //pokemonNames.push("lycanroc");
                break;

            case 745:
                pokemonInfo["wishiwashi"] = { number: i, guessed: false };
                //pokemonNames.push("wishiwashi");
                break;

            case 771:
                pokemonInfo["type: null"] = { number: i, guessed: false };
                //pokemonNames.push("type: null");
                break;

            case 773:
                pokemonInfo["minior"] = { number: i, guessed: false };
                //pokemonNames.push("minior");
                break;

            case 777:
                pokemonInfo["mimikyu"] = { number: i, guessed: false };
                //pokemonNames.push("mimikyu");
                break;

            case 784:
                pokemonInfo["tapu koko"] = { number: i, guessed: false };
                //pokemonNames.push("tapu koko");
                break;

            case 785:
                pokemonInfo["tapu lele"] = { number: i, guessed: false };
                //pokemonNames.push("tapu lele");
                break;

            case 786:
                pokemonInfo["tapu bulu"] = { number: i, guessed: false };
                //pokemonNames.push("tapu bulu");
                break;

            case 787:
                pokemonInfo["tapu fini"] = { number: i, guessed: false };
                //pokemonNames.push("tapu fini");
                break;

            case 848:
                pokemonInfo["toxtricity"] = { number: i, guessed: false };
                //pokemonNames.push("toxtricity");
                break;

            case 864:
                pokemonInfo["sirfetch'd"] = { number: i, guessed: false };
                //pokemonNames.push("sirfetch'd");
                break;

            case 865:
                pokemonInfo["mr. rime"] = { number: i, guessed: false };
                //pokemonNames.push("mr. rime");
                break;

            case 874:
                pokemonInfo["eiscue"] = { number: i, guessed: false };
                //pokemonNames.push("eiscue");
                break;

            case 887:
                pokemonInfo["zacian"] = { number: i, guessed: false };
                //pokemonNames.push("zacian");
                break;

            case 888:
                pokemonInfo["zamazenta"] = { number: i, guessed: false };
                //pokemonNames.push("zamazenta");
                break;

            case 891:
                pokemonInfo["urshifu"] = { number: i, guessed: false };
                //pokemonNames.push("urshifu");
                break;
            default:
                pokemonInfo[array[i].name.toLowerCase()] = { number: i, guessed: false };
            //pokemonNames.push(array[i].name.toLowerCase());
        }
    }
    startBtn.disabled = false;
}

function resetGuesses() {
    //Reset all pokemon names to not guessed status.
    for (const pokemon in pokemonInfo) {
        pokemonInfo[pokemon].guessed = false;
    }
}

function checkName(name) {
    //Check if the pokemon name is correct and if it has not already been guessed this game.
    return pokemonInfo.hasOwnProperty(name) && !pokemonInfo[name].guessed;

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
    // Create list items for each pokemon name that was not guessed this game.
    const scoreText = document.querySelector(".score");
    scoreText.innerText = `You Remembered ${numberGuessed} / ${totalPokemon}!`
    const missedCard = document.querySelector(".missed-div");
    const missed = document.querySelector(".missed");
    for (const pokemon in pokemonInfo) {
        if (!pokemonInfo[pokemon].guessed) {
            const missedName = document.createElement("li");
            missedName.innerHTML = `<span>${pokemon}</span>`;
            missed.appendChild(missedName);
        }
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
    resetGuesses();
    if (minutes <= 0) {
        minutes = 25;
        setMinutesText();
    };
    restartBtn.disabled = true;
    input.disabled = false;
    numberGuessed = 0;
});

input.addEventListener('input', (e) => {
    if (gameStart && !gameEnd) {
        // If the game has started and has not ended, grab the input text and check it against correct guesses and possible answers.
        const inputText = e.target.value.toLowerCase().trim();
        if (pokemonInfo.hasOwnProperty(inputText)) {
            if (checkName(inputText)) {
                addToList(pokemonInfo[inputText].number);
                pokemonInfo[inputText].guessed = true;
                input.value = "";
                playCorrectGuessAnimation();
                numberGuessed++;
            }
        }
    } else {
        // Start the game and timer, disable the time buttons until the game is over.
        gameStart = true;
        interval = setInterval(countdownSeconds, 1000);
        disableTimeBtns();
    }
    const identifiedPokemon = identified.children;
    if (identifiedPokemon.length >= 1) {
        identifiedPokemon[identifiedPokemon.length - 1].scrollIntoView(false);
    }
});