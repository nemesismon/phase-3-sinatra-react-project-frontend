import React, { useState, useEffect } from 'react'
import EditForm from './EditForm'

function Guesses({setPlayers, players, counter, setCounter, loading, setCurrentPlayer, currentPlayer}) {

    const[guess, setGuess] = useState("")
    const[addedGuess, setAddedGuess] = useState(null)

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
        .then((newGuessData) => setAddedGuess(newGuessData))
        }
        setGuess("")
        counter < players.length - 1 ? setCounter(counter + 1) : setCounter(0)
    }

    console.log(addedGuess)

    useEffect(() => {
        console.log(addedGuess)
        if (addedGuess !== null) {
            players[(addedGuess.player_id) - 1].guesses.push(addedGuess)
            setAddedGuess(null)
        }
    }, [addedGuess, players])

    const handleDeleteClick = (currentGuessData) => {
        fetch(`http://localhost:9292/guesses/${currentGuessData.id}`, {
            method: "DELETE",
        })
        setGuess("")
        const playerGuessArray = players[currentGuessData.player_id - 1].guesses
        const idIndex = playerGuessArray.findIndex((element) => element.id === currentGuessData.id)
        const tempPlayers = players.filter((player) => {
            if (player.id === currentGuessData.player_id) {
                playerGuessArray.splice(idIndex, 1)
            } 
            return player
        })
        setPlayers(tempPlayers)
        console.log(players)
    }

    const guessList = () => {
    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return currentPlayer.guesses.map((playerGuessData) => {
            return (
            <div key={playerGuessData.id}> 
                <EditForm setCurrentPlayer={setCurrentPlayer} players={players} setPlayers={setPlayers} playerGuessData={playerGuessData} handleDeleteClick={handleDeleteClick}/>
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
            <h5>{currentPlayer?.name}'s previous guesses:</h5>
            {guessList()}
        </div>
    )
}

export default Guesses