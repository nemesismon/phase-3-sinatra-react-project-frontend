import {useState} from 'react'

function Guess () {

    const[guesses, setGuesses] = useState([])

    function handleAddGuesses(newGuess) {
    setGuesses([...guesses, newGuess])
    }

    const guessList = () => guesses.map((guess) => {
        return (
            <p key={guess}>{guess}</p>
        )})

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="player"
                    placeholder="Enter name to play"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p><b>Players</b></p>
            {playerList()}
        </div>
    )
}

export default Guess;