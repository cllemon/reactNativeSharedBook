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
  // required: PropTypes.boolean, // 是否必填，如不设置，则会根据校验规则自动生成

  showMessage: PropTypes.boolean, // 是否显示校验错误信息
  statusIcon: PropTypes.boolean // 是否在输入框中显示校验结果反馈图标
};

const FormItemDefaultProps = {
  prop: '',
  label: '',
  labelPosition: '',
  labelSuffix: '',
  labelWidth: 0,
  // required: false,

  showMessage: true,
  statusIcon: false
};

export default class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      border_active: {},
      errors: null
    };
  }

  componentDidMount() {
    console.log(this.props, 'formItem子组件');
  }

  validator = props => {
    if (_.isValidator(props)) {
      const AV = new AsyncValidator(props.rules);
      AV.validate(
        { [props.prop]: props.model[props.prop] },
        (errors, fields) => {
          if (errors) {
            this.setState({
              errors,
              border_active: _.TEXT_INPUT_BASIC_STYLE_ERRORS
            });
            return false;
          }
          this.setState({
            errors: null,
            border_active: _.TEXT_INPUT_BASIC_STYLE_PASS
          });
          return true;
        }
      );
    }
  };

  _mergeProps = children => {
    switch (children.type.displayName) {
      case 'TextInput':
        return _.mergeTextInput(children, this);
      default:
        return {};
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
      labelPosition,
      form_labelPosition,
      labelSuffix,
      form_labelSuffix,
      labelWidth,
      form_labelWidth,
      children,
      hideRequiredAsterisk
    } = this.props;
    return (
      <View style={styles.item}>
        <Text
          style={[
            styles.label,
            {
              textAlign: labelPosition || form_labelPosition,
              width: labelWidth || form_labelWidth
            }
          ]}
        >
          {_.isValidator(this.props) && !hideRequiredAsterisk && (
            <Text style={styles.required_star}>*</Text>
          )}
          {`${label}${labelSuffix || form_labelSuffix}`}
        </Text>
        <View style={styles.label_content}>
          <View style={this.state.border_active}>
            {this._renderChildrenComponent(children)}
          </View>
          {_.isValidator(this.props) && this.state.errors && (
            <Text style={styles.label_error_tips}>
              {this.state.errors[0].message}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 22,
    flexDirection: 'row',
    width: '100%',
    minHeight: 40,
    position: 'relative'
  },
  label: {
    fontSize: 14,
    color: '#606266',
    lineHeight: 40,
    paddingRight: 12,
    textAlignVertical: 'center'
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
    top: '100%'
  },
  required_star: {
    fontSize: 20,
    color: '#f56c6c'
  }
});

PropTypes.FormItem = FormItemPropsType;

FormItem.defaultProps = FormItemDefaultProps;
