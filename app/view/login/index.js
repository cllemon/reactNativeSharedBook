import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { common } from '../../styles/index';

class Login extends Component {
  render() {
    return (
      <View style={common.layout_flex_middle()}>
        <Text
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
        >
          Login
        </Text>
      </View>
    );
  }
}

export default Login;
