import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { getCategoryList } from '../../common/network/API/category';
import Loading from '../../components/loading';
import constance from '../../common/utils/constance';

class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      categoryList: [],
      contentList: [],
      currentIndex: 0
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true
      });
      const { data } = await getCategoryList();
      this.setState({
        categoryList: data,
        contentList: data[this.state.currentIndex].list
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * 响应类的变化
   * @param {Object} item 类中一项
   * @param {Number} index 类序号
   * @returns {void}
   */
  onCategoryChange(item, index) {
    if (item) {
      this.setState({
        currentIndex: index,
        contentList: item.list
      });
    }
  }

  /**
   * 响应类下内容子项的点击
   * @param {Object} item 类下内容中一项
   * @param {Number} index 类下内容序号
   * @returns {void}
   */
  onContentClick(item) {
    const { navigate } = this.props.navigation;
    const { categoryList, currentIndex } = this.state;
    navigate('BookList', {
      id: item.value,
      category: categoryList[currentIndex].value
    });
  }

  render() {
    const { categoryList, contentList, currentIndex } = this.state;
    return (
      <View style={styles.container}>
        {this.state.isLoading && <Loading />}
        <View style={styles.wraper_header}>
          <Text style={styles.header_title}>分类</Text>
        </View>
        <View style={styles.wraper_main}>
          <ScrollView style={styles.left_list}>
            {categoryList.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  onPress={this.onCategoryChange.bind(this, item, index)}
                  style={styles.category_item}
                  key={item.value}
                >
                  <View
                    style={[
                      styles.category_item_content,
                      currentIndex === index &&
                        styles.category_item_content__active
                    ]}
                  >
                    <Text
                      style={[
                        styles.category_item_content__text,
                        currentIndex === index && styles.active_color
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
          <ScrollView style={styles.right_list}>
            <View style={styles.right_list_content}>
              {contentList.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={this.onContentClick.bind(this, item)}
                    key={index}
                  >
                    <View style={styles.content_item}>
                      <Image
                        style={styles.content_item_image}
                        source={{ uri: item.cover_url }}
                      />
                      <View style={styles.content_item_title}>
                        <Text style={styles.content_item_title__h1}>
                          {item.type}
                        </Text>
                        <Text style={styles.content_item_title__h4}>
                          共{item.num}册
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wraper_header: {
    height: 100,
    width: constance.value.windowWidth
  },
  header_title: {
    fontSize: 40,
    marginLeft: 14,
    marginTop: 36
  },
  wraper_main: {
    flex: 1,
    flexDirection: 'row'
  },

  // 左边样式
  left_list: {
    width: 100,
    height: constance.value.windowHeight,
    backgroundColor: '#eee'
  },
  category_item: {
    height: 50,
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  category_item_content: {
    fontSize: 15,
    paddingTop: 18,
    paddingBottom: 18
  },
  category_item_content__text: {
    textAlign: 'center'
  },
  category_item_content__active: {
    borderLeftColor: '#3492FF',
    borderLeftWidth: 4,
    backgroundColor: '#fff'
  },
  active_color: {
    color: '#3492FF'
  },

  // 右边样式
  right_list: {
    width: constance.value.windowWidth - 100,
    height: constance.value.windowHeight - 150
  },
  right_list_content: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 15
  },
  content_item: {
    width: 140,
    flexDirection: 'row',
    paddingBottom: 20
  },
  content_item_image: {
    width: 60,
    height: 60,
    borderRadius: 5
  },
  content_item_title: {
    paddingLeft: 6,
    marginTop: 12
  },
  content_item_title__h1: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  content_item_title__h4: {
    color: '#9d9d9d'
  }
});

export default CategoryView;
