import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Slider } from 'react-native';
import { common } from '../../styles/index';
import Header from '../../components/widget/Header';
import Button from '../../components/widget/Button';
import { Epub, Streamer } from 'epubjs-rn';
import { themes } from '../../plugin/utils';
import Icon from 'react-native-vector-icons/AntDesign';

class Reading extends Component {
  constructor(props) {
    super(props);
    this.streamer = new Streamer();
    this.state = {
      detailInfo: {},
      epub: '', // epub 资源
      backgroundColor: '#FFF', // 阅读背景
      location: 0, // 阅读进度（上次阅读的位置）
      origin: '', // Streamer生成的本地源地址（在 epub 组件内用来做性能优化）
      src: '', // epub 渲染资源
      flow: 'paginated', // [ paginated || scrolled-continuous ] 阅读模式
      toc: [], // 目录
      sliderDisabled: true, // 是否禁用滑动
      total: 0, // 总页数
      showBars: false, // 是否显示操作面板
      visibleLocation: {}, // 页面位置改变, 所变动的信息
      fadeValue: new Animated.Value(1)
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
      this.setState({ origin, src, detailInfo, epub: detailInfo.epub });
    } catch (error) {
      console.log('文件静态服务挂了', error);
    }
  }

  show = () => {
    console.log('执行了？');
    const { timing, sequence } = Animated;
    sequence([
      timing(this.state.fadeValue, {
        toValue: 1,
        duration: 20
      })
    ]).start();
    setTimeout(() => {
      sequence([
        timing(this.state.fadeValue, {
          toValue: 0,
          duration: 20
        })
      ]).start();
    }, 2000);
  };

  _renderTopBar = () => {
    return (
      <Animated.View
        style={[styles.bar, { opacity: this.state.fadeValue, top: 0 }]}
      >
        <Header
          navigation={this.props.navigation}
          title='阅读器'
          right={<Icon name='ellipsis1' style={common.fontColorSize()} />}
          // onLeftPress={() => {}}
          onRightPress={() => {}}
        />
      </Animated.View>
    );
  };

  _renderDirectory = () => {
    return <Text>渲染目录</Text>;
  };

  _renderBottomBar = () => {
    const { visibleLocation, sliderDisabled } = this.state;
    const value = visibleLocation.start ? visibleLocation.start.percentage : 0;
    return (
      <Animated.View
        style={[styles.bar, { opacity: this.state.fadeValue, bottom: 0 }]}
      >
        <Slider
          style={{
            height: 30,
            flex: 1,
            marginLeft: 50,
            marginRight: 50
          }}
          disabled={sliderDisabled}
          value={value}
          onSlidingComplete={value =>
            this.setState({ location: value.toFixed(6) })
          }
        />
      </Animated.View>
    );
  };

  _renderReadEpub = () => {
    const { backgroundColor, location, origin, src, flow } = this.state;
    return (
      <Epub
        ref={_ref => (this.EPUB = _ref)}
        style={styles.reader}
        theme='tan'
        themes={themes(backgroundColor)}
        location={location} // 阅读位置
        origin={origin} // 本地源地址
        src={src} // epub 渲染资源
        flow={flow} // 阅读模式
        onReady={book => {
          this.setState({
            toc: book.navigation.toc
          });
          console.log('epub --- onReady:', book);
        }}
        onLocationsReady={locations => {
          this.setState({
            sliderDisabled: false,
            total: locations.total
          });
          console.log('epub --- onLocationsReady:', locations);
        }}
        onPress={() => this.show()}
        onLocationChange={visibleLocation => this.setState({ visibleLocation })}
        onLongPress={(cfi, rendition) =>
          console.log('epub --- onLongPress:', cfi, rendition)
        }
        onViewAdded={index =>
          console.log(
            'epub --- onViewAdded 一旦视图添加到屏幕就调用的函数:',
            index
          )
        }
        beforeViewRemoved={index =>
          console.log(
            'epub --- beforeViewRemoved 在视图从屏幕上删除之前调用的函数:',
            index
          )
        }
        onMarkClicked={cfiRange => {
          console.log('epub --- onMarkClicked:', cfiRange);
        }}
        onSelected={(cfiRange, rendition) => rendition.highlight(cfiRange, {})}
        onError={message => console.log('epub --- onError:', message)}
      />
    );
  };

  _renderReadContainer = () => {
    return (
      <View style={common.flex()}>
        {this._renderReadEpub()}
        {this._renderTopBar()}
        {this._renderBottomBar()}
      </View>
    );
  };

  _renderNoneScourceTips = () => {
    return (
      <View>
        <Header title='阅读器' navigation={this.props.navigation} />
        <Button title='此资源暂时没有，获取资源？' onPress={this.getSource} />
        <View>
          <Text>说明:</Text>
          <Text>
            ① 资源 epub 文件破解暂时还未攻破，故资源无效若您能破解欢迎留言
          </Text>
          <Text>② 您可以通过获取资源去间接获取</Text>
          <Text>③ 也可以留言，等候作者定期更新</Text>
        </View>
      </View>
    );
  };

  render() {
    const { detailInfo } = this.props.navigation.state.params;
    return (
      <View style={[common.flex(), common.bgc()]}>
        {detailInfo.epub
          ? this._renderReadContainer()
          : this._renderNoneScourceTips()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reader: {
    // flex: 1,
    // alignSelf: 'stretch'
    // ...common.screenHeight(),
    // ...common.screenWidth()
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0
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
