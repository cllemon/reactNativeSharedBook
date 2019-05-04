import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { common, variable } from '../../styles/index';
import Header from '../../components/header/index';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Desk extends Component {
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
        <View>
          <Text> DeskComponent </Text>
          <Button
            title='我的页面'
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}
