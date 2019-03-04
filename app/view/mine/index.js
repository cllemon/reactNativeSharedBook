import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const avator = require('../../assets/images/default_head.png');

class MineView extends Component {
  constructor(props) {
    super(props);
    this.onNavigationTo = this.onNavigationTo.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }
  onNavigationTo() {
    this.props.navigation.navigate('LoginView', {});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_header}>
          <View style={styles.header_title}>
            <Image style={styles.avator} source={avator} />
            {/*<Button onPress={this.onNavigationTo}
                    style={styles.title}
                    title="淮南小柠檬">
            </Button>*/}
            <Text style={styles.title} onPress={this.onNavigationTo}>
              淮南小柠檬
            </Text>
          </View>
          <View style={styles.header_operate}>
            <Text>一些操作</Text>
          </View>
        </View>
        <View style={styles.container_content}>
          <Text style={styles.content_text}>内容区域</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },
  container_header: {
    width: '100%',
    height: 210,
    backgroundColor: '#fff',
    display: 'flex'
  },
  header_title: {
    height: 150,
    backgroundColor: '#ef1381',
    display: 'flex',
    flexDirection: 'row'
  },
  avator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 26,
    marginLeft: 30
  },
  title: {
    fontSize: 16,
    marginTop: 49,
    marginLeft: 20,
    color: '#fff'
  },
  header_operate: {
    marginTop: 10,
    position: 'absolute',
    top: 110,
    height: 110,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 1,
    padding: 20
  },

  container_content: {
    padding: 20,
    height: '100%'
  },
  content_text: {
    marginTop: 50,
    textAlign: 'center'
  }
});

export default MineView;
