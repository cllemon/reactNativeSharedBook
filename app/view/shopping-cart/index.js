import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ShoppingCartView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>书柜</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  }
});

export default ShoppingCartView;
