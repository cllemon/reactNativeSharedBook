import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/header/index';
import { common } from '../../styles/index';

class Detail extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header
          title='图书详情'
          onLeftPress={() => {
            navigation.navigate('Desk');
          }}
        />
        <View style={common.mVerticalHorizontal(16, 16)}>
          <Text>DETAIL</Text>
        </View>
      </View>
    );
  }
}

export default Detail;
