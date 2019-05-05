import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
import { common, variable } from '../../styles/index';
import Drag from '../widget/drag';

const A_ROW_BOOK_COUNT = 3;

const BookcasePropsType = {
  list: PropTypes.array,
  noneContent: PropTypes.string,
  onLongPress: PropTypes.function
};

const BookcaseDefaultProps = {
  list: [
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
      id: 1
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
      id: 2
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
      id: 33
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
      id: 4
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
      id: 5
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
      id: 6
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
      id: 7
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
      id: 1
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
      id: 2
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
      id: 3
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
      id: 4
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
      id: 5
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
      id: 6
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
      id: 7
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
      id: 1
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
      id: 2
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
      id: 3
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
      id: 4
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
      id: 5
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
      id: 6
    },
    {
      url:
        'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
      id: 7
    }
  ],
  noneContent: '暂无图书？去书城选一本书，读一读吗？',
  onLongPress: () =>
    console.log('Please attach a method called onLongPress to this component')
};

export default class Bookcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.integerList();
  }

  integerList() {
    const { list } = this.props;
    const remainder = list.length % A_ROW_BOOK_COUNT;
    const count = remainder === 0 ? remainder : A_ROW_BOOK_COUNT - remainder;
    const books = list.concat(this.createBatchObject(count));
    this.setState({ books });
  }

  createBatchObject(count = 0) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({});
    }
    return list;
  }

  _renderBook = book => {
    return (
      <View style={styles.book} key={`book_${book.id}_${Math.random()}`}>
        {book.url && (
          <Drag title={book.id}>
            <TouchableOpacity
              style={styles.img_wraper}
              activeOpacity={0.8}
              onLongPress={() => {
                book && this.props.onLongPress(book);
              }}
            >
              <Image style={styles.img} source={{ uri: book.url }} />
            </TouchableOpacity>
          </Drag>
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
        <ScrollView scrollEnabled={false}>
          <View style={styles.bookcase}>
            {books.length
              ? books.map(book => {
                  return this._renderBook(book);
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
    // paddingBottom: 10,
  },
  book: {
    ...common.screenWidth(0.297),
    marginBottom: 24,
    alignItems: 'center'
  },
  img_wraper: {
    ...common.mVerticalHorizontal(0, 28),
    ...common.margin(0, 28, 0, 28),
    ...common.border(),
    ...common.shadow(2, variable.$ios_box_shadow_book),
    transform: [{ translateY: 2 }],
    zIndex: variable.$zIndex_normal
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
