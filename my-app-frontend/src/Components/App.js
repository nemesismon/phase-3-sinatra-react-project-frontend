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
  const[currentPlayer, setCurrentPlayer] = useState([])
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

  console.log(players)

  //***Create player turn cycle and send current player_id to Guess***
  //***Make the turns simpler***
  // console.log(guesses[guesses.length].id)
  // for (let i=0; i < players.length; i++) {
  // useEffect(() => {
  //   const check = playerGuessCheck(i) 
  //   console.log(check)
  // }, [loading])
  //   setLoading(true)
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
            <Route path="/players" element={<Players players={players} setPlayers={setPlayers}/>} />
            <Route path="/guesses" element={<Guesses currentPlayer={currentPlayer} guesses={guesses} setGuesses={setGuesses} setCurrentPlayer={setCurrentPlayer} players={players}/>} />      
          </Routes>
        </BrowserRouter>
      </div>
    </div>    
  )
}

export default App