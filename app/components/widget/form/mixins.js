import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const isPureObject = val =>
  Object.prototype.toString.call(val) === '[object Object]';

const formItemTips = () =>
  console.warn(
    `FormItem accepts a single component, not multiple components,  Adjacent JSX elements must be wrapped in an enclosing tag Adjacent JSX elements must be wrapped in an enclosing tag`
  );

const isValidator = props => {
  const { rules, required, prop } = props;
  if (rules[prop] && rules[prop].required) {
    return true;
  }
  return false;
};

/** textInput 特殊处理 **/

const TEXT_INPUT_BASIC_STYLE = {
  width: 200,
  height: 40,
  borderColor: '#dcdfe6',
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: '#fff',
  paddingHorizontal: 15
};

const TEXT_INPUT_BASIC_STYLE_ACTIVE = {
  borderColor: '#409eff',
  borderWidth: 1,
  borderRadius: 4
};

const TEXT_INPUT_BASIC_STYLE_ERRORS = {
  borderColor: '#f56c6c',
  borderWidth: 1,
  borderRadius: 4
};

const TEXT_INPUT_BASIC_STYLE_PASS = {
  borderColor: '#67c23a',
  borderWidth: 1,
  borderRadius: 4
};

const outerMethod = method => {
  method && method();
};

const mergeTextInput = (children, _this) => {
  const { prop, model, _setValue } = _this.props;
  const _props = {};
  _props.defaultValue = model[prop];
  _props.onChangeText = text => {
    outerMethod(children.props.onChangeText);
    _setValue({ prop, value: text });
  };
  _props.onBlur = () => {
    _this.setState({
      border_active: model[prop] ? TEXT_INPUT_BASIC_STYLE_PASS : {}
    });
    _this.validator(_this.props);
    outerMethod(children.props.onBlur);
  };
  _props.onFocus = () => {
    outerMethod(children.props.onBlur);
    if (!Object.keys(_this.state.border_active).length) {
      _this.setState({ border_active: TEXT_INPUT_BASIC_STYLE_ACTIVE });
    }
  };
  if (!children.props.style) {
    _props.style = TEXT_INPUT_BASIC_STYLE;
  }
  if (!children.props.clearButtonMode) {
    _props.clearButtonMode = 'while-editing';
  }
  return _props;
};

export default {
  height,
  width,
  isPureObject,
  isValidator,
  formItemTips,
  mergeTextInput,
  TEXT_INPUT_BASIC_STYLE_ERRORS,
  TEXT_INPUT_BASIC_STYLE_PASS
};
