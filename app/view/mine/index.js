import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { common } from '../../styles/index';
import { MINE_OPERATE_BAR } from '../../plugin/enume';
import constance from '../../plugin/constance';
import Icon from 'react-native-vector-icons/AntDesign';
import { asyncRead } from '../../plugin/asyncStorage';
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  async componentDidMount() {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userInfo = JSON.parse(userInfoStr) || {};
    this.setState({ userInfo });
  }

  jumperToView = async () => {
    const { userInfo } = this.state;
    if (userInfo.id) {
      this.props.navigation.navigate('PersonalInformation', { userInfo });
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  jumperToBar = value => {
    this.props.navigation.navigate(value);
  };

  _renderOperateBar = operate => {
    if (operate) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.jumperToBar(operate.value);
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
    return (
      <View style={styles.avatar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.jumperToView();
          }}
        >
          <Image
            source={
              this.state.userInfo.avatar_url
                ? { uri: this.state.userInfo.avatar_url }
                : constance.DEFAULT_HEAD_URL
            }
            style={styles.avatar_img}
          />
        </TouchableOpacity>
        <Text style={styles.nick_name} numberOfLines={1}>
          {this.state.userInfo.nickname || 'Free Man'}
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
