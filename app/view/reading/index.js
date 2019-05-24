import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { common, variable } from '../../styles/index';
import Header from '../../components/widget/Header';
import Button from '../../components/widget/Button';
import OperateContainer from './OperateContainer';
import Icon from 'react-native-vector-icons/AntDesign';
import { Epub, Streamer } from 'epubjs-rn';
import { themes } from '../../plugin/utils';
import { backgroundColorMap } from '../../plugin/enume';
import Directory from './Directory';
import Toast from 'react-native-root-toast';

class Reading extends Component {
  constructor(props) {
    super(props);
    this.streamer = new Streamer();
    this.state = {
      detailInfo: {},
      epub: '', // epub 资源
      backgroundColor: '#FFFFFF', // 阅读背景
      location: 0, // 阅读进度（上次阅读的位置）
      origin: '', // Streamer生成的本地源地址（在 epub 组件内用来做性能优化）
      src: '', // epub 渲染资源
      flow: 'paginated', // [ paginated || scrolled-continuous ] 阅读模式
      toc: [], // 目录
      disabled: true, // 是否禁用滑动
      total: 0, // 总页数
      showBars: false, // 是否显示操作面板
      visibleLocation: {}, // 页面位置改变, 所变动的信息
      modalVisible: false
    };
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  async componentWillMount() {
    try {
      const { detailInfo } = this.props.navigation.state.params;
      const origin = await this.streamer.start();
      const src = await this.streamer.get(detailInfo.epub);
      this.setState({
        origin,
        src,
        detailInfo,
        epub: detailInfo.epub
      });
    } catch (error) {
      this.props.navigation.goBack();
      Toast.show('文件解析异常，请重试', { position: 0 });
      console.log('文件静态服务异常', error);
    }
  }

  _renderReadEpub = () => {
    try {
      const { backgroundColor, location, origin, src, flow, epub } = this.state;
      return (
        <Epub
          ref={_ref => (this.EPUB = _ref)}
          style={styles.reader}
          theme='tan'
          themes={themes(backgroundColor)}
          location={location}
          origin={origin}
          src={src}
          flow={flow}
          onReady={book => {
            this.setState({
              toc: book.navigation.toc
            });
            console.log('epub --- onReady:', book);
          }}
          onLocationsReady={locations => {
            this.setState({
              disabled: false,
              total: locations.total
            });
            console.log('epub --- onLocationsReady:', locations);
          }}
          onPress={() => this.setState({ showBars: !this.state.showBars })}
          onLocationChange={visibleLocation =>
            this.setState({ visibleLocation })
          }
          onError={value => console.log(value, '解析错误')}
        />
      );
    } catch (error) {
      console.log(error, '渲染图书异常');
    }
  };

  _renderReadContainer = () => {
    return (
      <View style={[common.flex(), common.bgc()]}>
        {this._renderReadEpub()}
        <View style={[styles.bar, { top: 0 }]}>
          <OperateContainer visible={this.state.showBars}>
            <Header
              navigation={this.props.navigation}
              title={this.state.detailInfo.title}
              right={<Icon name='profile' style={common.fontColorSize()} />}
              style={common.ios && styles.header}
              onRightPress={() => {
                this.state.showBars && this.Directory.show();
              }}
            />
          </OperateContainer>
        </View>
        <View style={[styles.bar, { bottom: 0 }]}>
          <OperateContainer visible={this.state.showBars}>
            {this._renderBottom()}
          </OperateContainer>
        </View>
        <Directory
          ref={_ref => (this.Directory = _ref)}
          list={this.state.toc}
          location={this.state.location}
          setPostion={location => this.setState({ location })}
        />
      </View>
    );
  };

  _renderBottom = () => {
    const { backgroundColor, flow } = this.state;
    const paginated = flow === 'paginated';
    return (
      <View style={styles.bottom}>
        <View style={styles.bottom_mode}>
          <Text
            style={[
              styles.bottom_mode_text,
              paginated && styles.bottom_mode_active
            ]}
            onPress={() => {
              this.setState({ flow: 'paginated' });
            }}
          >
            翻页
          </Text>
          <Text
            style={[
              styles.bottom_mode_text,
              !paginated && styles.bottom_mode_active
            ]}
            onPress={() => {
              this.setState({ flow: 'scrolled-continuous' });
            }}
          >
            滚动
          </Text>
        </View>
        <View style={styles.bottom_bgc}>
          {backgroundColorMap.map((color, index) => {
            const currentColor = backgroundColor === color.value;
            return (
              <TouchableOpacity
                style={[
                  styles.bottom_bgc_text,
                  {
                    backgroundColor: color.value,
                    borderColor: currentColor ? '#5E94FF' : '#eee'
                  }
                ]}
                key={index}
                onPress={() => {
                  this.setState({ backgroundColor: color.value });
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  _renderNoneScourceTips = () => {
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='阅读器' navigation={this.props.navigation} />
        <View style={common.layout_flex_middle()}>
          <View>
            <Text style={common.h(17, '#999')}>暂无此资源</Text>
          </View>
          <Text style={common.fontColorSize('#99a', 13)}>
            {`
          说明:\n
            资源 epub 文件破解暂时还未全部攻破，故
            资源有限，但是作者会持续更进资源更新。\n
            如果您非常想阅读本书，您可以到作者对应
            仓库留言，作者将会及时更新资源。\n
            如果您对本项目感兴趣，也欢迎大家一起努力
            建立一个免费共享的图书库，方便你我阅读。\n
            感谢您的使用！\n
            `}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { detailInfo } = this.props.navigation.state.params;
    if (detailInfo.epub) return this._renderReadContainer(detailInfo);
    return this._renderNoneScourceTips();
  }
}

const styles = StyleSheet.create({
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    ...common.screenHeight(),
    ...common.screenWidth()
  },

  bar: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  bottom: {
    ...common.screenHeight(156 / 812),
    ...common.screenWidth(),
    ...common.bgc(),
    ...common.shadow(1, variable.$ios_box_shadow_base),
    padding: 14,
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  bottom_bgc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bottom_bgc_text: {
    ...common.border(2, '#eee'),
    height: 28,
    width: 28,
    borderRadius: 14,
    marginVertical: 20
  },
  slider: {
    ...common.screenWidth(267 / 375),
    height: 30
  },
  header: {
    marginTop: 0,
    height: common.isIphoneX() ? 86 : 50,
    paddingTop: common.isIphoneX() ? 30 : 10
  },
  bottom_mode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  bottom_mode_text: {
    textAlign: 'center',
    borderRadius: 4,
    ...common.border(1, '#9c9c9c'),
    ...common.pVerticalHorizontal(4, 10)
  },
  bottom_mode_active: {
    borderColor: '#5E94FF',
    color: '#5E94FF'
  }
});

export default Reading;

/**
 * 页面位置改变 (每个页面调用的函数都会更改，报告当前的CFI)
 * @param {Object} visibleLocation
 * @param {Bolean} visibleLocation.isStart 是否是开始页
 * @param {Object} visibleLocation.start 开始
 * @param {Object} visibleLocation.end 结束
 * @param {String} visibleLocation.end.cfi 结束 cfi `epubcfi(/6/8[id_4]!/4[1T141-4d5c9af37f6c412686499367dff4781e]/10/1:149)`
 * @param {Object} visibleLocation.end.href 结束 章节 href `text00002.html`
 * @param {Object} visibleLocation.end.index 结束 index 章节 `3`
 * @param {Object} visibleLocation.end.displayed 章节信息
 * @param {Object} visibleLocation.end.displayed.page 章节信息 - 对应页 11
 * @param {Object} visibleLocation.end.displayed.total 章节信息 - 对应总页面 165
 */
