import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { common } from '../../styles/index';
import constance from '../../plugin/constance';
import Header from '../../components/widget/Header';
import Input from '../../components/widget/input/index';
import Label from '../../components/widget/Label';
import Button from '../../components/widget/Button';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vatar_url: null,
      user_name: '',
      password: '',
      phone: '',
      loading: false
    };
  }

  onSubmit = () => {
    console.log('submit'); // 拉注册信息
    const message = `注意哦，手机号是你找回密码的唯一凭证，请确认手机号：${this
      .state.phone || '未填写'}`;
    Alert.alert('提示', message, [
      { text: '去核对', style: 'cancel' },
      {
        text: '直接提交',
        onPress: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 4000);
        }
      }
    ]);
  };

  _renderForm = () => {
    return (
      <View style={styles.form}>
        <Label title='账号' mode='column'>
          <Input
            value={this.state.user_name}
            placeholder={'请输入账号(6-12位数字和字母组成)'}
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
        <Label title='手机号' mode='column'>
          <Input
            value={this.state.phone}
            placeholder={'请输入正确的手机号码'}
            onChangeText={phone => this.setState({ phone })}
            keyboardType='number-pad'
            maxLength={11}
            style={{ width: 268 }}
            editable={!this.state.loading}
          />
        </Label>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.register}>
        <Header navigation={this.props.navigation} title='注册' />
        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          enabled
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              console.log('查看大图 - actionSheet');
            }}
            style={styles.avatar}
          >
            <Image
              style={styles.avatar_img}
              source={
                this.state.vatar_url
                  ? { uri: this.state.vatar_url }
                  : constance.DEFAULT_HEAD_URL
              }
            />
          </TouchableOpacity>
          {this._renderForm()}
          <Button loading={this.state.loading} onPress={this.onSubmit} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  register: {
    ...common.bgc(),
    flex: 1
  },
  container: {
    paddingBottom: common.screenHeight(40 / 812)['height']
  },
  form: {
    ...common.screenWidth(),
    paddingHorizontal: common.screenWidth(0.043)['width'],
    marginBottom: common.screenHeight(53 / 812)['height']
  },
  avatar: {
    ...common.screenWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: common.screenHeight(44 / 812)['height']
  },
  avatar_img: {
    ...common.screenWidth(0.235),
    height: common.screenWidth(0.235)['width']
  }
});

export default Register;
