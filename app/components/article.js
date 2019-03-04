import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const ArticlePropsType = {
  list: PropTypes.object,
  style: PropTypes.object,
  onfillValue: PropTypes.any,
  onPress: PropTypes.any
};

const ArticleDefaultProps = {
  list: [],
  onPress: () => console.log('Please attach a method to this component'),
  onfillValue: () => <Text />
};

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  handlerOperate(item) {
    if (item) {
      this.props.onPress(item);
    }
  }

  render() {
    const { list, style, onfillValue } = this.props;
    return (
      <View style={[styles.content_article_operate, style]}>
        {list.length > 0 &&
          list.map(item => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.article_operate_item}
                onPress={this.handlerOperate.bind(this, item)}
                key={item.value}
              >
                <View style={styles.operate_item_left}>
                  <Text style={styles.operate_item_title}>{item.label}: </Text>
                  {onfillValue()}
                </View>
                <View style={styles.operate_item_left}>
                  <Text style={styles.operate_item_title}>
                    {item.iconLabel}
                  </Text>
                  <Icon
                    name='ios-arrow-forward'
                    style={styles.operate_item_icon}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content_article_operate: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  article_operate_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  operate_item_left: {
    flexDirection: 'row'
  },
  operate_item_title: {
    color: '#9c9c9c',
    fontSize: 18,
    lineHeight: 33,
    paddingLeft: 10,
    paddingRight: 10
  },
  operate_item_value: {
    color: '#000',
    marginLeft: 10
  },
  operate_item_icon: {
    fontSize: 26,
    color: '#9c9c9c',
    paddingRight: 10,
    paddingTop: 3
  }
});

PropTypes.Article = ArticlePropsType;

Article.defaultProps = ArticleDefaultProps;
