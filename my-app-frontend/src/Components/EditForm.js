import React, {useState} from 'react'

function EditForm({setPlayers, players, playerGuessData, handleDeleteClick}) {

const[editFormFlag, setEditFormFlag] = useState(false)
const[changeGuess, setChangeGuess] = useState("")
const[updatedGuess, setUpdatedGuess] = useState(null)

const handleGuessUpdate = (e) => {
    e.preventDefault()
    if (changeGuess === '') {
        setEditFormFlag(false)
        return
    }
    fetch(`http://localhost:9292/guesses/${playerGuessData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            actor: changeGuess,
        }),
    })
        .then((r) => r.json())
        .then((changedGuessData) => setUpdatedGuess(changedGuessData))
        
        
    setEditFormFlag(false)
    setChangeGuess("")
    }

    if (updatedGuess !== null)
        players.forEach((player) => {
            return player.guesses.map((guess) => {
                if (guess.id === updatedGuess.id) {
                    guess.actor = updatedGuess.actor
                }
                return guess
            })
        })

    const handleEditClick = () => {
        setEditFormFlag(true)
    }

    const formDisplay = () => {
        return (
            editFormFlag ? 
            <div>
                <form onSubmit={handleGuessUpdate}>
                    <input 
                        type="text"
                        name="guess"
                        placeholder={playerGuessData.actor}
                        value={changeGuess}
                        onChange={(e) => setChangeGuess(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
                </div>
            : null
        )
    }

    return (
        <div>
            <p>{playerGuessData.actor} <button onClick={() => handleEditClick()}>Edit</button> <button onClick={() => handleDeleteClick(playerGuessData)}>X</button></p> 
            {formDisplay()}        
        </div>
    )
}
export default EditForm