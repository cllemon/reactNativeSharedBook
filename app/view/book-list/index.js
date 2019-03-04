import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import Search from '../../components/search';
import Loading from '../../components/loading';
import Icon from 'react-native-vector-icons/Ionicons';
import constance from '../../common/utils/constance';
import { filterTypeList } from '../../common/utils/commonEnume';
import { getBooksList } from '../../common/network/API/category';

class BookListView extends Component {
  /**
   *Creates an instance of BookListView.
   * @param {*} props
   * @param {Bolean} isListLayout 是否列表布局
   * @param {String} currentFilter 当前筛选项
   * @param {Number} page 列表页数
   * @param {Array} cardList 卡片列表
   * @param {Bolean} isFinish 是否已加载完
   * @param {Bolean} isLoading 是否正在加载
   * @memberof BookListView
   */
  constructor(props) {
    super(props);
    this.state = {
      isListLayout: true,
      currentFilter: 'reads',
      page: 1,
      cardList: [],
      isFinish: false,
      isLoading: false
    };
  }

  /**
   * 处理查询数据API
   * @param {Object} params 路由参数
   * @returns {Object} 查询API
   */
  handlerQureyAPI() {
    const { params } = this.props.navigation.state;
    const { page } = this.state;
    return {
      page: page,
      count: constance.value.pageSize,
      category_type: params.id,
      category: params.category
    };
  }

  /**
   * 处理列表数量划分
   * @param {Object} data 请求数据
   * @returns {void}
   */
  handlerListDivision(data) {
    const { cardList, page } = this.state;
    if (cardList.length >= data.total) {
      this.setState({ isFinish: true });
      // return false;
    }
    this.setState({
      cardList: cardList.concat(data.list),
      page: page + 1
    });
  }

