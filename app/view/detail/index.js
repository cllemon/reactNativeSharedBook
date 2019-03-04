import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import Article from '../../components/article';
import { articleOperate } from '../../common/utils/commonEnume';
import constance from '../../common/utils/constance';
import Icon from 'react-native-vector-icons/Ionicons';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      focused: false
    };
  }

  /**
   * 钩子 - 将要挂载
   */
  async componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ params: params });
  }

  onPressSwiper = () => {
    console.log('swiper');
  };

  onArticleOperate = item => {
    console.log(item);
  };

  onCollection = () => {
    this.setState({ focused: !this.state.focused });
  };

  render() {
    const { params, focused } = this.state;
    return (
      <View style={styles.detail}>
        <ScrollView>
          <View style={styles.detail_wrap}>
            <View style={styles.detail_wrap_swiper}>
              <Swiper height={260} autoplay>
                <TouchableWithoutFeedback onPress={this.onPressSwiper}>
                  <Image
                    style={styles.wrap_swiper_image}
                    source={{ uri: params.book_picture_url }}
                  />
                </TouchableWithoutFeedback>
              </Swiper>
            </View>
            <View style={styles.detail_wrap_content}>
              <View style={styles.wrap_content_article}>
                <View style={styles.content_article_title}>
                  <Text style={styles.header_title_text} numberOfLines={2}>
                    {params.title}
                  </Text>
                  <TouchableWithoutFeedback onPress={this.onCollection}>
                    <View style={styles.header_title_collection}>
                      <Icon
                        name={`ios-heart${focused ? '' : '-empty'}`}
                        style={[
                          styles.title_collection_icon,
                          focused && styles.title_collection_focused
                        ]}
                      />
                      <Text
                        style={[
                          styles.title_collection_text,
                          focused && styles.title_collection_focused
                        ]}
                      >
                        关注
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.content_article_tips}>
                  <Text style={styles.article_tips_text}>
                    提示信息：主要开发一些对应商品的优惠信息,比如发优惠券，存在一些优惠连接，第三方内容等等
                  </Text>
                </View>
                <View style={styles.content_article_price}>
                  <Text style={styles.article_price_text}>
                    ￥{params.price}
                  </Text>
                </View>
                <View style={styles.content_article_footer}>
                  <Text style={styles.article_footer_text}>运费：免运费</Text>
                  <Text style={styles.article_footer_text}>剩余：2000</Text>
                  <Text style={styles.article_footer_text}>销量：100</Text>
                </View>
              </View>
              <Article onPress={this.onArticleOperate} list={articleOperate} />
              {/** 详情内容 */}
              <View style={styles.wrap_content_list}>
                <Text>内容区域</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.renderFixedBottomOperate()}
      </View>
    );
  }

  renderFixedBottomOperate = () => {
    return (
      <View style={styles.detail_bottom_operate}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.detail_bottom_add}
          onPress={this.onGoShopCart}
        >
          <View style={styles.bottom_add_notice}>
            <Text style={styles.add_notice_text}>99+</Text>
          </View>
          <Icon name='ios-cart' style={styles.bottom_add_icon} />
          <Text style={styles.bottom_add_text}>书柜</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.bottom_operate_item, styles.bottom_operate_cart]}
          onPress={this.onAddShopCart}
        >
          <Text style={styles.operate_item_text}>加入书柜</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.bottom_operate_item, styles.bottom_operate_buy]}
          onPress={this.onBuyNow}
        >
          <Text style={styles.operate_item_text}>立即购买</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onGoShopCart = () => {
    const { navigate } = this.props.navigation;
    navigate('ShoppingCartTab');
  };

  onAddShopCart = () => {
    console.log('加入购物车，绘制一个贝塞尔曲线');
  };

  onBuyNow = () => {
    const { navigate } = this.props.navigation;
    navigate('OrderView');
  };
}

const styles = StyleSheet.create({
  detail: {
    position: 'relative',
    flex: 1
  },
  detail_bottom_operate: {
    width: constance.value.windowWidth,
    height: 56,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  detail_bottom_add: {
    flex: 1,
    position: 'relative'
  },
  bottom_add_notice: {
    width: 30,
    height: 20,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    position: 'absolute',
    top: 2,
    right: 4
  },
  add_notice_text: {
    color: 'red',
    paddingLeft: 2
  },
  bottom_add_icon: {
    fontSize: 26,
    color: '#9c9c99',
    textAlign: 'center',
    paddingTop: 7
  },
  bottom_add_text: {
    color: '#9c9c99',
    textAlign: 'center'
  },
  bottom_operate_item: {
    width: constance.value.windowWidth * 0.4,
    height: 56
  },
  bottom_operate_buy: {
    backgroundColor: '#3492FF'
  },
  bottom_operate_cart: {
    backgroundColor: '#343434'
  },
  operate_item_text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 56
  },

  detail_wrap: {
    flex: 1,
    paddingBottom: 56
  },

  // 详情swipe
  detail_wrap_swiper: {
    width: constance.value.windowWidth,
    height: 260
  },
  wrap_swiper_image: {
    width: constance.value.windowWidth,
    height: 260
  },

  // 详情内容
  detail_wrap_content: {
    flex: 1
  },
  wrap_content_article: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  content_article_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingTop: 6
  },
  header_title_text: {
    fontSize: 22,
    paddingTop: 8,
    width: constance.value.windowWidth * 0.85
  },
  header_title_collection: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 6
  },
  title_collection_icon: {
    fontSize: 30,
    textAlign: 'center',
    color: '#99999a'
  },
  title_collection_text: {
    color: '#9c9c9c'
  },
  title_collection_focused: {
    color: 'red'
  },
  content_article_tips: {
    paddingBottom: 20
  },
  article_tips_text: {
    color: 'red',
    fontSize: 16
  },
  content_article_price: {
    paddingBottom: 14
  },
  article_price_text: {
    fontSize: 28,
    color: 'red'
  },
  content_article_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  article_footer_text: {
    color: '#9c9c9c'
  },

  // 内容区域
  wrap_content_list: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    height: constance.value.windowHeight,
    backgroundColor: '#fff'
  }
});

export default DetailView;
