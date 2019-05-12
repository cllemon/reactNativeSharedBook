import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const LabelPropsType = {
  title: PropTypes.string,
  mode: PropTypes.string,
  labelPosition: PropTypes.string, // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
  labelSuffix: PropTypes.string, // 表单域标签的后缀
  labelWidth: PropTypes.number, // 表单域标签的的宽度
  labelHeight: PropTypes.number // 表单域标签的的宽度
};

const LabelDefaultProps = {
  title: '账号',
  mode: 'row', // column
  labelPosition: 'right',
  labelSuffix: ':',
  labelWidth: 100,
  labelHeight: 34
};

export default class Label extends Component {
  LABEL = () => {
    const column = this.props.mode === 'column';
    return {
      width: '100%',
      backgroundColor: '#fff',
      flexDirection: column ? 'column' : 'row',
      // height: column ? 82 : 46,
      paddingVertical: 10,
      borderBottomColor: '#EDEDED',
      borderBottomWidth: 1
    };
  };

  LABEL_TITLE = () => {
    const column = this.props.mode === 'column';
    return {
      width: this.props.labelWidth,
      height: column ? 24 : this.props.labelHeight,
      lineHeight: column ? 24 : 32,
      textAlign: column ? 'left' : this.props.labelPosition,
      textAlignVertical: 'center',
      color: '#333',
      fontSize: column ? 14 : 16,
      paddingRight: column ? 0 : 12
    };
  };

  render() {
    const { labelSuffix, title, children } = this.props;
    return (
      <View style={this.LABEL()}>
        <Text style={this.LABEL_TITLE()}>{`${title}${labelSuffix}`}</Text>
        <View style={{ marginLeft: -10 }}>{children}</View>
      </View>
    );
  }
}

PropTypes.Label = LabelPropsType;

Label.defaultProps = LabelDefaultProps;
