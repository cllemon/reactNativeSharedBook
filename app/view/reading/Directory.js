import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { common } from '../../styles/index';
import Header from '../../components/widget/Header';

const DirectoryPropsType = {
  list: PropTypes.array,
  setPostion: PropTypes.func,
  location: PropTypes.string
};

const DirectoryDefaultProps = {
  list: [],
  setPostion: () => {},
  location: ''
};

export default class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  onJumper = item => {
    this.props.setPostion(item.href);
    this.setState({ visible: false });
  };

  _renderList = () => {
    return (
      <View style={{ paddingBottom: 10 }}>
        {this.props.list.map((item, index) => {
          return (
            <View key={index} style={styles.wraper}>
              <TouchableOpacity
                onPress={() => this.onJumper(item)}
                style={styles.item}
              >
                <Text
                  style={[
                    styles.item_label,
                    this.props.location === item.href && styles.active
                  ]}
                  numberOfLines={1}
                >
                  {item.label.trim()}
                </Text>
                <Text style={styles.num}>
                  {item.id.replace(/[^0-9]/gi, '')}
                </Text>
              </TouchableOpacity>
              <View style={styles.sub}>
                {Boolean(item.subitems.length) &&
                  item.subitems.map((sub, index) => {
                    return (
                      <TouchableOpacity
                        key={`sub_${index}}`}
                        onPress={() => this.onJumper(sub)}
                        style={styles.sub_item}
                      >
                        <Text
                          style={[
                            styles.sub_label,
                            this.props.location === item.href && styles.active
                          ]}
                          numberOfLines={1}
                        >
                          {sub.label.trim()}
                        </Text>
                        <Text style={styles.num}>
                          {sub.id.replace(/[^0-9]/gi, '')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.visible}
        hardwareAccelerated={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modal}>
          <Header onLeftPress={this.hide} title='目录' />
          <ScrollView>
            {this.props.list.length ? (
              this._renderList()
            ) : (
              <Text>暂无目录</Text>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    ...common.screenHeight(),
    ...common.screenWidth(),
    ...common.bgc()
  },
  wraper: {
    paddingHorizontal: 20
  },
  item: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  item_label: {
    ...common.screenWidth(300 / 375)
  },
  sub: {
    // marginLeft: 150
  },
  sub_label: {
    ...common.screenWidth(240 / 375),
    paddingLeft: 20
  },
  sub_item: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  num: {
    ...common.fontColorSize('#BEC2C8', 12)
  },
  active: {
    color: '#5E94FF',
    fontWeight: '500'
  }
});

PropTypes.Directory = DirectoryPropsType;

Directory.defaultProps = DirectoryDefaultProps;
