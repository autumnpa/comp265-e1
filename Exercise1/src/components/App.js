import React from 'react';
import Game from './Game.js';

class App extends React.Component {
    state = {
      gameId: 1,
    };
resetGame = () => {
  this.setState((prevState) => {
    return { gameId: prevState.gameId + 1 };
  });
};

render() {
  return (
  // Add a gameId to make reseting the game with play again button easier
    <Game key={this.state.gameId} 
      onPlayAgain={this.resetGame}
      randomNumberCount={6} initialSeconds={10} />
  );
}
}

export default App;