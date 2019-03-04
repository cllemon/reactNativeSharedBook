import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import constance from '../../common/utils/constance';
import Search from '../../components/search';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 响应搜索问题
   */
  onSearch = () => {
    const { navigate } = this.props.navigation;
    navigate('SearchView');
  };

  render() {
    return (
      <View style={styles.home_view}>
        <View style={styles.home_view_swiper}>
          <Swiper height={200} autoplay>
            <Image
              style={styles.view_swiper_image}
              source={require('../../assets/images/login-background.jpg')}
            />
            <Image
              style={styles.view_swiper_image}
              source={require('../../assets/images/swiper_first.jpg')}
            />
            <Image
              style={styles.view_swiper_image}
              source={require('../../assets/images/default_head.png')}
            />
          </Swiper>
        </View>
        <View style={styles.home_view_bottom}>
          <Search onPress={this.onSearch} style={styles.view_bottom_search} />
          <View style={styles.view_bottom_content}>
            <Text>首页内容区域</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home_view: {
    flex: 1,
    position: 'relative'
  },
  home_view_swiper: {
    width: constance.value.windowWidth,
    height: 200
  },
  view_swiper_image: {
    width: constance.value.windowWidth,
    height: 200,
    opacity: 0.7
  },
  home_view_bottom: {
    flex: 1,
    position: 'relative'
  },
  view_bottom_search: {
    position: 'absolute',
    top: -10,
    left: constance.value.windowWidth * 0.08,
    zIndex: 999999
  },
  view_bottom_content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeView;
