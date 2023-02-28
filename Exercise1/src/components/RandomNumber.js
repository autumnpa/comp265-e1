import React from 'react';

import PropTypes from 'prop-types';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
      number: PropTypes.number.isRequired,
    };
    handlePress = () => {
      console.log(this.props.number);
    };
    render() {
      return (
        // Using onpress is equivalent to using onclick event handler
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={styles.random}>{this.props.number}</Text>
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
});

export default RandomNumber;