import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import TitleBar from '../widget/TitleBar';
import { common } from '../../styles';
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
      console.log(list, '一级分类');
    } catch (error) {
      console.log(error);
    }
  }

  onMore = () => {
    this.setState({ showCount: this.state.list.length });
  };

  render() {
    return (
      <View style={styles.classification}>
        <TitleBar title='全部分类' label='更多' onPress={this.onMore} />
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
                  <Image
                    source={{ uri: item.combination_cover }}
                    style={styles.img}
                  />
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
    justifyContent: 'flex-start',
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
        padding: common.screenWidth(0.035)['width']
      }
    })
  },
  img: {
    height: 106,
    width: 106,
    borderRadius: 4
  }
});

PropTypes.Classification = ClassificationPropsType;

Classification.defaultProps = ClassificationDefaultProps;
