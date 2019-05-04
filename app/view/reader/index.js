import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../components/button';
import Reader from '../../components/reader/index';

class ReaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ebup: '',
      location: 0
    };
  }

  /**
   * 这里的文件流系统 - 暂未深知其理
   * 这里还要 - 去探究文件系统 - 先本地下载 - 在生成地址
   */
  async componentWillMount() {
    const { ebup, location } = this.props.navigation.state.params;
    this.setState({ ebup, location });
  }

  getSource = () => {
    // todo...
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.ebup ? (
          <View style={styles.container_none}>
            <Button
              type='primary'
              title='此资源暂时没有，获取资源？'
              size='largest'
              style={styles.container_none_btn}
              onPress={this.getSource}
            />
            <View style={styles.container_none_text}>
              <Text style={styles.container_none_tips}>说明:</Text>
              <Text style={styles.container_none_tips__item}>
                ① 资源ebup文件破解暂时还未攻破，故资源无效若您能破解欢迎留言
              </Text>
              <Text style={styles.container_none_tips__item}>
                ② 您可以通过获取资源去间接获取
              </Text>
              <Text style={styles.container_none_tips__item}>
                ③ 也可以留言，等候作者定期更新
              </Text>
            </View>
          </View>
        ) : (
          <Reader
            ebup={this.state.ebup}
            location={this.state.location}
            sliderChange={location => this.setState({ location })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container_none: {
    flex: 1
  },
  container_none_text: {
    padding: 20
  },
  container_none_btn: {
    paddingTop: 200
  },
  container_none_tips: {
    fontSize: 26,
    color: '#000'
  },
  container_none_tips__item: {
    fontSize: 14,
    color: '#000',
    paddingLeft: 10
  }
});

export default ReaderView;
