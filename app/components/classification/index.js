import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import TitleBar from '../widget/TitleBar';
import { common, variable } from '../../styles';
import { getCategories } from '../../services/library';

const ClassificationPropsType = {
  navigation: PropTypes.object
};

const ClassificationDefaultProps = {
  navigation: {}
};

export default class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showCount: 6
    };
  }

  componentDidMount() {
    this.getClassifications();
  }

  async getClassifications() {
    try {
      const { list } = await getCategories();
      this.setState({ list });
    } catch (error) {
      console.log('拉取一级分类异常', error);
    }
  }

  onMore = () => {
    const { showCount, list } = this.state;
    this.setState({ showCount: showCount > 6 ? 6 : list.length });
  };

  render() {
    return (
      <View style={styles.classification}>
        <TitleBar
          title='全部分类'
          label={this.state.showCount > 6 ? '折叠' : '展开'}
          onPress={this.onMore}
        />
        <View style={styles.content}>
          {this.state.list.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.9}
                key={index}
                onPress={() => {
                  this.props.navigation.navigate('List', {
                    classification: item
                  });
                }}
              >
                {this.state.showCount > index && (
                  <ImageBackground
                    source={{ uri: item.combination_cover }}
                    style={styles.img}
                  >
                    <Text style={styles.img_text}>{item.label}</Text>
                  </ImageBackground>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  classification: {
    flexDirection: 'column'
  },
  content: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  item: {
    ...Platform.select({
      ios: {
        ...common.padding(
          0,
          1,
          common.screenWidth(0.035)['width'],
          common.screenWidth(0.035)['width']
        )
      },
      android: {
        padding: common.screenWidth(10)['width']
      }
    })
  },
  img: {
    ...common.screenHeight(116 / 812),
    ...common.screenWidth(100 / 375),
    ...common.shadow(2, variable.$ios_box_shadow_book),
    borderRadius: 4
  },
  img_text: {
    ...common.h(common.miniSreen ? 10 : 13, '#2C2C2C'),
    marginTop: 10,
    marginLeft: 10
  }
});

PropTypes.Classification = ClassificationPropsType;

Classification.defaultProps = ClassificationDefaultProps;
