import React from 'react';

import PropTypes from 'prop-types';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
      number: PropTypes.number.isRequired,
      isSelected: PropTypes.boolean.isRequired,
    };
    handlePress = () => {
    //   console.log(this.props.number);
    // UI Logic - Once a number is pressed the button should change so it cannot be pressed again - change the state - rerender the view
    // ^ Use the unique identifier (position) - key index for every random number
    // Logic - once pressed the number should be tallied when it is equal to or greater than the target sum
    // Use object or array to add selected number status to a collection
    };
    render() {
      return (
        // Using onpress is equivalent to using onclick event handler
        // ONLY include styles.selected IF boolean property of isSelected is true
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={[styles.random, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({

  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 20,
    marginVertical: 35,
    fontSize: 35,
    textAlign: 'center',
  },

  selected: {
    opacity: 0.3,
  },
});

export default RandomNumber;