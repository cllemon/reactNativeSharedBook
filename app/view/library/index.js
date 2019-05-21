import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { common } from '../../styles/index';
import Header from '../../components/widget/Header';
import Recommended from '../../components/recommended/index';
import Classification from '../../components/classification/index';
import SwiperImage from '../../components/widget/SwiperImage';
import { SWIPER_LIST } from '../../plugin/enume';

class LibraryView extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, ...common.bgc() }}>
        <Header
          navigation={navigation}
          title='书城'
          right={<Icon name='search1' style={common.fontColorSize()} />}
          onLeftPress={() => {
            navigation.replace('Desk');
          }}
          onRightPress={() => {
            navigation.navigate('Search');
          }}
        />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <SwiperImage list={SWIPER_LIST} />
            <Recommended navigation={navigation} />
            <Classification navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LibraryView;
