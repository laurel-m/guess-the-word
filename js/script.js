const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector("input.letter");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const messages = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
    console.log(wordGuess);
    letterInput.value= "";
});
