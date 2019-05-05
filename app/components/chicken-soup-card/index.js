import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';
import constance from '../../plugin/constance';

const ChickenSoupCardPropsType = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.function
};

const ChickenSoupCardDefaultProps = {
  date: constance.YMD(),
  title: '今日导读',
  content: '你不知道，难做的事和应该做的事，往往不是一件事。',
  author: '《天气预报员》',
  style: {},
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

export default class ChickenSoupCard extends Component {
  render() {
    const { date, title, content, author, onPress, style } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.chicken_soup, style]}
      >
        <Text style={styles.date}>{date.replace(/-/g, '.')}</Text>
        <View style={styles.title_content}>
          <Icon name='pushpino' style={styles.quotes} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
        <Text style={styles.author}>———— {author}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chicken_soup: {
    ...common.screenWidth(0.9146),
    ...common.screenHeight(140),
    ...common.bgc(variable.$background_color_milky_white),
    ...common.shadow(2, variable.$ios_box_shadow_light_1),
    flexDirection: 'column',
    position: 'relative'
  },
  date: {
    ...common.fontSizeColor(
      variable.$font_color_medium_black,
      variable.$font_size_large
    ),
    fontFamily: 'Futura-MediumItalic',
    fontStyle: 'italic',
    position: 'absolute',
    top: -12,
    left: 12
  },
  title_content: {
    ...common.margin(16, 16, 6, 12),
    ...common.layout_flex('space-between')
  },
  quotes: {
    ...common.fontSizeColor('#BFCEDD', 20),
    marginTop: 3
  },
  title: {
    ...common.fontSizeColor('#697B84', 12)
  },
  content: {
    ...common.fontSizeColor(
      variable.$font_color_medium_black,
      variable.$font_size_large
    ),
    fontFamily: 'PingFangSC-Regular',
    ...common.padding(0, 29, 12, 26)
  },
  author: {
    ...common.fontSizeColor('#C8D0D8', 12),
    ...common.margin(0, 10, 16),
    textAlign: 'right'
  }
});

PropTypes.ChickenSoupCard = ChickenSoupCardPropsType;

ChickenSoupCard.defaultProps = ChickenSoupCardDefaultProps;
