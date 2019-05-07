import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';
import Header from '../../components/header/index';
import Swiper from 'react-native-swiper';

const SWIPER_LIST = [
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
    id: 1
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
    id: 2
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
    id: 7
  }
];
class LibraryView extends Component {
  _renderSwiper = () => {
    return (
      <View style={styles.swiper}>
        <Swiper
          autoplay
          height={165}
          dot={<View style={styles.dot} />}
          activeDot={<View style={[styles.dot, common.bgc('#5E94FF')]} />}
        >
          {SWIPER_LIST.map(item => {
            return (
              <Image
                source={{ uri: item.url }}
                key={item.id}
                style={{ ...common.screenWidth(), height: 165 }}
              />
            );
          })}
        </Swiper>
      </View>
    );
  };

  _renderRecommended = () => {
    return (
      <View style={styles.recommended}>
        <View style={styles.title_bar}>
          <Text style={styles.title_bar_h}>猜你喜欢</Text>
          <TouchableOpacity>
            <Text style={styles.title_bar_operate}>换一批</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.book}>
          {SWIPER_LIST.map(item => {
            return (
              <View style={styles.book_item} key={item.id}>
                <Image
                  source={{ uri: item.url }}
                  style={styles.book_item_img}
                />
                <Text style={styles.book_item_title}>书籍名称</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  _renderClassification = () => {
    return (
      <View style={styles.classification}>
        <View style={styles.title_bar}>
          <Text style={styles.title_bar_h}>全部分类</Text>
          <TouchableOpacity>
            <Text style={styles.title_bar_operate}>更多</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.book}>
          {SWIPER_LIST.map(item => {
            return (
              <Image
                source={{ uri: item.url }}
                style={styles.classification_img}
              />
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title='书城'
          right={<Icon name='search1' style={common.fontColorSize()} />}
          onLeftPress={() => {
            navigation.navigate('Desk');
          }}
          onRightPress={() => {
            navigation.navigate('Search');
          }}
        />
        {this._renderSwiper()}
        <ScrollView>
          <View style={styles.scroll}>
            {this._renderRecommended()}
            {this._renderClassification()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  scroll: {
    flex: 1
  },

  /** _renderSwiper **/
  swiper: {
    height: 165
  },
  dot: {
    height: 3,
    width: 12,
    ...common.bgc('#EEEEEE'),
    borderRadius: 2
  },

  /** recommended **/
  recommended: {
    flexDirection: 'column',
    ...common.mVerticalHorizontal(24, 15)
  },
  book: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  book_item: {
    flexDirection: 'column',
    ...common.shadow()
  },
  book_item_img: {
    height: 140,
    width: 100
  },
  book_item_title: {
    ...common.fontColorSize('#3C3C3C', 14),
    textAlign: 'center',
    marginVertical: 8
  },

  /** title */
  title_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12
  },
  title_bar_h: {
    ...common.h(20, '#3C3C3C')
  },
  title_bar_operate: {
    ...common.fontColorSize('#5E94FF', 14)
  },

  /** classification */
  classification: {
    flexDirection: 'column',
    marginHorizontal: 15
  },
  classification_img: {
    height: 106,
    width: 106,
    borderRadius: 4
  }
});

export default LibraryView;
