import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/header/index';
import { common } from '../../styles/index';
import Drag from '../../components/widget/drag';

class Detail extends Component {
  render() {
    const { navigation } = this.props;
    // ref={_ref => (this.dragInstance[index] = _ref)} key={index}
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header
          title='图书详情'
          onLeftPress={() => {
            navigation.navigate('Desk');
          }}
        />
        <View style={common.mVerticalHorizontal(16, 16)}>
          <Drag>
            <Text>DETAIL</Text>
          </Drag>
        </View>
      </View>
    );
  }
}

export default Detail;
