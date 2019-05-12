import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { common } from '../../styles/index';
import { MINE_OPERATE_BAR } from '../../plugin/enume';
import constance from '../../plugin/constance';
import Icon from 'react-native-vector-icons/AntDesign';
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  jumperToView = value => {
    this.props.navigation.navigate(value);
  };

  _renderOperateBar = operate => {
    if (operate) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.jumperToView(operate.value);
          }}
          key={operate.value}
          style={styles.operate_item}
        >
          <Icon
            name={operate.iconName}
            style={common.fontColorSize(operate.iconColor)}
          />
          <Text style={styles.operate_title}>{operate.label}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  _renderAvatar = () => {
    const isLogin = false;
    return (
      <View style={styles.avatar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.jumperToView(isLogin ? 'PersonalInformation' : 'Login');
          }}
        >
          <Image
            source={
              this.state.userInfo.avatar
                ? { uri: this.state.userInfo.avatar }
                : constance.DEFAULT_HEAD_URL
            }
            style={styles.avatar_img}
          />
        </TouchableOpacity>
        <Text style={styles.nick_name} numberOfLines={1}>
          {this.state.userInfo.name || 'Free Man'}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderAvatar()}
        <View style={styles.operate}>
          {MINE_OPERATE_BAR.map(operate => {
            return this._renderOperateBar(operate);
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...common.screenWidth(0.64),
    ...common.screenHeight(),
    ...common.iosHeaderMarginTop()
  },

  /** _renderAvatar **/
  avatar: {
    flexDirection: 'column',
    margin: 24
  },
  avatar_img: {
    ...common.screenWidth(0.171),
    height: common.screenWidth(0.171)['width'],
    borderRadius: common.screenWidth(0.0855)['width']
  },
  nick_name: {
    ...common.screenWidth(0.27),
    ...common.fontColorSize('#2C2C2C', 20),
    marginTop: 8,
    textAlign: 'left'
  },

  /** _renderOperateBar **/
  operate: {
    flexDirection: 'column'
  },
  operate_item: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  operate_title: {
    ...common.fontColorSize('#3C3C3C', 16),
    marginLeft: 9
  }
});

export default Mine;
