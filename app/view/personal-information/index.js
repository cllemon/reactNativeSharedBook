import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';

const GENDER_MAP = { 0: '女', 1: '男' };

export default class PersonalInformation extends Component {
  onEdit = label => {
    Toast.show(`${label}暂未开通编辑功能，请关注更新迭代哦~`, { position: 0 });
  };

  _renderArticle = () => {
    const { userInfo } = this.props.navigation.state.params;
    if (userInfo) {
      return (
        <View>
          <TouchableOpacity
            style={styles.article}
            onPress={() => {
              this.onEdit('头像');
            }}
          >
            <Text style={styles.left}>头像</Text>
            <View style={styles.right}>
              <Image source={{ uri: userInfo.avatar_url }} style={styles.img} />
              <Icon name='right' style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.article}
            onPress={() => {
              this.onEdit('用户名');
            }}
          >
            <Text style={styles.left}>用户名</Text>
            <View style={styles.right}>
              <Text style={styles.right_text}>{userInfo.nickname}</Text>
              <Icon name='right' style={styles.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.article}
            onPress={() => {
              this.onEdit('性别');
            }}
          >
            <Text style={styles.left}>性别</Text>
            <View style={styles.right}>
              <Text style={styles.right_text}>
                {GENDER_MAP[userInfo.gender]}
              </Text>
              <Icon name='right' style={styles.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.article}>
            <Text style={styles.left}>手机号</Text>
            <View style={styles.right}>
              <Text style={styles.right_text}>{userInfo.phone}</Text>
            </View>
          </View>
          <View style={styles.article}>
            <Text style={styles.left}>账号</Text>
            <View style={styles.right}>
              <Text style={styles.right_text}>{userInfo.user_name}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='个人信息' navigation={this.props.navigation} />
        {this._renderArticle()}
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
  img: {
    ...common.screenWidth(36),
    ...common.screenHeight(36),
    borderRadius: 18
  },
  icon: {
    ...common.fontColorSize('#C4C8CD', 20),
    marginLeft: 10
  },
  right_text: {
    ...common.fontColorSize('#BEC2C8', 14)
  }
});
