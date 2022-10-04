import React, { useState, useEffect } from 'react'
import EditForm from './EditForm'

function Guesses({setPlayers, players, counter, setCounter}) {

    const[guess, setGuess] = useState("")
    const[currentPlayer, setCurrentPlayer] = useState()

    //***Clean up with condition for certain player ID
    useEffect(() => {
        fetch(`http://localhost:9292/players/${counter}`)
        .then((r) => r.json())
        .then((player) => setCurrentPlayer(player))
    }, [players, counter])

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
        .then((dataReceived) => setCurrentPlayer(dataReceived))

        setGuess("")
        counter < players.length - 1 ? setCounter(counter + 1) : setCounter(1)
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

    // debugger
    
    const guessList = () => {
    if(currentPlayer === undefined) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
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