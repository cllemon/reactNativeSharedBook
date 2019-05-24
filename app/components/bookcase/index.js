import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  RefreshControl
} from 'react-native';
import { common, variable } from '../../styles/index';
import { createBatchObject } from '../../plugin/utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { asyncRead } from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import { getBookcaseList, removeBookcase } from '../../services/bookcase';
import Toast from 'react-native-root-toast';

const A_ROW_BOOK_COUNT = 3;

export default class Bookcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      edit: false,
      books: []
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  /**
   * 获取图书列表
   */
  getBooks = async () => {
    try {
      const userInfoStr = await asyncRead(constance.USER_INFO);
      const userInfo = JSON.parse(userInfoStr || '{}');
      if (!userInfo.user_id) return false;
      this.setState({ loading: true });
      const { list } = await getBookcaseList({ user_id: userInfo.user_id });
      this.setState({ books: this.integerList(list) });
    } catch (error) {
      console.log('拉取书柜藏书列表异常', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  /**
   * 拼接数组
   */
  integerList(list) {
    const remainder =
      A_ROW_BOOK_COUNT - (list.length % A_ROW_BOOK_COUNT || A_ROW_BOOK_COUNT);
    return list.concat(createBatchObject(remainder));
  }

  _onRefresh = () => {
    this.getBooks();
  };

  /**
   * 响应点按查看图书
   *
   * @param {*} book
   * @memberof Bookcase
   */
  _onPress(book) {
    // 直接去阅读
    if (book && !this.state.edit) {
      // this.props.navigation.navigate('Detail', { book });
    }
  }

  /**
   * 响应长按 删除
   * tips:
   *      拖拽有 bug - 暂无法解决
   *      const Drag = this.dragInstance[index];
   *      Drag.setPanHandlers();
   */
  _onLongPress = () => {
    this.setState({ edit: true });
    setTimeout(() => {
      this.setState({ edit: false });
    }, 10000);
  };

  /**
   * 移除书架
   */
  _onDelete = async (book, index) => {
    try {
      const { book_id, user_id } = book;
      const result = await removeBookcase({ book_id, user_id });
      if (result) {
        Toast.show('移除成功', { position: 0 });
        this.getBooks();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ edit: false });
    }
  };

  /**
   * 渲染每一本书
   */
  _renderBook = (book, index) => {
    return (
      <View style={styles.book} key={`book_${index}_${Math.random()}`}>
        {book.book_id && (
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={this._onLongPress}
            onPress={() => {
              this._onPress(book);
            }}
          >
            <View style={styles.img_wraper}>
              <ImageBackground style={styles.img} source={{ uri: book.cover }}>
                {this.state.edit && (
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      this._onDelete(book, index);
                    }}
                  >
                    <Icon name='closecircle' style={common.fontColorSize()} />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
        <View style={[styles.shadow_side, !book.cover && { marginTop: 114 }]} />
        <View style={styles.glossy_side} />
      </View>
    );
  };

  /**
   * 渲染滚动区域内容
   */
  _scrollContent = books => {
    if (books && books.length) {
      // 这里每次进来时需要下拉刷新
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.bookcase}>
            {books.map((book, index) => {
              return this._renderBook(book, index);
            })}
          </View>
        </ScrollView>
      );
    }
    return null;
  };

  /**
   * 渲染”无内容“显示
   */
  _renderNoneBook = books => {
    if (!books.length) {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'column', alignItems: 'center' }}
          onPress={() => {
            this.props.navigation.navigate('Library');
          }}
          activeOpacity={0.8}
        >
          {/**
            <Text onPress={this._onAdd}>
              <Icon name='plus' style={common.fontColorSize('#eee', 100)} />
            </Text>
          */}
          <Text style={common.fontColorSize('#999', 15)}>
            你的书架暂无书籍，去书城逛逛吧！
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const { books } = this.state;
    return (
      <View style={styles.scroll}>
        {this._scrollContent(books)}
        {this._renderNoneBook(books)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    height: common.screenHeight()['height'] - 220,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
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
    transform: [{ translateY: 2 }],
    position: 'relative'
  },
  img: {
    ...common.screenWidth(0.21),
    ...common.screenHeight(112)
  },
  shadow_side: {
    ...common.screenWidth(0.3),
    ...common.screenHeight(6),
    ...common.bgc('rgba(245,245,249,1)'),
    transform: [{ skewX: '-45deg' }]
  },
  glossy_side: {
    ...common.screenWidth(0.3),
    ...common.screenHeight(8),
    ...common.bgc('#fff'),
    ...common.shadow(0, variable.$ios_box_shadow_light_1),
    ...Platform.select({
      android: {
        ...common.border()
      }
    }),
    paddingLeft: -4
  },
  delete: {
    position: 'absolute',
    top: -8,
    left: -12,
    opacity: 0.7
  }
});

const mock = [
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
    id: 2
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
    id: 33
  }
];
