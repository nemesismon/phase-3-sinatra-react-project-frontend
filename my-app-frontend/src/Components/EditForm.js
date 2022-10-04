import React, {useState} from 'react'

function EditForm({setPlayers, playerGuessData, handleDeleteClick}) {

const[editFormFlag, setEditFormFlag] = useState(false)
const[changeGuess, setChangeGuess] = useState("")

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
        .then((dataReceived) => setPlayers(dataReceived))
    setEditFormFlag(false)
    setChangeGuess("")
    }

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