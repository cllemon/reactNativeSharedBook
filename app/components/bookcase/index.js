import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { common, variable } from '../../styles/index';
import { createBatchObject } from '../../plugin/utils';
import Drag from '../widget/drag';

const A_ROW_BOOK_COUNT = 3;

const BookcasePropsType = {
  list: PropTypes.array,
  noneContent: PropTypes.string,
  navigation: PropTypes.object,
  onPress: PropTypes.function,
  onLongPress: PropTypes.function
};

const BookcaseDefaultProps = {
  list: [],
  noneContent: '暂无图书？去书城选一本书，读一读吗？',
  navigation: {},
  onPress: () =>
    console.log('Please attach a method called onPress to this component'),
  onLongPress: () =>
    console.log('Please attach a method called onLongPress to this component')
};

export default class Bookcase extends Component {
  constructor(props) {
    super(props);
    this.dragInstance = [];
    this.state = {
      books: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.list !== this.props.list) {
      this.setState({ books: this.integerList(nextProps.list) });
    }
  }

  integerList(list) {
    const remainder =
      A_ROW_BOOK_COUNT - (list.length % A_ROW_BOOK_COUNT || A_ROW_BOOK_COUNT);
    return list.concat(createBatchObject(remainder));
  }

  _onPress(book, index) {
    this.props.navigation.navigate('Detail', { book });
  }

  _onLongPress(book, index) {
    const _this = this;
    Alert.alert('提示', '确认移除书架？', [
      {
        text: 'OK',
        onPress: () => {
          _this.state.books.splice(index, 1);
          _this.setState({ books: _this.integerList(_this.state.books) });
          console.log(_this.state.books);
        }
      }
    ]);
    /*---
        拖拽有 bug - 暂无法解决
        const Drag = this.dragInstance[index];
        Drag.setPanHandlers();
      ---*/
  }

  _renderBook = (book, index) => {
    return (
      <View style={styles.book} key={`book_${index}_${Math.random()}`}>
        {book.url && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              book && this._onPress(book, index);
            }}
            onLongPress={() => {
              book && this._onLongPress(book, index);
            }}
          >
            <Drag ref={_ref => (this.dragInstance[index] = _ref)} key={index}>
              <View style={styles.img_wraper}>
                <Image style={styles.img} source={{ uri: book.url }} />
              </View>
            </Drag>
          </TouchableOpacity>
        )}
        <View style={[styles.shadow_side, !book.url && { marginTop: 114 }]} />
        <View style={styles.glossy_side} />
      </View>
    );
  };

  _renderNoneBook = () => {
    return <Text>{this.props.noneContent}</Text>;
  };

  render() {
    const { books } = this.state;
    return (
      <View style={styles.scroll}>
        <ScrollView>
          <View style={styles.bookcase}>
            {books.length
              ? books.map((book, index) => {
                  return this._renderBook(book, index);
                })
              : this._renderNoneBook()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    height: common.screenHeight()['height'] - 220,
    overflow: 'hidden'
  },
  bookcase: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24
  },
  book: {
    ...common.screenWidth(0.297),
    marginBottom: 24,
    alignItems: 'center'
  },
  img_wraper: {
    ...common.border(),
    ...common.shadow(2, variable.$ios_box_shadow_book),
    ...common.mVerticalHorizontal(0, 28),
    ...common.margin(0, 28, 0, 28),
    transform: [{ translateY: 2 }]
    // zIndex: variable.$zIndex_normal
  },
  img: {
    ...common.screenWidth(0.21),
    ...common.screenHeight(112)
  },
  shadow_side: {
    ...common.screenWidth(0.297),
    ...common.screenHeight(6),
    ...common.bgc('rgba(245,245,249,1)'),
    transform: [{ skewX: '-45deg' }]
  },
  glossy_side: {
    ...common.screenWidth(0.3),
    ...common.screenHeight(8),
    ...common.bgc('#fff'),
    ...common.shadow(0, variable.$ios_box_shadow_light_1),
    marginLeft: -4
  }
});

PropTypes.Bookcase = BookcasePropsType;

Bookcase.defaultProps = BookcaseDefaultProps;
