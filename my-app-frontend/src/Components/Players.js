import React from 'react'
import {useState} from 'react';

function Players({ players, setPlayers }) {
    
    const[name, setName] = useState("")


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
    
    const playersList = players.map((player) => {
        return(
                <p key={player.id}>{player.id}. {player.name}</p>
    )})

    return (
        <div>
            <h3>Players</h3>
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
            {playersList}
        </div>
    )
}

export default Players