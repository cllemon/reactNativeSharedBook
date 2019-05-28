import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { common } from '../../styles/index';
import TitleBar from '../widget/TitleBar';
import { getBookRecommend } from '../../services/books';
import Toast from 'react-native-root-toast';

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

  getRecommendedList = async () => {
    try {
      const list = await getBookRecommend();
      Toast.show('  更新成功  ', { position: 240 });
      this.setState({ list });
    } catch (error) {
      console.log('获取推荐图书异常', error);
    }
  };

  render() {
    return (
      <View style={styles.recommended}>
        <TitleBar
          title='猜你喜欢'
          label='换一批'
          onPress={this.getRecommendedList}
        />
        <View style={styles.content}>
          {this.state.list.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.content_item}
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  this.props.navigation.navigate('Detail', { book: item });
                }}
              >
                <Image
                  source={{ uri: item.cover }}
                  style={styles.content_item_img}
                />
                <Text style={styles.content_item_title} numberOfLines={1}>
                  {item.title}
                </Text>
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
    paddingHorizontal: 16,
    marginBottom: 16,
    ...common.screenHeight(150 / 812)
  },
  content_item: {
    flexDirection: 'column',
    ...common.shadow(),
    ...common.screenWidth(100 / 375)
  },
  content_item_img: {
    ...common.border(),
    ...common.screenHeight(140 / 812),
    ...common.screenWidth(100 / 375)
  },
  content_item_title: {
    ...common.fontColorSize('#3C3C3C', 14),
    textAlign: 'center',
    marginVertical: 8
  }
});

PropTypes.Recommended = RecommendedPropsType;

Recommended.defaultProps = RecommendedDefaultProps;
