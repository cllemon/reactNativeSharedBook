import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { Epub, Streamer } from 'epubjs-rn';
import ReadTopBar from './readTopBar';
import ReadNav from './readNav';
import ReadBottomBar from './readBottomBar';
import { themes } from '../../utils/utils';

const ReaderPropsType = {
  location: PropTypes.number,
  ebup: PropTypes.string,
  sliderChange: PropTypes.func
};

/**
 * @param {String} flow [ paginated || scrolled-continuous ] 阅读模式
 * @param {Number} location 阅读进度（上次阅读的位置）
 * @param {String} src ebup渲染资源
 * @param {String} origin Streamer生成的本地源地址（在ebup组件内用来做性能优化）
 */
const ReaderDefaultProps = {
  location: 0,
  ebup: '',
  sliderChange: () => {}
};

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      origin: '',
      src: '',
      toc: [],
      flow: 'paginated',
      showBars: true,
      showNav: false,
      sliderDisabled: false,
      backgroundColor: '#FFFFFF'
    };

    this.streamer = new Streamer();
  }

  async componentWillMount() {
    try {
      const origin = await this.streamer.start();
      const src = await this.streamer.get(this.props.ebup);
      this.setState({ origin, src });
      setTimeout(() => this.toggleBars(), 2000);
    } catch (error) {
      console.log('文件静态服务挂了', error);
    }
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  toggleBars = () => this.setState({ showBars: !this.state.showBars });

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
  onLocationChange = visibleLocation => {
    this.setState({ visibleLocation });
  };

  /**
   * 顶部设置
   */
  onSetting = () => {
    if (this.state.flow === 'paginated') {
      this.setState({ flow: 'scrolled-continuous' });
    } else {
      this.setState({ flow: 'paginated' });
    }
  };

  /**
   * 响应进度条调整
   */
  onSlidingComplete = value => this.props.sliderChange(value.toFixed(6));

  /**
   * 响应目录导航
   */
  onDirectoryNav = loc => this.props.sliderChange(loc);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={!this.state.showBars}
          translucent={true}
          animated={false}
        />
        <Epub
          ref='epub'
          theme='tan'
          location={this.props.location || 0}
          style={styles.reader}
          origin={this.state.origin}
          src={this.state.src}
          themes={themes(this.state.backgroundColor)}
          flow={this.state.flow}
          onReady={book => {
            console.log(book);
            this.setState({
              title: book.package.metadata.title,
              toc: book.navigation.toc
            });
          }}
          onLocationsReady={locations => {
            this.setState({
              sliderDisabled: false,
              total: locations.total
            });
          }}
          onPress={() => this.toggleBars()}
          onLocationChange={this.onLocationChange}
          onLongPress={(cfi, rendition) => {}}
          onViewAdded={index =>
            console.log(`一旦视图添加到屏幕就调用的函数${index}\n`)
          }
          beforeViewRemoved={index =>
            console.log(`在视图从屏幕上删除之前调用的函数${index}\n`)
          }
          onMarkClicked={cfiRange => {}}
          onSelected={(cfiRange, rendition) =>
            rendition.highlight(cfiRange, {})
          }
          onError={message => console.log('EPUBJS-Webview-ERROR', message)}
        />
        <View style={[styles.bar, { top: 0 }]}>
          <ReadTopBar
            title={this.state.title}
            shown={this.state.showBars}
            showDirectory={() => this._nav.show()}
            onSetting={this.onSetting}
          />
        </View>
        <View style={[styles.bar, { bottom: 0 }]}>
          <ReadBottomBar
            shown={this.state.showBars}
            disabled={this.state.sliderDisabled}
            value={
              this.state.visibleLocation
                ? this.state.visibleLocation.start.percentage
                : 0
            }
            onSlidingComplete={this.onSlidingComplete}
          />
        </View>
        <View>
          <ReadNav
            ref={nav => (this._nav = nav)}
            display={this.onDirectoryNav}
            toc={this.state.toc}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C'
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 55
  }
});

export default Reader;

PropTypes.Reader = ReaderPropsType;

Reader.defaultProps = ReaderDefaultProps;
