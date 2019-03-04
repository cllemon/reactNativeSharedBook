import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const IntroducePropsType = {
  data: PropTypes.object
};

const IntroduceDefaultProps = {
  data: null
};

export default class Introduce extends Component {
  render() {
    const {
      ISBN,
      edition,
      packaging,
      size,
      paper,
      foreign_names,
      pages_number,
      words_number,
      languages,
      content_introduce,
      auther_introduce,
      directory
    } = this.props.data;
    return (
      <View style={styles.introduce}>
        <View style={styles.introduce_card}>
          <View style={styles.introduce_card_item}>
            <Text>ISBN:</Text>
            <Text>{ISBN || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>版次:</Text>
            <Text>{edition || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>包装:</Text>
            <Text>{packaging || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>开本:</Text>
            <Text>{size || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>用纸:</Text>
            <Text>{paper || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>外文名称:</Text>
            <Text>{foreign_names || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>页数</Text>
            <Text>{pages_number || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>字数</Text>
            <Text>{words_number || '-/-'}</Text>
          </View>
          <View style={styles.introduce_card_item}>
            <Text>语言</Text>
            <Text>{languages || '-/-'}</Text>
          </View>
        </View>
        <View style={styles.introduce_content}>
          <View style={styles.introduce_content_item}>
            <View style={styles.content_item_title}>
              <Text>内容简介</Text>
            </View>
            <Text>{content_introduce}</Text>
          </View>

          <View style={styles.introduce_content_item}>
            <View style={styles.content_item_title}>
              <Text>作者简介</Text>
            </View>
            <Text>{auther_introduce}</Text>
          </View>

          {directory && (
            <View style={styles.introduce_content_item}>
              <View style={styles.content_item_title}>
                <Text>目录</Text>
              </View>
              <Text>{directory}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  introduce: {}
});

PropTypes.Introduce = IntroducePropsType;

Introduce.defaultProps = IntroduceDefaultProps;
