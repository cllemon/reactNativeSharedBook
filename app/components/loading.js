import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import constance from '../common/utils/constance';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator color={color || 'white'} />
          <Text style={styles.title}>{title || '加载中...'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: '#fff',
    // opacity: 0.1,
    zIndex: 10000,
    height: constance.value.windowHeight,
    width: constance.value.windowWidth,
    flex: 1
  },

  loading: {
    backgroundColor: '#000',
    zIndex: 10001,
    opacity: 1,
    height: 80,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (constance.value.windowHeight - 80) / 2,
    left: (constance.value.windowWidth - 100) / 2
  },

  title: {
    marginTop: 10,
    fontSize: 14,
    color: 'white'
  }
});
