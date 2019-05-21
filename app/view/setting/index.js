import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';
import Button from '../../components/widget/Button';
import { asyncDelete, asyncRead } from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  async componentDidMount() {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userInfo = JSON.parse(userInfoStr || '{}');
    this.setState({ userInfo });
  }

  loginOut = () => {
    if (!this.state.userInfo.user_id)
      return this.props.navigation.replace('Login');
    asyncDelete(constance.USER_INFO);
    this.props.navigation.replace('Desk');
    Toast.show('退出成功', { position: 0 });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='设置' navigation={navigation} />
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            style={styles.article}
            onPress={() => {
              Toast.show(`很干净，无需清除`, { position: 0 });
            }}
          >
            <Text style={styles.left}>清除缓存</Text>
            <View style={styles.right}>
              <Text style={styles.right_text}>0.00M</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.article}
            onPress={() => {
              this.props.navigation.navigate('About');
            }}
          >
            <Text style={styles.left}>关于我们</Text>
            <View style={styles.right}>
              <Icon name='right' style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        <Button
          title={this.state.userInfo.user_id ? '退出登录' : '去登录'}
          onPress={this.loginOut}
          style={{
            touch: {
              height: 36,
              marginTop: 20
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  article: {
    ...common.screenHeight(52 / 812),
    ...common.screenWidth(360 / 375),
    marginLeft: 15,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  left: {
    ...common.fontColorSize('#333333', 16)
  },
  right: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    ...common.fontColorSize('#C4C8CD', 20),
    marginLeft: 10
  },
  right_text: {
    ...common.fontColorSize('#BEC2C8', 14)
  }
});
