import './App.css';
import Player from './Player';
import Guess from './Guess';

function App() {



  return (
    <div className="App">
      {/* <header className="App-header">The Name Game
      </header> */}
        <p>Fancy meeting you here. Would you like to play a game?
        </p>
        <Player />
        <Guess />
    </div>
  );
}

export default App;








// {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
