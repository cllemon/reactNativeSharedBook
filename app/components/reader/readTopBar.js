import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import PropTypes from 'prop-types';

const ReadTopBarPropsType = {
  title: PropTypes.string,
  shown: PropTypes.bool,
  showDirectory: PropTypes.func,
  onSetting: PropTypes.func
};

/**
 * @param {String} title 图书标题
 * @param {Boolean} shown 是否显示
 * @param {Function} showDirectory 显示目录
 * @
 */
const ReadTopBarDefaultProps = {
  title: '加载中...',
  shown: false,
  showDirectory: () => {},
  onSetting: () => {}
};

class ReadTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    };

    this.barsShown = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shown !== this.props.shown) {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const timing = Animated.timing;

    timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 20
    }).start();

    this.barsShown = true;
  }

  hide() {
    const timing = Animated.timing;

    timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 20
    }).start();

    this.barsShown = false;
  }

  render() {
    return (
      <Animated.View style={[styles.header, { opacity: this.state.fadeAnim }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={this.props.showDirectory}
        >
          <Icon name='navicon' size={34} />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={this.props.onSetting}
        >
          <Icon name='gear' size={34} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    flex: 8,
    color: '#000',
    ...Platform.select({
      ios: {
        fontFamily: 'Baskerville'
      },
      android: {
        fontFamily: 'serif'
      }
    })
  },
  header: {
    backgroundColor: '#cdcdcd',
    ...Platform.select({
      ios: {
        paddingTop: 40
      },
      android: {
        paddingTop: 24
      }
    }),
    top: 0,
    ...Platform.select({
      ios: {
        height: 84
      },
      android: {
        height: 74
      }
    }),
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 14
  },
  backButton: {
    width: 34,
    height: 34,
    margin: 20,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  backButtonImage: {
    width: 30,
    height: 30
  }
});

export default ReadTopBar;

PropTypes.ReadTopBar = ReadTopBarPropsType;

ReadTopBar.defaultProps = ReadTopBarDefaultProps;
