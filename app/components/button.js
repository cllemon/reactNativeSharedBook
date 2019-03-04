import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import constance from '../common/utils/constance';

/**
 * 这里和前端样式嵌套继承表现形式不同
 * TODO: 抽个时间 GitHub 找找相关库的实现方式
 *       这里暂时先用着。
 * 参考：https://github.com/react-native-training/react-native-elements/blob/master/src/buttons/Button.js
 */
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handlerBtnStyles = () => {
    const { size, type } = this.props;
    const style =
      type === 'text'
        ? []
        : [
            styles['eb-btn'],
            styles[`eb-btn-${size || 'mini'}`],
            styles[`eb-btn-${type || 'default'}`]
          ];
    return style;
  };

  handlerTitleStyles = () => {
    const { size, type } = this.props;
    const textColor = type === 'text' ? 'eb-btn-title--text' : 'eb-btn-title';
    const defaultTextColor = !type ? 'eb-btn-title--default' : '';
    return [
      styles[textColor],
      styles[defaultTextColor],
      styles[`eb-btn-text--${size || 'mini'}`]
    ];
  };

  handlerPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={this.handlerBtnStyles()}
        onPress={this.handlerPress}
      >
        <Text style={this.handlerTitleStyles()}>
          {this.props.title || '默认按钮'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  'eb-btn-title': {
    color: '#FFFFFF'
  },
  'eb-btn-title--text': {
    color: '#409eff'
  },
  'eb-btn-title--default': {
    color: '#000'
  },
  'eb-btn-text--mini': {
    fontSize: 11
  },
  'eb-btn-text--small': {
    fontSize: 13
  },
  'eb-btn-text--medium': {
    fontSize: 14
  },
  'eb-btn-text--largest': {
    fontSize: 16
  },

  'eb-btn': {
    borderRadius: 5,
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'eb-btn-largest': {
    width: constance.value.windowWidth * 0.77,
    height: 40
  },
  'eb-btn-medium': {
    width: constance.value.windowWidth * 0.55,
    height: 38
  },
  'eb-btn-small': {
    width: constance.value.windowWidth * 0.35,
    height: 33
  },
  'eb-btn-mini': {
    width: constance.value.windowWidth * 0.15,
    height: 28
  },

  'eb-btn-default': {
    borderWidth: 1,
    borderColor: '#C0C4CB',
    borderStyle: 'solid'
  },
  'eb-btn-primary': {
    backgroundColor: '#409eff'
  },
  'eb-btn-warning': {
    backgroundColor: '#e6a23c'
  },
  'eb-btn-danger': {
    backgroundColor: '#f56c6c'
  }
});
