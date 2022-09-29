import React from 'react'

function EditForm({setEditFormFlag, setChangeGuess, changeGuess, setPlayers, playerGuessData}) {

const handleGuessUpdate = (e, changeGuess) => {
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

    return (
        <div>
            EditForm
            <form onSubmit={(e) => handleGuessUpdate(e, changeGuess)}>
                <input 
                    type="text"
                    name="guess"
                    placeholder="Correct actor's name"
                    value={changeGuess}
                    onChange={(e) => setChangeGuess(e.target.value)}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default EditForm