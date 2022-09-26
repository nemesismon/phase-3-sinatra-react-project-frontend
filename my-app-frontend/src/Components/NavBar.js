import React from 'react'
import {NavLink} from 'react-router-dom';

function NavBar() {

return (
    <div>
        <br></br>
        <b>
            <NavLink style={{textDecoration: 'none'}} 
                to="/">
                    Home &ensp;
            </NavLink>
            <NavLink style={{textDecoration: 'none'}}
                to="/players">
                    Players &ensp;
            </NavLink>
            <NavLink style={{textDecoration: 'none'}}
                to="/guesses">
                    Guesses &ensp;
            </NavLink>
        </b>
    </div>
)

}

export default NavBar