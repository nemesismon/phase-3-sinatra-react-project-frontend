import React from 'react'
import './App.css'
import Home from './Home'
import Players from './Players'
import Guesses from './Guesses'
import {useState, useEffect} from 'react'
import NavBar from './NavBar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  const[players, setPlayers] = useState([])
  const[counter, setCounter] = useState(0)
  const[currentPlayer, setCurrentPlayer] = useState({})
  const[guesses, setGuesses] = useState([])

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
  
  // setCurrentPlayer(players[counter])

  console.log(players)

  // if (players !== []) {
  //   setCurrentPlayer(players[counter])
  //   if (currentPlayer.id < players.length) {
  //     setCounter(counter + 1)
  //     setCurrentPlayer(players[counter])
  //   } else {setCounter(0)}
  // }
  
  return (
    <div className="App">
      <header>
        <p>Fancy meeting you here. Would you like to play <b>The Name Game?</b></p>
      </header>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players players={players} setPlayers={setPlayers} setCurrentPlayer={setCurrentPlayer} counter={counter} setCounter={setCounter}/>} />
            <Route path="/guesses" element={<Guesses currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} players={players} guesses={guesses} setGuesses={setGuesses} counter={counter} setCounter={setCounter}/>} />      
          </Routes>
        </BrowserRouter>
      </div>
    </div>    
  )
}

export default App