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

  getClassifications() {
    const list = [
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
        id: 1
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
        id: 2
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
        id: 3
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
        id: 1
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
        id: 2
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
        id: 3
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01ghYscV33C/TnxjtsHAtAAVI0.jpg!s',
        id: 1
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01oPg7ituTp/oxU24Lok7dGmXB.jpg!s',
        id: 2
      },
      {
        url:
          'http://cover.read.duokan.com/mfsv2/download/fdsc3/p01gBJdt6aXg/A3fa52DoLUpzxa.jpg!s',
        id: 3
      }
    ];
    this.setState({ list });
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
                  <Image source={{ uri: item.url }} style={styles.img} />
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
