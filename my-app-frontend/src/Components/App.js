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
  
  //***Work on context where applicable
  const[players, setPlayers] = useState([])
  const[counter, setCounter] = useState(0)

  useEffect(() => {
    fetch("http://localhost:9292/players")
    .then((r) => r.json())
    .then((dataReceived) => setPlayers(dataReceived))
  }, [])

  // console.log(players[counter].guesses[0])
  // setCurrentPlayer(players[counter])
  // console.log(currentPlayer)
      
  return (
    <div className="App">
      <header>
      </header>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />   
            <Route path="/players" element={<Players players={players} setPlayers={setPlayers} counter={counter} setCounter={setCounter}/>} />
            <Route path="/guesses" element={<Guesses setPlayers={setPlayers} players={players} counter={counter} setCounter={setCounter}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>    
  )
}

export default App