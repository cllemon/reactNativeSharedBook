import React, { Component } from 'react';
import { InteractionManager, Dimensions } from 'react-native';
import { Image, View } from 'react-native';
import HomeTab from '../home/index';

const { height, width } = Dimensions.get('window');
// const WelComeImage = require('../../assets/images/welcome.jpg');

class WelcomeView extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 组件周期函数 - 挂载
   */
  componentDidMount() {
    const { navigation } = this.props;
    console.log(InteractionManager, '==========');
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigation('HomeTab');
      });
    }, 3000);
  }

  /**
   * 组件周期函数 - 卸载
   */
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*
                <Image
          style={{ flex: 1, width: '100%', height: '100%' }}
          source={WelComeImage}
        />
        */}
      </View>
    );
  }
}

export default WelcomeView;
