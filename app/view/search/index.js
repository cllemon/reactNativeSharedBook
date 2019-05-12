import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/widget/Header';
import { common } from '../../styles/index';
class Search extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.flex(), common.bgc()]}>
        <Header title='搜索' navigation={navigation} />
      </View>
    );
  }
}

export default Search;
