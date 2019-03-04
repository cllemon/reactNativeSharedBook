import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import { handlerLogin } from '../../store/action/user';

import { thirdParty } from '../../common/utils/commonEnume';
import constance from '../../common/utils/constance';
import Loading from '../../components/loading';
import Button from '../../components/button';

const imageBackground = require('../../assets/images/login-background.jpg');

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWord: '',
      account: '',
      showPassword: false,
      isLoading: false
    };
  }

  /**
   * 响应账户输入
   */
  onChangeAccount = text => {
    if (text.trim()) {
      this.setState({
        account: text
      });
    }
  };

  /**
   * 响应密码输入
   */
  onChangePassword = text => {
    if (text.trim()) {
      this.setState({
        passWord: text
      });
    }
  };

  /**
   * 响应密码可见性
   */
  onShowPssword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  /**
   * 立即注册
   */
  NavigationToChangeRegister = () => {
    const { navigate } = this.props.navigation;
    navigate('RegisterAccount');
  };

  /**
   * 更改密码
   */
  NavigationToChangePassword = () => {
    // TODO...
  };

  /**
   * 第三方登录
   */
  thirdPartyLogin = val => {
    console.log(
      '初始化时，第三方登录，由于dom写法上写了（）, 产生了不必要的执行'
    );
    if (val) {
      console.log(
        '在dom元素中执行该方法，初始化时会执行，为了避免这种写法导致的不必要执行，故在此多加一层判断'
      );
    }
  };

  /**
   * 响应登录
   */
  onLogin = () => {
    const { passWord, account } = this.state;
    if (!account) {
      Toast.show('请输入账号', { position: Toast.positions.CENTER });
      return false;
    } else if (!passWord) {
      Toast.show('请输入密码', { position: Toast.positions.CENTER });
      return false;
    }
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isLoading: true
      });
      this.props.getUserInfo(account, passWord);
    });
  };

  componentWillUpdate(nextProps, nextState) {
    const { userRelated } = nextProps;
    if (userRelated.id) {
      const { navigate } = this.props.navigation;
      navigate('ViewTab'); // 之后再处理这块跳转逻辑
    }
  }

  render() {
    return (
      <ImageBackground source={imageBackground} style={styles.eb_container}>
        <View style={styles.eb_container_wrap}>
          <View style={styles.eb_input_wrap}>
            <Icon name='ios-contact' style={styles.input_icon} />
            <TextInput
              placeholder='请输入账户'
              style={styles.input}
              placeholderTextColor={'#FAFAFA'}
              onChangeText={this.onChangeAccount}
            />
          </View>
          <View style={styles.eb_input_wrap}>
            <Icon name='ios-lock' style={styles.input_icon} />
            <TextInput
              placeholder='请输入密码'
              style={styles.input}
              secureTextEntry={!this.state.showPassword}
              placeholderTextColor={'#FAFAFA'}
              onChangeText={this.onChangePassword}
            />
            <Icon
              name={this.state.showPassword ? 'ios-eye' : 'ios-eye-off'}
              onPress={this.onShowPssword}
              style={styles.input_icon}
            />
          </View>
          <Button
            size='largest'
            type='primary'
            title='登录'
            onPress={this.onLogin}
          />
          {/*
          <TouchableOpacity style={styles.eb_login_Btn} onPress={this.onLogin}>
            <Text style={styles.login_title}>登录</Text>
          </TouchableOpacity>
          */}

          <View style={styles.eb_login_otherOperate}>
            {/*
            <TouchableOpacity
              style={styles.login_otherOperate_btn}
              onPress={this.NavigationToChangePassword}
            >
              <Text style={styles.otherOperate_btn_title}>忘记密码？</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.login_otherOperate_btn}
              onPress={this.NavigationToChangeRegister}
            >
              <Text style={styles.otherOperate_btn_title}>立即注册</Text>
            </TouchableOpacity>
            */}
            <Button
              type='text'
              title='忘记密码？'
              onPress={this.NavigationToChangePassword}
            />
            <Button
              type='text'
              title='立即注册'
              onPress={this.NavigationToChangeRegister}
            />
          </View>
        </View>
        <View style={styles.eb_thirdParty}>
          <View style={styles.thirdParty_header}>
            <View style={styles.thirdParty_header_line} />
            <Text style={styles.thirdParty_header_title}>第三方登录</Text>
            <View style={styles.thirdParty_header_line} />
          </View>
          <View style={styles.thirdParty_content}>
            {thirdParty.map(item => (
              <View style={styles.thirdParty_content_item} key={item.value}>
                <TouchableOpacity
                  onPress={() => this.thirdPartyLogin(item.value)}
                >
                  <Icons name={item.icon} style={styles.input_icon} />
                  <Text style={styles.thirdParty_content_item__title}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        {this.state.isLoading ? <Loading /> : <View />}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  eb_container: {
    flex: 1,
    justifyContent: 'center'
  },
  eb_container_wrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90
  },
  eb_input_wrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: constance.value.windowWidth * 0.77,
    marginBottom: 25
  },
  input_icon: {
    fontSize: 30,
    color: '#FAFAFA',
    marginLeft: 3,
    paddingBottom: 2
  },
  input: {
    color: '#FAFAFA',
    width: constance.value.windowWidth * 0.6,
    marginLeft: 15,
    marginTop: 3,
    height: 30
  },

  eb_login_Btn: {
    width: constance.value.windowWidth * 0.77,
    height: 40,
    backgroundColor: '#409EFF',
    borderRadius: 5,
    opacity: 0.7
  },
  login_title: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40
  },

  eb_login_otherOperate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: constance.value.windowWidth
  },
  login_otherOperate_btn: {
    paddingTop: 10
  },
  otherOperate_btn_title: {
    color: '#FAFAFA',
    fontSize: 14,
    opacity: 0.9
  },

  eb_thirdParty: {
    flexDirection: 'column',
    marginTop: 108,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thirdParty_header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  thirdParty_header_title: {
    color: '#FAFAFA',
    paddingLeft: 15,
    paddingRight: 15,
    height: 20,
    lineHeight: 20,
    fontSize: 15,
    color: '#FAFAFA',
    opacity: 0.6
  },
  thirdParty_header_line: {
    height: 1,
    width: constance.value.windowWidth * 0.23,
    backgroundColor: '#FAFAFA',
    marginTop: 9,
    opacity: 0.6
  },
  thirdParty_content: {
    flexDirection: 'row',
    marginTop: 10
  },
  thirdParty_content_item: {
    margin: 15,
    justifyContent: 'center'
  },
  thirdParty_content_item__title: {
    color: '#FAFAFA',
    marginLeft: 4
  }
});

const mapStateToProps = state => {
  const { userRelated } = state;
  return {
    userRelated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: (user_name, password) => {
      dispatch(handlerLogin({ user_name: user_name, password: password }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
