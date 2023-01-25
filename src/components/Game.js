import './Game.css'
import { useState, useRef, useEffect } from 'react'

const Game = ({backHome, endScreen, word, tip, letters, guessedLetters, wrongLetters, guesses, score, clear, addScore, start, setGuessedLetters}) => {

  const [newGuesses, setNewGuesses] = useState(guesses)
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  const uniqueLetters = [...new Set(letters)]
  

  const handleTry = (e) => {
    e.preventDefault()

    verifyLetter()

    setLetter("")
    letterInputRef.current.focus()

  }

  const verifyLetter = () => {

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return
    }

    if (letters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter])
    } else {
      setNewGuesses((prev) => prev - 1)
      wrongLetters.push(letter)
    }
  }

  // Check guesses
  useEffect(() => {

    if (newGuesses <= 0) {

      clear()
      endScreen()
    }

  }, [newGuesses, clear, endScreen])

  // Check win condition
  useEffect(() => {

    if (guessedLetters.length === uniqueLetters.length) {
      setNewGuesses(3)
      addScore()
      start();
    }

  }, [guessedLetters, addScore, start, uniqueLetters.length])


  return (
    <div className='game'>
        <div className='points'>
          <p>Pontuação: {score}</p>
        </div>
        <h2>Adivinhe a palavra</h2>
        <h3 className='tip'>Dica: <span>{tip.toUpperCase()}</span></h3>
        <p className='tentativas'>Você ainda tem <span>{newGuesses}</span> tentativa(s).</p>
        <div className="wordContainer">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">{letter}</span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          )}
        </div>
        <div className="letterContainer">
          <p>Tente adivinhar uma letra:</p>
          <form onSubmit={handleTry}>
            <input
              type="text"
              name='letter'
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
              />
            <button className='buttonTry'>Tentar</button>
          </form>
        </div>
        <div className="wrongLetterContainer">
          <p>Letras erradas:</p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>


        <button onClick={backHome} className='buttonGame'>Início</button>
        <button onClick={endScreen} className='buttonGame'>Tela Final</button>
    </div>
    
  )
}

export default Game