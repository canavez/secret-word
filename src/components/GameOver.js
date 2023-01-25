import './GameOver.css'

const GameOver = ({retry, backHome, score}) => {
  return (
    <div className='end'>
      <h1>Fim de Jogo!</h1>
      <h2>A sua pontuação foi: <span className="score">{score}</span></h2>
      <button onClick={backHome}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver