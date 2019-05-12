import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';

class PersonalInformation extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='个人信息' navigation={navigation} />
      </View>
    );
  }
}

export default PersonalInformation;
