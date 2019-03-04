import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Drawer from '../../components/drawer';

class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  test = () => {
    console.log('关闭');
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={this.test}>
          订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页
          订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页订单页
        </Text>
        <Drawer
          ref='drawer'
          visible={this.state.visible}
          TouchMaskClose={this.test}
        >
          <View style={styles.wraper_content}>
            <TouchableWithoutFeedback
              style={styles.wraper_close}
              onPress={this.test}
            >
              <Text style={styles.wraper_close_title}>关闭</Text>
            </TouchableWithoutFeedback>
          </View>
        </Drawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  },

  wraper_content: {
    flex: 1
  },
  wraper_close: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wraper_close_title: {
    fontSize: 30
  }
});

export default OrderView;
