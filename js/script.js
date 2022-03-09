const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// function to choose random word //
const getWord = async function () {
    const wordPull = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordPull.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

// adding letter placeholders //
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// guess button event //
button.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = playerInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// function for player's input //
const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter a letter from A to Z.";
    } else {
        return input;
        }
    };

// function to capture input //
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        countGuesses(guess);
        updatedLetters();
        updateWord(guessedLetters);
    }
};

// function to show the guessed letters //
const updatedLetters = function () {
    guessed.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessed.append(li);
    }
};

// function to update word in progress //
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("");
    validateWin();
};

// function to count remaining guesses //
const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
        if (!upperWord.includes(guess)) {
            message.innerText = `Sorry, the word has no ${guess}.`;
            remainingGuesses -= 1;
        } else {
            message.innerText = `Correct guess! The word has the letter ${guess}.`;
        }

        if (remainingGuesses === 0) {
            message.innerHTML = `Game over. The correct word was <span class="hightlight">${word}</span>.`;
        } else if (remainingGuesses === 1) {
            remainingSpan.innerText = `${remainingGuesses} guess`;
        } else {
            remainingSpan.innerText = `${remainingGuesses} guesses`;
        }
    };

// function if player won //
const validateWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class = "highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

// function to hide & show elements //
const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    guessed.classList.add("hide");
    playAgainButton.classList.remove("hide");
    };

// click event for play again button //
playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingSpan.innerText= `${remainingGuesses} guesses`;
    guessed.innerHTML = "";
    message.innerText = "";
    getWord();
    
    button.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remaining.classList.remove("hide");
    guessed.classList.remove("hide");
});
