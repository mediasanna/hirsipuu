const input = document.querySelector('input')
const output = document.querySelector('output')
const correctCountSpan = document.querySelector('#correct-count')
const incorrectCountSpan = document.querySelector('#incorrect-count')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''
let correctCount = 0
let incorrectCount = 0

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    output.innerHTML = maskedWord
    correctCount = 0
    incorrectCount = 0
    updateScoreboard()
}

const win = () => {
    alert(`You have guessed right, the word is "${randomizedWord}".`)
    newGame()
}

const updateScoreboard = () => {
    correctCountSpan.innerHTML = correctCount
    incorrectCountSpan.innerHTML = incorrectCount
}

const replaceFoundChars = (guess) => {
    let found = false
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord[i]
        if (char === guess) {
            let newString = maskedWord.split('')
            newString[i] = guess
            maskedWord = newString.join('')
            found = true
        }
    }
    output.innerHTML = maskedWord

    if (found) {
        correctCount++
    } else {
        incorrectCount++
    }
    updateScoreboard()
}

newGame()

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const guess = input.value.toLowerCase()
        input.value = ''

        if (guess === randomizedWord.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            replaceFoundChars(guess)
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win()
            }
        } else {
            incorrectCount++
            updateScoreboard()
            alert("You guessed wrong!")
        }
    }
})


