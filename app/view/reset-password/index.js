import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../../components/widget/Header';
import Input from '../../components/widget/input/index';
import Label from '../../components/widget/Label';
import Button from '../../components/widget/Button';
import { common } from '../../styles/index';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user_name: '',
      phone: '',
      verification: false, // 是否验通过
      password: '',
      secondary_password: ''
    };
  }

  _onPress = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, verification: !this.state.verification });
    }, 2000);
  };

  _renderFormVerify = () => {
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
        <Label title='手机号' mode='column'>
          <Input
            value={this.state.phone}
            placeholder={'请输入手机号'}
            maxLength={12}
            style={{ width: 270 }}
            onChangeText={phone => this.setState({ phone })}
            editable={!this.state.loading}
          />
        </Label>
      </View>
    );
  };

  _renderReset = () => {
    return (
      <View style={styles.form}>
        <Label title='新的密码' mode='row'>
          <Input
            value={this.state.password}
            placeholder={'密码由6-12位数字和字母组成'}
            onChangeText={password => this.setState({ password })}
            style={{ width: 240 }}
            maxLength={12}
            secureTextEntry={true}
            editable={!this.state.loading}
          />
        </Label>
        <Label title='确认密码' mode='row'>
          <Input
            value={this.state.secondary_password}
            placeholder={'再次输入新的密码'}
            maxLength={12}
            secureTextEntry={true}
            style={{ width: 240 }}
            onChangeText={secondary_password =>
              this.setState({ secondary_password })
            }
            editable={!this.state.loading}
          />
        </Label>
      </View>
    );
  };

  render() {
    const { verification, loading } = this.state;
    return (
      <View style={styles.reset_password}>
        <Header navigation={this.props.navigation} />
        <View style={styles.title}>
          <Text style={common.fontColorSize('#333333', 24)}>
            {verification ? '设置密码' : '找回密码'}
          </Text>
        </View>
        {verification ? this._renderReset() : this._renderFormVerify()}
        <Button
          loading={loading}
          title={verification ? '确 认' : '下一步'}
          onPress={this._onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reset_password: {
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
  }
});

export default ResetPassword;
