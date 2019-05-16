import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import Header from '../../components/widget/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';
import { getSubclass, getBookList } from '../../services/books';

const PAGE_COUNT = 10;

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subclassList: [],
      currentIndex: 0,
      currentSubclass: {},
      page: 1,
      list: [],
      isFinish: false,
      loading: false,
      _refreshing: false
    };
  }

  componentDidMount() {
    this.getSubclassList();
    this.initData();
  }

  /**
   * 拉取二级分类标签
   *
   * @memberof List
   */
  async getSubclassList() {
    try {
      const { classification } = this.props.navigation.state.params;
      const categories_id = classification.categories_id;
      const { list } = await getSubclass({ categories_id });
      if (list) {
        list.unshift({
          label: '全部',
          categories_id
        });
        this.setState({ subclassList: list });
      }
    } catch (error) {
      console.log('拉取二级分类异常', error);
    }
  }

  /**
   * 处理查询数据API
   * @param {Object} params 路由参数
   * @returns {Object} 查询API
   */
  initData(params = {}) {
    const { classification } = this.props.navigation.state.params;
    const API = {
      page: this.state.page,
      count: PAGE_COUNT,
      categories_id: classification.categories_id,
      ...params
    };
    this.pullBookList(API);
  }

  /**
   * 拉取数据 - 图书列表
   * @param {Object} queryParams 处理之后的API
   * @returns {void}
   */
  async pullBookList(queryParams) {
    try {
      this.setState({ loading: true });
      if (this.state.isFinish) return false;
      const data = await getBookList(queryParams);
      this.handlerListDivision(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  /**
   * 处理列表数量划分
   * @param {Object} data 请求数据
   * @returns {void}
   */
  handlerListDivision(data) {
    const { list, page } = this.state;
    if (list.length >= data.total_count) {
      this.setState({ isFinish: true });
    }
    this.setState({
      list: list.concat(data.list),
      page: page + 1
    });
  }

  /**
   * 响应二级标题
   */
  onSbuclassOperate = (currentSubclass = {}, currentIndex) => {
    this.setState({ currentSubclass, currentIndex, isFinish: false });
    this._onRefresh();
  };

  /**
   * 下拉刷新
   */
  _onRefresh = async () => {
    await this.setState({ page: 1, list: [] });
    this._onEndReached();
  };

  /**
   * 上拉加载更多
   */
  _onEndReached = str => {
    let params = {};
    if (this.state.currentSubclass.subclass_id) {
      params.subclass_id = this.state.currentSubclass.subclass_id;
    }
    this.initData(params);
    console.log(str);
  };

  /**
   * 渲染二级标签
   * @memberof List
   */
  _renderSubclass = () => {
    const count = this.state.subclassList.length;
    if (count) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={[
              styles.subclass,
              { width: common.screenWidth(count * 70)['width'] }
            ]}
          >
            {this.state.subclassList.map((subclass, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.onSbuclassOperate(subclass, index)}
                  style={[
                    styles.subclass_item,
                    this.state.currentIndex === index &&
                      styles.subclass_item__active
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.subclass_text,
                      this.state.currentIndex === index &&
                        styles.subclass_text__active
                    ]}
                  >
                    {subclass.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    }
    return <View />;
  };

  /**
   * 渲染列表卡片
   */
  _renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          this.props.navigation.navigate('Detail', { book: item });
        }}
      >
        <View style={styles.card_img_wraper}>
          <Image source={{ uri: item.cover }} style={styles.card_img} />
        </View>
        <View style={styles.card_content}>
          <Text style={common.fontColorSize('#333', 16)} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.card_authors} numberOfLines={1}>
            {item.authors}
          </Text>
          <Text style={styles.card_summary} numberOfLines={2}>
            {item.summary}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 渲染空组件
   * @memberof List
   */
  _renderListEmptyComponent = () => {
    const { loading, list } = this.state;
    if (!list.length && !loading) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footer_text}> 暂无数据！</Text>
        </View>
      );
    }
    return null;
  };

  /**
   * 渲染底部组件
   * @memberof List
   */
  _renderListFooterComponent = () => {
    const { list, isFinish } = this.state;
    if (list.length && isFinish) {
      return (
        <View style={styles.footer}>
          <Text style={[styles.footer_text, { fontSize: 14 }]}>
            我没有底线吗~
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const { navigation } = this.props;
    const { label } = navigation.state.params.classification || {
      label: '图书列表'
    };
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header
          title={label}
          navigation={navigation}
          right={<Icon name='search1' style={common.fontColorSize()} />}
          onRightPress={() => {
            navigation.navigate('Search');
          }}
        />
        <View style={styles.list}>
          <FlatList
            onRefresh={this._onRefresh}
            refreshing={this.state._refreshing}
            data={this.state.list}
            keyExtractor={(item, index) => `book_${index}`}
            renderItem={this._renderCard}
            ListEmptyComponent={this._renderListEmptyComponent}
            ListFooterComponent={this._renderListFooterComponent}
            ListHeaderComponent={this._renderSubclass}
            onEndReached={() => this._onEndReached('触底')}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subclass: {
    ...common.screenHeight(104 / 812),
    overflow: 'scroll',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  subclass_item: {
    maxWidth: 130,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#F5F7F9',
    marginHorizontal: 6,
    marginBottom: 12,
    paddingHorizontal: 10
  },
  subclass_text: {
    ...common.fontColorSize('#697B84', 14),
    textAlign: 'center'
  },
  subclass_item__active: {
    ...common.border(1, '#5E94FF')
  },
  subclass_text__active: {
    ...common.fontColorSize('#5E94FF', 14)
  },

  /** 列表  */
  list: {
    flex: 1
  },
  card: {
    padding: 16,
    flexDirection: 'row'
  },
  card_img_wraper: {
    ...common.border(),
    ...common.shadow(2, variable.$ios_box_shadow_book)
  },
  card_img: {
    ...common.screenHeight(112 / 812),
    ...common.screenWidth(80 / 375)
  },
  card_content: {
    marginLeft: 12,
    flexDirection: 'column',
    width: common.screenWidth(246 / 375)['width']
  },
  card_authors: {
    ...common.fontColorSize('#697B84', 14),
    marginTop: 12,
    marginBottom: 12
  },
  card_summary: {
    ...common.fontColorSize('#BEC2C8', 14)
  },

  footer: {
    padding: 10,
    justifyContent: 'center'
  },
  footer_text: {
    ...common.fontColorSize('#697B84', 16),
    textAlign: 'center'
  }
});

export default List;
