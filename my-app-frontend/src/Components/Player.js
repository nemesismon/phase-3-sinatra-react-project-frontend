import {useState} from 'react';

function Player() {
    
    //Initial states required for adding players, creating an array, and rendering it
    const [name, setName] = useState("")
    const [players, setPlayers] = useState([])

    function handleAddPlayer(newPlayer) {
        setPlayers([...players, newPlayer])
        // ***Place POST request here***
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleAddPlayer(name)
        setName("")
    }

    //***Place DELETE request here***
    
    const playerList = () => players.map((player) => {
        return(
            <p key={player}>{player}</p>
    )})

    //Enter ID number to reactivate play?

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

export default Player;