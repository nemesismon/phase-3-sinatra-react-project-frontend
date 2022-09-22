import './App.css'
import Home from './Home'
import Player from './Player'
import Guess from './Guess'
import {useState, useEffect} from 'react'
import NavBar from './NavBar'
import GuessNumbers from './GuessNumbers'
import {Route} from 'react-router-dom'
import Switch from 'switch'

function App() {

  //Updated App with creation of function components
  //***Page routing and rendering***
  
  const[players, setPlayers] = useState([])
  const[currentPlayer, setCurrentPlayer] = useState([])
  const[guesses, setGuesses] = useState([])

  //***GETs here too***
  // Handle database check and state reestablishment in the event of page refresh
  useEffect(() => {
    fetch("http://localhost:9292/players")
    .then((r) => r.json())
    .then((dataReceived) => setPlayers(dataReceived))
  }, [])

  useEffect(() => {
    fetch("http://localhost:9292/guesses")
    .then((r) => r.json())
    .then((dataReceived) => setGuesses(dataReceived))
  }, [])
  
  //***Create player turn cycle and send current player_id to Guess***
  //***Make the turns simpler***
  // const handlePlayerTurn = (direction) => {
  //   let i = 0
  //   do {
  //     if (direction === "next") {
  //       i++
  //       if (i > players.length) {
  //         i = 0
  //       }
  //       setCurrentPlayer(players[i])
  //     } 
  //     if (direction === "previous") {
  //       i--
  //       if (i < 0) {
  //         i = players.length
  //       }
  //       setCurrentPlayer(players[i])
  //     }
  //   } while (i > -1)
  // }

  return (
    <div className="App">
      <header>
        <p>Fancy meeting you here. Would you like to play <b>The Name Game?</b></p>
      </header>
        <div>
          <NavBar />
            <Switch>
              <Route exact path="/player">
                <Player players={players} setPlayers={setPlayers} />
              </Route>
              <Route exact path="/guess">
                <Guess currentPlayer={currentPlayer} guess={guesses} setGuesses={setGuesses}/>
              </Route>
              <Route exact path="/guessnumbers">
                <GuessNumbers />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>       
        </div>
    </div>    
  )
}

export default App