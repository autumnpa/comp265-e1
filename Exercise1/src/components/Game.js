import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component {
    static propTypes = {
      randomNumberCount: PropTypes.number.isRequired,
    }
    // UI Logic - Once a number is pressed the button should change so it cannot be pressed again - change the state - rerender the view
    // ^ Use the unique identifier (position) - key index for every random number
    // Logic - once pressed the number should be tallied when it is equal to or greater than the target sum
    // Use object or array to add selected number status to a collection

    state = {
      // Everytime a number is pressed it will be pushed to this array
      selectedNumbers: [0, 4],
    };
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
      .map(() => 1 + Math.floor(10 * Math.random()))
      target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2)
        .reduce((acc,curr) => acc + curr, 0);
        // TODO: Shuffle the random numbers after testing is completed
     
      // Function to check if the number is the array is selected
     isNumberSelected = (numberIndex) => {
       return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
     }

     render() {
       return (
         <View style={styles.container}>
           <Text style={styles.target}>{this.target}</Text>
           <View style={styles.randomContainer}>
             {this.randomNumbers.map((randomNumber, index) => (
             //  With every number a property is passed in (boolean) to check if a number is selected or not
               <RandomNumber 
                 key={index} 
                 number={randomNumber} 
                 isSelected={this.isNumberSelected(index)}
               />
             ))}
           </View>
         </View>
       );
     }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 50,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

});

export default Game;