import {useState} from 'react';

function Player({ players, setPlayers }) {
    
    const[name, setName] = useState("")

    //Works and sends back primary key from DB
    const handleAddPlayer = (e) => {
        e.preventDefault()
        setPlayers([...players, name])
        fetch("http://localhost:9292/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
            }),
        })
            .then((r) => r.json())
            .then((data) => setPlayers(data))
        setName("")
    }
    
    const playerList = () => players.map((player) => {
        return(
                <p key={player.id}>{player.name}</p>
    )})

    return (
        <div>
            <form onSubmit={handleAddPlayer}>
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

export default Player