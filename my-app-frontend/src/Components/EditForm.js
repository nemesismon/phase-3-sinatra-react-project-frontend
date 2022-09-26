import React from 'react'

function EditForm({setEditFormFlag, setChangeGuess, changeGuess, setGuesses, guessData}) {

//Create input form to handle PATCH and return updated list to state from server
const handleGuessUpdate = (e, changeGuess) => {
    e.preventDefault()
    console.log(guessData)
    fetch(`http://localhost:9292/guesses/${guessData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            actor: changeGuess,
        }),
    })
        .then((r) => r.json())
        .then((dataReceived) => setGuesses(dataReceived))
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