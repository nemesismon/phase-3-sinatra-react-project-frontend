import './App.css';
import Player from './Player';
import Guess from './Guess';

function App() {
  //Updated App with creation of function components

  return (
    <div className="App">
        <p>Fancy meeting you here. Would you like to play a game?
        </p>
        <Player />
        <Guess />
    </div>
  );
}

export default App;
