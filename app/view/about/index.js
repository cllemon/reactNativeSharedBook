import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';

export default class About extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='关于' navigation={navigation} />
        <View style={styles.about}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.img}
          />
          <Text style={styles.title}>这里的阅读，有束光</Text>
          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  about: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    ...common.screenWidth(106 / 375),
    ...common.screenHeight(106 / 812)
  },
  title: {
    ...common.fontColorSize('#697B84', 16),
    lineHeight: 22,
    marginTop: 13,
    textAlign: 'center',
    letterSpacing: 6
  },
  version: {
    ...common.fontColorSize('#BEC2C8', 12),
    textAlign: 'center',
    marginTop: 16
  }
});
