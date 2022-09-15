import {useState} from 'react'

function Guess () {

    const[guesses, setGuesses] = useState([])
    const[guess, setGuess] = useState("")

    function handleSubmit(e) {
        e.preventDefault();

        handleAddGuesses(guess)

        setGuess("")
    }

    function handleAddGuesses(newGuess) {
        setGuesses([...guesses, newGuess])
    }

    const guessList = () => guesses.map((guess) => {
        return (
            <p key={guess}>{guess}</p>
        )
        })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="guess"
                    placeholder="Enter the name of an actor."
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

export default Guess;