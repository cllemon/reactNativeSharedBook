import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/widget/Header';
import Input from '../../components/widget/input/index';
import Label from '../../components/widget/Label';
import Button from '../../components/widget/Button';
import HollowLineHeading from '../../components/widget/HollowLineHeading';
import Icon from 'react-native-vector-icons/AntDesign';
import { common } from '../../styles/index';
import { THIRD_AUTH_LOGIN } from '../../plugin/enume';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user_name: '',
      password: ''
    };
  }

  onLogin = () => {
    console.log('login'); // 登录
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000);
  };

  _renderForm = () => {
    return (
      <View style={styles.form}>
        <Label title='账号' mode='column'>
          <Input
            value={this.state.user_name}
            placeholder={'请输入账号'}
            onChangeText={user_name => this.setState({ user_name })}
            style={{ width: 270 }}
            maxLength={12}
            editable={!this.state.loading}
          />
        </Label>
        <Label title='密码' mode='column'>
          <Input
            value={this.state.password}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            style={{ width: 270 }}
            onChangeText={password => this.setState({ password })}
            editable={!this.state.loading}
          />
        </Label>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('ResetPassword')}
        >
          <Text style={styles.forgot_password}>忘记密码</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderThirdLogin = () => {
    return (
      <View style={styles.third}>
        <HollowLineHeading title='第三方登录' />
        <View style={styles.third_content}>
          {THIRD_AUTH_LOGIN.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.third_item}
                onPress={() => alert(item.label)}
              >
                <Icon name={item.value} style={styles.third_item_icon} />
                <Text style={styles.third_item_title}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.login}>
        <Header
          navigation={this.props.navigation}
          title='登录'
          right={<Text style={common.fontColorSize('#409EFF', 16)}>注册</Text>}
          onRightPress={() => {
            navigation.navigate('Register');
          }}
        />
        <View style={styles.title}>
          <Text style={common.fontColorSize('#333333', 24)}>欢迎使用享阅</Text>
        </View>
        {this._renderForm()}
        <Button
          loading={this.state.loading}
          title='登 录'
          onPress={this.onLogin}
        />
        {this._renderThirdLogin()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    ...common.bgc(),
    flex: 1
  },
  title: {
    ...common.screenWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: common.screenHeight(60 / 812)['height'],
    marginBottom: common.screenHeight(45 / 812)['height']
  },
  form: {
    ...common.screenWidth(),
    paddingHorizontal: common.screenWidth(0.043)['width'],
    marginBottom: 60
  },
  forgot_password: {
    textAlign: 'right',
    marginTop: common.screenHeight(12 / 812)['height'],
    ...common.fontColorSize('#5E94FF', 14)
  },
  third: {
    marginTop: common.screenHeight(115 / 812)['height']
  },
  third_content: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  third_item: {
    justifyContent: 'center',
    marginHorizontal: common.screenWidth(80 / 812)['width']
  },
  third_item_icon: {
    ...common.fontColorSize('#999999', 32),
    textAlign: 'center'
  },
  third_item_title: {
    ...common.fontColorSize('#999999', 12),
    marginTop: 8,
    textAlign: 'center'
  }
});

export default Login;
