import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';
import Button from '../../components/widget/Button';
import { asyncDelete } from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import Toast from 'react-native-root-toast';

class Setting extends Component {
  loginOut = () => {
    asyncDelete(constance.USER_INFO);
    this.props.navigation.replace('Desk');
    Toast.show('退出成功', { position: 0 });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='设置' navigation={navigation} />
        <Button title='退出登录' onPress={this.loginOut} />
      </View>
    );
  }
}

export default Setting;
