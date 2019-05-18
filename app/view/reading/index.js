import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { common } from '../../styles/index';
import Header from '../../components/widget/Header';
import Button from '../../components/widget/Button';
import ReadContaniner from '../../components/read-container/index';

class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ebup: '',
      location: 0
    };
  }

  componentDidMount() {
    const { ebup } = this.props.navigation.state.params.detailInfo || {};
    this.setState({ ebup });
  }

  _renderNoneScourceTips = () => {
    if (!this.state.ebup) {
      return (
        <View>
          <Header title='阅读器' navigation={this.props.navigation} />
          <Button title='此资源暂时没有，获取资源？' onPress={this.getSource} />
          <View>
            <Text>说明:</Text>
            <Text>
              ① 资源ebup文件破解暂时还未攻破，故资源无效若您能破解欢迎留言
            </Text>
            <Text>② 您可以通过获取资源去间接获取</Text>
            <Text>③ 也可以留言，等候作者定期更新</Text>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={[common.flex(), common.bgc()]}>
        {this._renderNoneScourceTips()}
        {/**
        <Reader
          ebup={this.state.ebup}
          location={this.state.location}
          sliderChange={location => this.setState({ location })}
        />*/}
      </View>
    );
  }
}

export default Reading;
