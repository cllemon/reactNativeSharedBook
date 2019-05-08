import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { common } from '../../styles/index';
import Header from '../../components/header/index';
import Recommended from '../../components/recommended/index';
import Classification from '../../components/classification/index';
import SwiperImage from '../../components/widget/SwiperImage';

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
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, ...common.bgc() }}>
        <Header
          navigation={navigation}
          title='书城'
          right={<Icon name='search1' style={common.fontColorSize()} />}
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
