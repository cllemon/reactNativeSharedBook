import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const ButtonPropsType = {
  title: PropTypes.string,
  disabled: PropTypes.boolean,
  type: PropTypes.string,
  onPress: PropTypes.function
};

const ButtonDefaultProps = {
  name: '按钮文案',
  disabled: false,
  type: 'primary',
  onPress: () => {}
};

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

PropTypes.Button = ButtonPropsType;

Button.defaultProps = ButtonDefaultProps;
