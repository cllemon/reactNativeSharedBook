import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AsyncValidator from 'async-validator';
import _ from './mixins';

const FormItemPropsType = {
  prop: PropTypes.string, // 表单域 model 字段
  label: PropTypes.string, // 标签文本
  labelPosition: PropTypes.string, // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
  labelSuffix: PropTypes.string, // 表单域标签的后缀
  labelWidth: PropTypes.number, // 表单域标签的的宽度
  showMessage: PropTypes.boolean, // 是否显示校验错误信息
  statusIcon: PropTypes.boolean // 是否在输入框中显示校验结果反馈图标
};

const FormItemDefaultProps = {
  prop: '',
  label: '',
  labelPosition: '',
  labelSuffix: '',
  labelWidth: 0,
  showMessage: true,
  statusIcon: false
};

const LABEL_STYLE = props => ({
  fontSize: 16,
  color: '#333333',
  lineHeight: 30,
  paddingRight: 12,
  textAlignVertical: 'center',
  textAlign: props.labelPosition || props.form_labelPosition,
  width: props.labelWidth || props.form_labelWidth
});

export default class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    console.log('渲染几次');
    this.props.consumerFormItemRefs(this);
  }

  validate = props => {
    const { rules, prop, model } = props;
    if (_.isValidator(props)) {
      const descriptor = { [prop]: rules[prop] };
      const data = { [prop]: model[prop] };
      const validator = new AsyncValidator(descriptor);
      validator.validate(data, { firstFields: true }, (errors, fields) => {
        if (errors) {
          return this.setState({
            errors: errors[0]
          });
        }
        return this.setState({
          errors: null
        });
      });
    }
  };

  _mergeProps = children => {
    switch (
      children.type.displayName ||
        (children.type.render && children.type.render.name)
    ) {
      case 'TextInput':
        return _.mergeTextInput(children, this);
      case 'Switch':
        return _.mergeSwitch(children, this);
      case 'Slider':
        return _.mergeSlider(children, this);
      default:
        return {
          /** 其它组件都走这里 - 提供值改变的回调 */
        };
    }
  };

  _renderChildrenComponent = children => {
    if (!_.isPureObject(children)) {
      return _.formItemTips();
    }
    return React.cloneElement(children, this._mergeProps(children));
  };

  render() {
    const {
      label,
      labelSuffix,
      form_labelSuffix,
      children,
      hideRequiredAsterisk,
      form_labelPosition
    } = this.props;
    return (
      <View style={styles.item}>
        <Text style={LABEL_STYLE(this.props)}>
          {_.isValidator(this.props) && !hideRequiredAsterisk && (
            <Text style={styles.required_star}>*</Text>
          )}
          {`${label}${labelSuffix || form_labelSuffix}`}
        </Text>
        <View style={styles.label_content}>
          <View>{this._renderChildrenComponent(children)}</View>
          {_.isValidator(this.props) && this.state.errors && (
            <Text style={styles.label_error_tips}>
              {this.state.errors.message ||
                `${this.state.errors.field} cannot be empty`}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 56,
    alignItems: 'center',
    position: 'relative',
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1
  },
  label_content: {
    flexDirection: 'column',
    position: 'relative'
  },
  label_error_tips: {
    fontSize: 12,
    color: '#f56c6c',
    lineHeight: 1,
    paddingTop: 14,
    position: 'absolute',
    left: 0,
    top: '46%'
  },
  required_star: {
    fontSize: 20,
    color: '#f56c6c'
  }
});

PropTypes.FormItem = FormItemPropsType;

FormItem.defaultProps = FormItemDefaultProps;
