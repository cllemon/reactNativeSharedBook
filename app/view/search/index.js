import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Header from '../../components/widget/Header';
import { common, variable } from '../../styles/index';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/widget/input/index';
import { getSearchList } from '../../services/books';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      list: [],
      loading: false
    };
  }

  _onChangeText = keywords => {
    this.setState({ keywords });
    if (keywords) this.getSearchResult({ keywords });
  };

  async getSearchResult(params) {
    try {
      this.setState({ loading: true });
      const list = await getSearchList(params);
      this.setState({ list });
    } catch (error) {
      console.log('获取搜索结果异常', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  _renderInput = () => {
    return (
      <View style={styles.search}>
        <Icon name='search' style={styles.search_icon} />
        <Input
          value={this.state.keywords}
          onChangeText={keywords => this._onChangeText(keywords)}
          placeholder={'请输入书籍名称'}
          autoFocus
          style={{ width: 220 }}
        />
      </View>
    );
  };

  /**
   * 渲染列表卡片
   */
  _renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header
          navigation={navigation}
          onLeftPress={() => {}}
          left={this._renderInput()}
          right={<Text style={common.fontColorSize('#333333', 16)}>取消</Text>}
          onRightPress={() => navigation.goBack()}
        />
        <ScrollView>
          {this.state.list.length ? (
            this.state.list.map((item, index) => {
              return this._renderCard({ item, index });
            })
          ) : (
            <Text style={styles.none_text}>暂无结果</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    ...common.screenWidth(299 / 375),
    ...common.bgc('#F9F9F9'),
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16
  },
  search_icon: {
    ...common.fontColorSize('#D3D3D3', 20),
    marginRight: 10
  },

  none_text: {
    ...common.fontColorSize('#D3D3D3', 20),
    textAlign: 'center',
    marginTop: 12
  },

  /** card */
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
  }
});

export default Search;
