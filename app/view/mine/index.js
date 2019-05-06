import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import OperateBar from '../../components/operate-bar/index';
import { common } from '../../styles/index';
class Mine extends Component {
  render() {
    return (
      <View style={styles.container}>
        <OperateBar />
        <Text> mine </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...common.screenWidth(0.64),
    ...common.screenHeight(),
    ...common.iosHeaderMarginTop()
  }
});

export default Mine;
