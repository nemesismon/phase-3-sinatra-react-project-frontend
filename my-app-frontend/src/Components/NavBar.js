import {NavLink} from 'react-router-dom';

function NavBar() {

return (
    <div>
        <br></br>
        <b>
            <NavLink style={{textDecoration: 'none'}} 
                to="/"
                exact>
                    Home &ensp;
            </NavLink>
            <NavLink style={{textDecoration: 'none'}}
                to="/player"
                exact>
                    Players &ensp;
            </NavLink>
            <NavLink style={{textDecoration: 'none'}}
                to="/guess"
                exact>
                    Guesses &ensp;
            </NavLink>
            <NavLink style={{textDecoration: 'none'}}
                to="/guessnumbers"
                exact>
                    GuessNumbers &ensp;
            </NavLink>
        </b>
    </div>
)

}

export default NavBar