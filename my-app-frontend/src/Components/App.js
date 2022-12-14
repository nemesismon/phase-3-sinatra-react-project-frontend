import React, {useState, useEffect} from 'react'
import './App.css'
import Home from './Home'
import Players from './Players'
import Guesses from './Guesses'
import NavBar from './NavBar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  const[players, setPlayers] = useState([])
  const[counter, setCounter] = useState(0)
  const[loading, setLoading] = useState(true)
  const[currentPlayer, setCurrentPlayer] = useState(null)

  useEffect(() => {
    fetch("http://localhost:9292/players")
    .then((r) => r.json())
    .then((dataReceived) => {setPlayers(dataReceived); setLoading(false)})
  }, [])

  if (!loading && currentPlayer !== players[counter]) {
    setCurrentPlayer(players[counter])
  }
      
  return (
    <div className="App">
      <header>
      </header>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />   
            <Route path="/players" element={<Players players={players} setPlayers={setPlayers}/>} />
            <Route path="/guesses" element={<Guesses setPlayers={setPlayers} players={players} counter={counter} setCounter={setCounter} loading={loading} setCurrentPlayer={setCurrentPlayer} currentPlayer={currentPlayer}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>    
  )
}

export default App