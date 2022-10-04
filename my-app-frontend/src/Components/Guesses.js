import React, { useState } from 'react'
import EditForm from './EditForm'

function Guesses({setPlayers, players, counter, setCounter, loading, setCurrentPlayer, currentPlayer}) {

    const[guess, setGuess] = useState("")

    //***Clean up with condition for certain player ID

    // debugger

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
                player_id: currentPlayer.id,
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
    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        setCurrentPlayer(players[counter])
        return currentPlayer.guesses.map((playerGuessData) => {
            return (
            <div key={playerGuessData.created_at}> 
                <EditForm setCurrentPlayer={setCurrentPlayer} setPlayers={setPlayers} playerGuessData={playerGuessData} handleDeleteClick={handleDeleteClick}/>
            </div>
            )
            })}
        }
    
    return (
        <div>
            <h3>Guesses</h3>
            <h5><b>Current player: {currentPlayer?.name}</b></h5>
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