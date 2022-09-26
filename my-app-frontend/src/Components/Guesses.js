import React from 'react'
import {useState} from 'react'
import EditForm from './EditForm'

function Guesses({currentPlayer, guesses, setGuesses, setCurrentPlayer, players}) {

    const[guess, setGuess] = useState("")
    const[editFormFlag, setEditFormFlag] = useState(false)
    const[changeGuess, setChangeGuess] = useState("")
    const[counter, setcounter] = useState(0)

    setCurrentPlayer(players[counter])
    console.log(currentPlayer)

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
        if (currentPlayer.id < players.length) {
            setcounter(counter + 1)
            setCurrentPlayer(players[counter])
        } else {
            setcounter(0)
        }
    }

    const handleDeleteClick = (guessData) => {
        fetch(`http://localhost:9292/guesses/${guessData.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((dataReceived) => setGuesses(dataReceived))
        setGuess("")
    }

    //***Move up to parent
    //State added to drop in input to edit guess onClick and make PATCH request
    const guessList = () => guesses.map((guessData) => {
                return (
            <div key={guessData.created_at}>
                <p>{guessData.actor} - ({guessData.player_id}) <button onClick={() => setEditFormFlag(true)}>Edit</button> <button onClick={() => handleDeleteClick(guessData)}>X</button></p>
                {editFormFlag ? <EditForm setEditFormFlag={setEditFormFlag} setChangeGuess={setChangeGuess} changeGuess={changeGuess} setGuesses={setGuesses} guessData={guessData}/> : null}
            </div>
        )
    })

    return (
        <div>
            <h3>Guesses</h3>
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