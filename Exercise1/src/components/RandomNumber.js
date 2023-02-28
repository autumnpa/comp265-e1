import React from 'react';

import PropTypes from 'prop-types';

import { Text, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
      number: PropTypes.number.isRequired,
    };
    render() {
      return (
        <Text style={styles.random}>{this.props.number}</Text>

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