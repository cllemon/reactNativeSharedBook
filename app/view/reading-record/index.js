import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';

class ReadingRecord extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='阅读总览' navigation={navigation} />
      </View>
    );
  }
}

export default ReadingRecord;
