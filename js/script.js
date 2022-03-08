const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector("input.letter");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// adding letter placeholders //
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// guess button event //
button.addEventListener("click", function(e) {
    e.preventDefault();
    const wordGuess = letterInput.value;
    message.innerText = "";
    const goodGuess = playerInput(wordGuess);

    if (goodGuess) {
        makeGuess(wordGuess);
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
        message.innerText = "Please only enter letters A through Z.";
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
    }
};
