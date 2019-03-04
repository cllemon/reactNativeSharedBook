import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import constance from '../common/utils/constance';

const SearchPropsType = {
  placeholder: PropTypes.string,
  onPress: PropTypes.any
};

const SearchDefaultProps = {
  placeholder: '请输入搜索内容',
  onPress: () => console.log('Please attach a method to this component')
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Icon name='ios-search' style={styles.search_icon} />
        <Text style={styles.placeholder}>{this.props.placeholder}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: constance.value.windowWidth * 0.85,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  search_icon: {
    fontSize: 30,
    lineHeight: 40,
    width: 30,
    height: 30,
    color: '#9d9d9d',
    marginLeft: 15
  },
  placeholder: {
    fontSize: 15,
    lineHeight: 40,
    color: '#9d9d9d'
  }
});

PropTypes.Search = SearchPropsType;

Search.defaultProps = SearchDefaultProps;
