import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView
} from 'react-native';
import { common } from '../../styles/index';
import { CANMERO_OPERATES } from '../../plugin/enume';
import { asyncSave } from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import ActionSheet from '../../components/widget/ActionSheet';
import Header from '../../components/widget/Header';
import Input from '../../components/widget/input/index';
import Label from '../../components/widget/Label';
import Button from '../../components/widget/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import { register } from '../../services/account.js';

const USER_NAME_REG = /[a-zA-Z_0-9]{6}/;
const PHONE_REG = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
const PASSWORD_REG = /.{6}/;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_url: null,
      user_name: '',
      password: '',
      phone: '',
      loading: false
    };
  }

  validate = () => {
    const { user_name, password, phone } = this.state;
    if (!USER_NAME_REG.test(user_name)) {
      Toast.show('用户名必须是 6 - 12 位字母和数字组合', { position: 0 });
      return false;
    }
    if (!PASSWORD_REG.test(password)) {
      Toast.show('密码至少为 6 位 ', { position: 0 });
      return false;
    }
    if (!PHONE_REG.test(phone)) {
      Toast.show('请输入正确的手机号码', { position: 0 });
      return false;
    }
    return true;
  };

  onRegister = async () => {
    try {
      this.setState({ loading: true });
      const res = await register({
        nickname: 'Free Man',
        gender: 1,
        user_name: this.state.user_name,
        password: this.state.password,
        phone: this.state.phone,
        avatar_url: this.state.avatar_url
      });
      if (res) {
        Toast.show('恭喜你注册成功, 去登录吧', {
          position: 0,
          duration: 1000
        });
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  onSubmit = () => {
    const message = `注意哦，手机号是你找回密码的唯一凭证，请确认手机号：${this
      .state.phone || '未填写'}`;
    if (this.validate()) {
      Alert.alert('提示', message, [
        { text: '去核对', style: 'cancel' },
        { text: '直接提交', onPress: () => this.onRegister() }
      ]);
    }
  };

  handlerPhoto = async response => {
    try {
      this.ActionSheet.setVisible(false);
      if (response.error) {
        Toast.show('图片选择错误', { position: 0 });
        console.log('ImagePicker Error: ', response.error);
        return false;
      }
      this.setState({ avatar_url: `data:image/png;base64,${response.data}` });
    } catch (error) {
      Toast.show('图片上传错误', { position: 0 });
    }
  };

  onActionSheet = item => {
    if (item.value === 'photo_album') {
      return ImagePicker.launchImageLibrary(
        {
          maxWidth: 200,
          maxHeight: 200
        },
        this.handlerPhoto
      );
    }
    return ImagePicker.launchCamera(
      {
        maxWidth: 200,
        maxHeight: 200
      },
      this.handlerPhoto
    );
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
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior='position'
            enabled
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.ActionSheet.setVisible();
              }}
              style={styles.avatar}
            >
              <Image
                style={styles.avatar_img}
                source={
                  this.state.avatar_url
                    ? { uri: this.state.avatar_url }
                    : constance.DEFAULT_HEAD_URL
                }
              />
              <View style={styles.avatar_camero}>
                <Icon name='camerao' style={common.fontColorSize('#fff', 18)} />
              </View>
            </TouchableOpacity>

            {this._renderForm()}
            <Button loading={this.state.loading} onPress={this.onSubmit} />
          </KeyboardAvoidingView>
        </ScrollView>
        <ActionSheet
          list={CANMERO_OPERATES}
          ref={_ref => (this.ActionSheet = _ref)}
          onPress={this.onActionSheet}
        />
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
  avatar_camero: {
    ...common.screenHeight(28),
    ...common.screenWidth(28),
    ...common.bgc('#000'),
    marginTop: common.screenWidth(-28 / 375)['width'],
    marginLeft: common.screenWidth(60 / 375)['width'],
    borderRadius: common.screenWidth(14 / 375)['width'],
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6
  },
  avatar_img: {
    ...common.screenWidth(0.235),
    height: common.screenWidth(0.235)['width'],
    borderRadius: common.screenWidth(0.1175)['width']
  }
});

export default Register;
