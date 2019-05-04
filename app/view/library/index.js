import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';
import Header from '../../components/header/index';

class LibraryView extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title='书城'
          right={<Icon name='search1' style={common.fontSizeColor()} />}
          onLeftPress={() => {
            navigation.navigate('Desk');
          }}
          onRightPress={() => {
            navigation.navigate('Search');
          }}
        />
        <View>
          <Text style={styles.title}>书柜</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  }
});

export default LibraryView;
