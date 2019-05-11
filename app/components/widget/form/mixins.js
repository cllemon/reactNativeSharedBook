import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const isPureObject = val =>
  Object.prototype.toString.call(val) === '[object Object]';

const formItemTips = () =>
  console.warn(
    `FormItem accepts a single component, not multiple components,  Adjacent JSX elements must be wrapped in an enclosing tag Adjacent JSX elements must be wrapped in an enclosing tag`
  );

const isValidator = props => {
  const { rules, prop } = props;
  if (rules[prop] && rules[prop].length && rules[prop][0].required) {
    return true;
  }
  return false;
};

/** textInput 特殊处理 **/

const TEXT_INPUT_BASIC_STYLE = {
  minWidth: 200,
  maxWidth: 260,
  height: 30,
  textAlignVertical: 'center',
  fontSize: 16,
  padding: 0
};

const SLIDER_SWITCH_BASIC_STYLE = {
  minWidth: 200,
  minHeight: 6
};

const outerMethod = method => {
  method && method();
};

const mergeTextInput = (children, _this) => {
  const { prop, model, _setValue } = _this.props;
  const _props = {};
  _props.style = Object.assign({}, TEXT_INPUT_BASIC_STYLE, {
    ...children.props.style
  });
  // 设置默认值
  _props.defaultValue = model[prop];
  // 同步绑定值
  _props.onChangeText = text => {
    outerMethod(children.props.onChangeText);
    _setValue({ prop, value: text });
  };
  // 失焦 触发校验
  _props.onBlur = () => {
    _this.validate(_this.props);
    outerMethod(children.props.onBlur);
  };
  if (!children.props.clearButtonMode) {
    _props.clearButtonMode = 'while-editing';
  }
  return _props;
};

const mergeSlider = (children, _this) => {
  const { prop, model, _setValue } = _this.props;
  const _props = {};
  _props.value = model[prop];
  _props.style = Object.assign({}, SLIDER_SWITCH_BASIC_STYLE, {
    ...children.props.style
  });
  _props.onValueChange = val => {
    _setValue({ prop, value: val });
    _this.validate(_this.props);
    outerMethod(children.props.onValueChange);
  };
  return _props;
};

const mergeSwitch = (children, _this) => {
  const { prop, model, _setValue } = _this.props;
  const _props = {};
  _props.value = model[prop];
  _props.onValueChange = val => {
    _setValue({ prop, value: val });
    _this.validate(_this.props);
    outerMethod(children.props.onValueChange);
    _this.setState({ switchValue: val }); // 这段代码兼容 Switch 的受控特性，这特么垃圾代码, 强制触发组件重新渲染
  };
  return _props;
};

export default {
  height,
  width,
  isPureObject,
  isValidator,
  formItemTips,
  mergeTextInput,
  mergeSlider,
  mergeSwitch
};

/**
 * 这里处理的很难 因为组件间的规范很难定
 */
const map = {
  DatePickerAndroid: '',
  DatePickerIOS: 'onDateChange',
  date: '当前被选中时间',

  Picker: 'onValueChange', // PickerIOS 一样
  selectedValue: '默认选中的值',

  slider: 'onValueChange', // 用户拖动滑块的过程中不断调用此回调
  value: '滑块初始化值',

  Switch: 'onValueChange',
  value: '默认值'
};
