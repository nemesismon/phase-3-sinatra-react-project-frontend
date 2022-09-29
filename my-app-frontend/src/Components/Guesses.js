import React from 'react'
import {useState} from 'react'
import EditForm from './EditForm'

function Guesses({setPlayers, player, players, counter, setCounter}) {

    const[guess, setGuess] = useState("")
    const[editFormFlag, setEditFormFlag] = useState(false)
    const[changeGuess, setChangeGuess] = useState("")
    const[currentPlayer, setCurrentPlayer] = useState([])
   
    const handleAddGuess = (e) => {
        e.preventDefault()
        if (guess === '') {
            return
        } else {
        fetch("http://localhost:9292/guesses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                actor: guess,
                player_id: player.id,
            }),
        })
        .then((r) => r.json())
        .then((dataReceived) => setPlayers(dataReceived))

        setGuess("")
        counter < players.length - 1 ? setCounter(counter + 1) : setCounter(0)
    }}

    const handleDeleteClick = (playerGuessData) => {
        fetch(`http://localhost:9292/guesses/${playerGuessData.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((dataReceived) => setPlayers(dataReceived))
        setGuess("")
    }

    //***Needs to show the player guessing and all of their previous guesses (in reverse order?)

    const guessList = () => {
        return player.guesses.map((playerGuessData) => {
            return (
            <div key={playerGuessData.created_at}>
                <p>{playerGuessData.actor} <button onClick={() => setEditFormFlag(true)}>Edit</button> <button onClick={() => handleDeleteClick(playerGuessData)}>X</button> </p>
                {editFormFlag ? <EditForm setEditFormFlag={setEditFormFlag} setChangeGuess={setChangeGuess} changeGuess={changeGuess} playerGuessData={playerGuessData}/> : null}
            </div>
            )
        })
    }
    
    return (
        <div>
            <h3>Guesses</h3>
            <h5><b>Current player: {player.name}</b></h5>
            <form onSubmit={handleAddGuess}>
                <input 
                    type="text"
                    name="guess"
                    placeholder="Name an actor"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {guessList()}
        </div>
    )
}

export default Guesses