import {useState} from 'react';

function Player() {

    const [name, setName] = useState("")
    const [players, setPlayers] = useState([])

    function handleAddPlayer(newPlayer) {
        setPlayers([...players, newPlayer])
        // ***Place POST fetch here***
    }


    function handleSubmit(e) {
        e.preventDefault();

        handleAddPlayer(name)

        setName("")
    }

    const playerList = () => players.map((player) => {
        return(
            <p key={player}>{player}</p>
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

export default Player;