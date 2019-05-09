import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from './mixins';
import Icon from 'react-native-vector-icons/AntDesign';

const FormPropsType = {
  style: PropTypes.object,
  model: PropTypes.object,
  rules: PropTypes.array, // 表单验证规则
  labelPosition: PropTypes.string, // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
  labelSuffix: PropTypes.string, // 表单域标签的后缀
  labelWidth: PropTypes.number, // 表单域标签的的宽度
  hideRequiredAsterisk: PropTypes.boolean // 是否隐藏必填字段的标签旁边的红色星号
};

const FormDefaultProps = {
  style: null,
  model: {},
  rules: {},
  labelPosition: 'right',
  labelSuffix: '',
  labelWidth: 90,
  hideRequiredAsterisk: false
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {}
    };
  }

  componentWillMount() {
    this._setModel(this.props.model);
  }

  _setModel = model => {
    if (_.isPureObject(model)) {
      this.setState({ model });
    } else {
      console.warn(
        '<Form /> binding values (model) only accept object types. Check for incoming parameter types'
      );
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.model !== this.props.model) {
      this._setModel(nextProps.model);
    }
  }

  _setValue = ({ prop, value }) => {
    if (this.state.model) {
      this.state.model[prop] = value;
    }
  };

  _renderFormItem = children =>
    React.Children.map(children, child =>
      React.cloneElement(child, {
        _setValue: this._setValue,
        model: this.state.model,
        rules: this.props.rules,
        form_labelPosition: this.props.labelPosition,
        form_labelWidth: this.props.labelWidth,
        form_labelSuffix: this.props.labelSuffix,
        hideRequiredAsterisk: this.props.hideRequiredAsterisk
      })
    );

  render() {
    return (
      <View style={[styles.form, this.props.style]}>
        {this._renderFormItem(this.props.children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    width: '100%'
  }
});

PropTypes.Form = FormPropsType;

Form.defaultProps = FormDefaultProps;
