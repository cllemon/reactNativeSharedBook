import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { common } from '../../styles/index';

const SwiperImagePropsType = {
  list: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number,
  onPress: PropTypes.function
};

const SwiperImageDefaultProps = {
  list: [],
  height: 165,
  width: common.screenWidth()['width'],
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

const DOT_STYLE = {
  height: 3,
  width: 12,
  ...common.bgc('#EEEEEE'),
  borderRadius: 2
};

export default class SwiperImage extends Component {
  render() {
    const { list, height, width, onPress } = this.props;
    return (
      <View style={{ width, height }}>
        <Swiper
          autoplay
          height={165}
          dot={<View style={DOT_STYLE} />}
          activeDot={<View style={[DOT_STYLE, common.bgc('#5E94FF')]} />}
        >
          {list.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  onPress(item);
                }}
              >
                <Image source={{ uri: item.url }} style={{ width, height }} />
              </TouchableOpacity>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

PropTypes.SwiperImage = SwiperImagePropsType;

SwiperImage.defaultProps = SwiperImageDefaultProps;
