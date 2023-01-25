import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Palavra<br />Secreta</h1>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen