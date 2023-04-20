import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Button, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  // UI Logic - Once a number is pressed the button should change so it cannot be pressed again - change the state - rerender the view
  // ^ Use the unique identifier (position) - key index for every random number
  // Logic - once pressed the number should be tallied when it is equal to or greater than the target sum
  // Use object or array to add selected number status to a collection

  state = {
    // Everytime a number is pressed it will be pushed to this array
    //   Change name - we arent adding the numbers to array we are adding the selected Ids
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  // Game status instance property
  gameStatus = 'PLAYING';

  randomNumbers = Array.from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()))
  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  // TODO: Shuffle the random numbers after testing is completed
  // Import shuffle from Lodash
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  // Create a function that fires every second
  componentDidMount() {
    this.intervalId = setInterval(() => {
      // Set the state
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      }, () => {
        // Set state is asynchronous - this needs to happen right after the set state operation is formed
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // Function to check if the number is the array is selected
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  //  Arrow function to modify the state
  // Need to update so a number can not be selected more than once
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  // Cache
  // Ask Arlin about this below line - deprecated
  //componentWillUpdate(nextProps, nextState) {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // Compute new game status if needed
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  // Game status - won - playing - lost
  // Status can be computed so doesn't need to be in the state
  calcGameStatus = (nextState) => {
    // console.log('calcGameStatus');
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    //   Shows right in the simulator rather than in the console of dev tools
    //   console.log(sumSelected);
    // console.warn(sumSelected);

    //   If the timer runs out the target sum turns red and the game is lost
    if (nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    //   If statements to determine state of the game
    if (sumSelected < this.target) {
      return 'PLAYING';
    } if (sumSelected === this.target) {
      return 'WON';
    } if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
            //  With every number a property is passed in (boolean) to check if a number is selected or not
            //   Changed naming conventions to clarify logic
            // If number selected is true the button should be disabled until new page is loaded
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
              // Flow data here
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {/* Button needs to reset and reinitialize the state, game status, timers, target number, etc */}
        {/* Add play again button into a conditional to reset only when the game state becomes LOST */}
        {this.gameStatus !== 'PLAYING' && (
          <Button title="Play Again!" onPress={this.props.onPlayAgain} />
        )}
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BFACE2',
    flex: 1,
    paddingTop: 50,
  },

  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
    borderRadius: 6,
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderRadius: 6,
  },

  STATUS_PLAYING: {
    backgroundColor: 'white',
  },

  STATUS_WON: {
    backgroundColor: 'white',
    color: '#54B435',
    fontSize: 80,
  },

  STATUS_LOST: {
    backgroundColor: 'white',
    color: '#FF0032',
    fontSize: 80,
  },

});

export default Game;