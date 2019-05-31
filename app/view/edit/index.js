import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../../components/widget/Header';
import Input from '../../components/widget/input/index';
import { common } from '../../styles/index';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ''
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ keywords: navigation.state.params.value });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.edit}>
        <Header title={navigation.state.params.label} navigation={navigation} />
        <View style={styles.edit_input}>
          <Input
            autoFocus
            value={this.state.keywords}
            onChangeText={keywords => this.setState({ keywords })}
            placeholder={`请输入${navigation.state.params.label}`}
            style={{
              minWidth: 200,
              ...common.screenHeight(40 / 812),
              maxWidth: common.screenWidth(0.7)['width']
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  edit: {
    ...common.bgc(),
    flex: 1,
    alignContent: 'center'
  },
  edit_input: {
    ...common.screenWidth(0.9),
    ...common.bgc('#F9F9F9'),
    borderRadius: 4,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 30
  }
});