  /**
   * 拉取数据 - 图书列表
   * @param {Object} queryParams 处理之后的API
   * @returns {void}
   */
  async pullBookList() {
    try {
      if (this.state.isFinish) {
        return false;
      }
      this.setState({ isLoading: true });
      const queryParams = this.handlerQureyAPI();
      const { data } = await getBooksList(queryParams);
      this.handlerListDivision(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * 钩子 - 将要挂载
   */
  async componentDidMount() {
    this.pullBookList();
  }

  /**
   * 回退
   */
  onGoBack = () => {
    this.props.navigation.goBack();
  };

  /**
   * 响应布局变化
   * TODO：切换布局 根据isListLayout 来写CSS即可
   */
  onLayoutChange = () => {
    this.setState({
      isListLayout: !this.state.isListLayout
    });
  };

  /**
   * 跳转 - 搜索
   */
  onSearch = () => {
    const { navigate } = this.props.navigation;
    navigate('SearchView');
  };

  /**
   * 响应筛选
   */
  onFilter(value) {
    this.setState({
      currentFilter: value
    });
  }

  /**
   * 跳转 - 详情
   */
  jumpeDetail(item) {
    const { navigate } = this.props.navigation;
    navigate('DetailView', item);
  }

  /**
   * 渲染列表卡片
   */
  renderCard = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        style={styles.list_content_card__wrap}
        onPress={this.jumpeDetail.bind(this, item)}
      >
        <View style={styles.list_content_card}>
          <Image
            source={{ uri: item.book_picture_url }}
            style={styles.content_card_image}
          />
          <View style={styles.content_card_introduction}>
            <Text style={styles.card_introduction_title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.card_introduction_text} numberOfLines={1}>
              作者：{item.auther}
            </Text>
            <Text style={styles.card_introduction_price}>￥{item.price}</Text>
            <Text style={styles.card_introduction_text} numberOfLines={1}>
              出版社：{item.press}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /**
   * 渲染空列表
   */
  renderListEmptyComponent = () => {
    const { cardList } = this.state;
    if (cardList.length === 0) {
      return (
        <View style={styles.list_content_empty}>
          <Text style={styles.content_empty_text}>暂无数据！</Text>
        </View>
      );
    }
    return <View />;
  };

  /**
   * 列表尾部渲染
   */
  renderListFooterComponent = () => {
    const { cardList, isFinish } = this.state;
    if (isFinish && cardList.length > 0) {
      return (
        <View style={styles.list_content_footer}>
          <Text style={styles.content_footer_text}>你以为我没有底线吗~</Text>
        </View>
      );
    }
    return <View />;
  };

  onEndReached = () => {
    this.pullBookList();
  };

  render() {
    const { isListLayout, currentFilter, cardList, isLoading } = this.state;
    return (
      <View style={styles.book_list}>
        {isLoading && <Loading />}
        {/* 头 */}
        <View style={styles.book_list_header}>
          <Icon
            name='ios-arrow-back'
            style={styles.list_header_icon}
            onPress={this.onGoBack}
          />
          <Search onPress={this.onSearch} style={styles.list_header_search} />
          <Icon
            name={isListLayout ? 'ios-grid' : 'ios-list'}
            style={styles.list_header_icon__change}
            onPress={this.onLayoutChange}
          />
        </View>
        {/* 筛选 */}
        <View style={styles.book_list_filter}>
          {filterTypeList.map(item => {
            return (
              <TouchableWithoutFeedback
                onPress={this.onFilter.bind(this, item.value)}
                key={item.value}
              >
                <View style={styles.list_filter_item}>
                  <Text
                    style={[
                      styles.filter_item_title,
                      item.value === currentFilter &&
                        styles.list_filter_item__active
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      style={[
                        styles.filter_item_icon,
                        styles[`filter_item_icon__${item.value}`]
                      ]}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        {/* 列表 */}
        <View style={styles.book_list_content}>
          <FlatList
            data={cardList}
            renderItem={this.renderCard}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.renderListEmptyComponent}
            ListFooterComponent={this.renderListFooterComponent}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.01}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  book_list: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // 头部区域
  book_list_header: {
    height: 80,
    width: constance.value.windowWidth,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    position: 'relative'
  },
  list_header_icon: {
    fontSize: 40,
    color: '#646668',
    position: 'absolute',
    bottom: 2,
    left: constance.value.windowWidth * 0.012,
    paddingLeft: 20,
    paddingRight: 10
  },
  list_header_search: {
    width: constance.value.windowWidth * 0.7,
    position: 'absolute',
    bottom: 8,
    left: constance.value.windowWidth * 0.14,
    backgroundColor: '#eef0f3',
    borderRadius: 10
  },
  list_header_icon__change: {
    fontSize: 40,
    color: '#646668',
    position: 'absolute',
    bottom: 4,
    right: 5,
    paddingLeft: 12,
    paddingRight: 12
  },

  // 筛选区域
  book_list_filter: {
    height: 42,
    width: constance.value.windowWidth,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  list_filter_item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  },
  list_filter_item__active: {
    color: 'red'
  },
  filter_item_title: {
    fontSize: 18
  },
  filter_item_icon: {
    marginLeft: 4,
    color: '#646668',
    fontSize: 18
  },
  filter_item_icon__price: {
    transform: [{ rotate: '90deg' }],
    marginLeft: 0
  },

  // 滚动区域
  book_list_content: {
    flex: 1,
    backgroundColor: '#fff'
  },

  // 空列表
  list_content_empty: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  content_empty_text: {
    color: '#001',
    fontSize: 20,
    opacity: 0.8
  },
  // 列表尾部
  list_content_footer: {
    padding: 10
  },
  content_footer_text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9c9c9c'
  },

  list_content_card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: constance.value.windowWidth * 0.88,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    margin: 10,
    marginLeft: constance.value.windowWidth * 0.055,
    // ios 下样式
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1
  },
  content_card_image: {
    width: 120,
    height: 100,
    marginLeft: 20,
    marginTop: 10
  },
  content_card_introduction: {
    padding: 10,
    paddingLeft: 20
  },
  card_introduction_title: {
    fontSize: 20,
    marginBottom: 8,
    width: constance.value.windowWidth * 0.46
  },
  card_introduction_price: {
    fontSize: 20,
    color: 'red',
    marginBottom: 8,
    marginTop: 8
  },
  card_introduction_text: {
    width: constance.value.windowWidth * 0.46,
    fontSize: 13,
    opacity: 0.7
  }
});

export default BookListView;
