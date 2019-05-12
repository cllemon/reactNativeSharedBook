import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';
import { common } from '../../styles/index';

const ActionSheetPropsType = {
  list: PropTypes.array.required,
  style: PropTypes.object,
  onPress: PropTypes.function
};

const ActionSheetDefaultProps = {
  list: [],
  style: {
    ...common.screenHeight(206 / 812),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

export default class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  setVisible = (visible = true) => {
    if (!this.props.list.length) return;
    this.setState({ visible });
  };

  _renderModal = () => {
    return (
      <View style={[styles.modal, this.props.style]}>
        {this.props.list.map((item, index) => {
          return (
            <Button
              title={item.label}
              key={index}
              onPress={() => {
                this.props.onPress(item);
              }}
              style={item.style || BUTTON}
            />
          );
        })}
        <Button
          title='取消'
          onPress={() => {
            this.setVisible(false);
          }}
          style={CANCEL}
        />
      </View>
    );
  };

  render() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.visible}
        onRequestClose={() => {}}
      >
        <TouchableOpacity
          style={styles.wraper}
          // onPress={() => this.setVisible(false)}
          activeOpacity={0.7}
        />
        {this.props.children || this._renderModal()}
      </Modal>
    );
  }
}

const CANCEL = {
  touch: {
    ...common.bgc('#F7F7F7'),
    borderRadius: 8,
    marginTop: 16
  },
  title: {
    color: '#3C3C3C',
    fontSize: 18
  }
};

const BUTTON = {
  touch: {
    ...common.bgc(),
    ...common.screenWidth(),
    paddingVertical: 4,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 0
  },
  title: {
    color: '#3C3C3C',
    fontSize: 18
  }
};

const styles = StyleSheet.create({
  wraper: {
    position: 'absolute',
    top: 0,
    left: 0,
    ...common.bgc('#000'),
    ...common.screenHeight(),
    ...common.screenWidth(),
    opacity: 0.7
  },
  modal: {
    ...common.bgc(),
    ...common.screenHeight(0.5),
    ...common.screenWidth(),
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1
  }
});

PropTypes.ActionSheet = ActionSheetPropsType;

ActionSheet.defaultProps = ActionSheetDefaultProps;

// {this.state.visible && (
//   <TouchableOpacity
//     style={styles.wraper}
//     // onPress={() => this.setVisible(false)}
//     activeOpacity={0.7}
//   />
// )}
