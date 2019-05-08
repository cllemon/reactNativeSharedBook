import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { common } from '../../styles/index';
import TitleBar from '../widget/TitleBar';

const RecommendedPropsType = {
  navigation: PropTypes.object
};

const RecommendedDefaultProps = {
  navigation: null
};

export default class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.getRecommendedList();
  }

  getRecommendedList = () => {
    const list = [
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
        id: 1
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
        id: 2
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
        id: 3
      }
    ];
    this.setState({ list });
  };

  onRecommended = () => {
    // 发请求
    console.log('换一批');
  };

  render() {
    return (
      <View style={styles.recommended}>
        <TitleBar
          title='猜你喜欢'
          label='换一批'
          onPress={this.onRecommended}
        />
        <View style={styles.content}>
          {this.state.list.map(item => {
            return (
              <TouchableOpacity
                style={styles.content_item}
                key={item.id}
                activeOpacity={0.9}
                onPress={() => {
                  this.props.navigation.navigate('Detail', { book: item });
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={styles.content_item_img}
                />
                <Text style={styles.content_item_title}>书籍名称</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recommended: {
    flexDirection: 'column'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 16
  },
  content_item: {
    flexDirection: 'column',
    ...common.shadow()
  },
  content_item_img: {
    height: 140,
    width: 100
  },
  content_item_title: {
    ...common.fontColorSize('#3C3C3C', 14),
    textAlign: 'center',
    marginVertical: 8
  }
});

PropTypes.Recommended = RecommendedPropsType;

Recommended.defaultProps = RecommendedDefaultProps;
