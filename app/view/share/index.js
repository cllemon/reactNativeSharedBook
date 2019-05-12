import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';

class Share extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='我的分享' navigation={navigation} />
      </View>
    );
  }
}

export default Share;
