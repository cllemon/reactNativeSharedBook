import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../../components/button';

class RegisterAccount extends Component {
  onPressHandler = val => {
    console.log('你点击的是：', val);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} />
        <Button
          size='mini'
          type='primary'
          onPress={() => this.onPressHandler("size='mini' type='primary'")}
        />
        <Text style={styles.text} />
        <Button
          size='small'
          type='primary'
          onPress={() => this.onPressHandler("size='small' type='primary'")}
        />
        <Text style={styles.text} />
        <Button size='medium' type='warning' />
        <Text style={styles.text} />
        <Button size='largest' type='danger' />
        <Text style={styles.text} />
        <Button />
        <Text style={styles.text} />
        <Button type='text' />
        <Text style={styles.text} />
        <Button type='text' size='largest' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  },
  text: {
    marginBottom: 10
  }
});

export default RegisterAccount;
