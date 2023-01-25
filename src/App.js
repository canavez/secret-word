// CSS
import './App.css';

// React
import { useState } from 'react';

// Data
import {wordsList} from './data/words'

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    // Pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {category, word}
  }

  // Navigation
  const startGame = () => {
    const {category, word} = pickWordAndCategory()

    // Create array letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((a) => a.toLowerCase())
    // console.log(wordLetters)

    // Fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)
    setGuessedLetters([])
    setWrongLetters([])
    setGuesses(3)

    setGameStage(stages[1].name)
  }
  const backHome = () => {
    setGameStage(stages[0].name)
  }
  const endScreen = () => {
    setGameStage(stages[2].name)
  }
  const retry = () => {
    setGameStage(stages[1].name)
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  const addScore = () => {
    setScore((prev) => (prev += 100))
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
      <Game 
        backHome={backHome}
        endScreen={endScreen}
        word={pickedWord}
        tip={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        clear={clearLetterStates}
        addScore={addScore}
        start={startGame}

      />}
      {gameStage === 'end' && <GameOver retry={retry} backHome={backHome} score={score} start={startGame}/>}
    </div>
  );
}

export default App;
