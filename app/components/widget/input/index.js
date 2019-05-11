import React, { Component } from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const InputPropsType = {
  parcelStyle: PropTypes.object, // 包裹TextInput的View样式
  onChange: PropTypes.function
};

const InputDefaultProps = {
  parcelStyle: {},
  onChange: () =>
    console.log('Please attach a method called onChange to this component')
};

const DEFAULT_INPUT_STYLE = {
  width: 200,
  padding: 0,
  fontSize: 16,
  color: '#333',
  ...Platform.select({
    ios: {
      paddingVertical: 8
    },
    android: {
      textAlignVertical: 'center'
    }
  })
};

const DEFAULT_WRAPER_INPUT_STYLE = multiline => ({
  width: 240,
  height: multiline ? 64 : 32,
  paddingHorizontal: 10
});

export default class Input extends Component {
  onClear = () => {
    if (this.Input) {
      this.Input.clear();
    }
  };

  customProps = props => {
    const configProps = {
      onChange: function(event) {
        const { eventCount, target, text } = event.nativeEvent;
        props.onChange(text, event);
      },
      style: Object.assign({}, DEFAULT_INPUT_STYLE, props.style),
      clearButtonMode: props.clearButtonMode || 'while-editing',
      placeholderTextColor: props.placeholderTextColor || '#DDDDDD'
    };
    return Object.assign({}, props, configProps);
  };

  renderClearIcon = props => {
    const android = Platform.OS === 'android';
    const editingMode = props.clearButtonMode === 'while-editing';
    if (android && editingMode && props.value) {
      return (
        <TouchableOpacity style={styles.clear} onPress={this.onClear}>
          <Text style={styles.clear_text}>x</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const _props = this.customProps(this.props);
    return (
      <View
        style={[
          DEFAULT_WRAPER_INPUT_STYLE(_props.multiline),
          _props.parcelStyle,
          {
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
      >
        <TextInput {..._props} ref={_ref => (this.Input = _ref)} />
        {this.renderClearIcon(_props)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clear: {
    width: 18,
    height: 18,
    borderRadius: 20,
    opacity: 0.8,
    backgroundColor: '#9c9c9c',
    marginLeft: 6
  },
  clear_text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 17,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

PropTypes.Input = InputPropsType;

Input.defaultProps = InputDefaultProps;
