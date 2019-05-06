import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { common, variable } from '../../styles/index';
import Header from '../../components/header/index';
import Bookcase from '../../components/bookcase/index';
import ChickenSoupCard from '../../components/chicken-soup-card/index';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Desk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    // 发请求
    this.setState({ list: mock });
  }

  _onPress(book) {
    console.log('去图书页', book);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header
          title='书架'
          left={
            <Icon
              name='bars'
              style={common.fontSizeColor(variable.$main_color_primary)}
            />
          }
          right={
            <Text
              style={common.fontSizeColor(variable.$main_color_primary, 16)}
            >
              书城
            </Text>
          }
          onLeftPress={navigation.openDrawer}
          onRightPress={() => {
            navigation.navigate('Library');
          }}
        />
        <View style={common.mVerticalHorizontal(16, 16)}>
          <ChickenSoupCard />
          <Bookcase list={this.state.list} navigation={navigation} />
        </View>
      </View>
    );
  }
}

const mock = [
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
    id: 1
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
    id: 2
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
    id: 33
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
    id: 4
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
    id: 5
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
    id: 6
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
    id: 7
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
    id: 1
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
    id: 2
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
    id: 3
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
    id: 4
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
    id: 5
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
    id: 6
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
    id: 7
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01JY2f8AVms/a0eGexOoz7aaZd.jpg!s',
    id: 1
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
    id: 2
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p01EtppO1cU7/zLB8PHWW0XKZ4h.jpg!s',
    id: 3
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
    id: 4
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01Tg7By8Va2/MlN1Wb3CMg08Rc.jpg!s',
    id: 5
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/s010/p013Qw0FnUqw/aceGRZ8ZgjqorV.jpg!s',
    id: 6
  },
  {
    url:
      'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
    id: 7
  }
];
