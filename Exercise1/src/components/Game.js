import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

class Game extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>42</Text>
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
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
});

export default Game;