import React from 'react';

import PropTypes from 'prop-types';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
      id: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
      isDisabled: PropTypes.bool.isRequired,
      onPress: PropTypes.func.isRequired,
    //   Define prop types
    // When component is pressed the new props is called
    };
    handlePress = () => {
    //   console.log(this.props.number);
    // Need logic to prevent a number from being selected more than once
    // If statement
    // Use devtools debug to see what is being logged during each press

      if(this.props.isDisabled) {
        return;
      }
      this.props.onPress(this.props.id);

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
          <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({

  random: {
    backgroundColor: 'white',
    width: 100,
    marginHorizontal: 20,
    marginVertical: 35,
    fontSize: 35,
    color: '#3E54AC',
    textAlign: 'center',
  },

  disabled: {
    opacity: 0.3,
  },
});

export default RandomNumber;