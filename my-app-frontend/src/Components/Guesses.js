import React from 'react'
import {useState} from 'react'
import EditForm from './EditForm'

function Guesses({currentPlayer, setCurrentPlayer, players, guesses, setGuesses, counter, setCounter}) {

    const[guess, setGuess] = useState("")
    const[editFormFlag, setEditFormFlag] = useState(false)
    const[changeGuess, setChangeGuess] = useState("")

    setCurrentPlayer(players[counter])
    
    const handleAddGuess = (e) => {
        e.preventDefault()
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
            .then((dataReceived) => setGuesses(dataReceived))

        setGuess("")
        setCounter(counter + 1)
        setCurrentPlayer(players[counter])
    }

    const handleDeleteClick = (guessData) => {
        fetch(`http://localhost:9292/guesses/${guessData.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((dataReceived) => setGuesses(dataReceived))
        setGuess("")
    }

    //***Needs to show the player guessing and all of their previous guesses (in reverse order?)
    const guessList = () => currentPlayer.guesses.map((guessData) => {
            return (
            <div key={guessData.created_at}>
                <p>{guessData.actor} <button onClick={() => setEditFormFlag(true)}>Edit</button> <button onClick={() => handleDeleteClick(guessData)}>X</button></p>
                {editFormFlag ? <EditForm setEditFormFlag={setEditFormFlag} setChangeGuess={setChangeGuess} changeGuess={changeGuess} setGuesses={setGuesses} guessData={guessData}/> : null}
            </div>
        )
    })

    return (
        <div>
            <h3>Guesses</h3>
            <h5><b>Current player: {currentPlayer.name}</b></h5>
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