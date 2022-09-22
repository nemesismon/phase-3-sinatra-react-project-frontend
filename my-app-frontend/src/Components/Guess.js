import {useState} from 'react'
import EditForm from './EditForm'

function Guess({currentPlayer, guesses, setGuesses}) {

    // MOVE THIS TO APP
    const[guess, setGuess] = useState("")
    const[editFormFlag, setEditFormFlag] = useState(false)

    const handleAddGuess = (e) => {
        e.preventDefault();
        setGuesses([...guesses, guess])
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
    }

    const handleDeleteClick = (guess) => {
        fetch(`http://localhost:9292/guesses/${guess.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((dataReceived) => setGuesses(dataReceived))
    }

    const guessList = () => guesses.map((guess) => {
        return (
            <div>
            <p key={guess.id}>{guess.actor} <button type="button" value={guess} onClick={setEditFormFlag(true)}>Edit</button> <button type="button" onClick={() => handleDeleteClick(guess)}>X</button></p>
            {editFormFlag ? <EditForm setEditFormFlag={setEditFormFlag}/> : null}
            </div>
        )
    })

        console.log(guesses)

    return (
        <div>
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
            <p><b>Guesses</b></p>
            {guessList()}
        </div>
    )
}

export default Guess