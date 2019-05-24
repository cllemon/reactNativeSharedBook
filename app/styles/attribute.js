/**
 * 常用属性扩展
 */
import variable from './variable';

export default {
  padding: function(top = 0, right = 0, bottom = 0, left = 0) {
    if (arguments.length === 2) {
      return {
        paddingVertical: top,
        paddingHorizontal: right
      };
    }
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left
    };
  },

  margin: function(top = 0, right = 0, bottom = 0, left = 0) {
    if (arguments.length === 2) {
      return {
        marginVertical: top,
        marginHorizontal: right
      };
    }
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left
    };
  },

  mVerticalHorizontal: (vertical = 0, horizontal = 0) => ({
    marginVertical: vertical,
    marginHorizontal: horizontal
  }),

  pVerticalHorizontal: (vertical = 0, horizontal = 0) => ({
    paddingVertical: vertical,
    paddingHorizontal: horizontal
  }),

  flex: (val = 1) => ({
    flex: val
  }),

  bgc: (color = variable.$main_color_white) => ({
    backgroundColor: color
  }),

  h: (
    size = variable.$font_size_large,
    color = variable.$font_color_medium_black
  ) => ({
    fontSize: size,
    fontWeight: 'bold',
    color: color
  }),

  fontColorSize: (
    color = variable.$font_color_regular_light,
    size = variable.$font_size_extra_large
  ) => ({
    fontSize: size,
    color: color
  }),

  border: (w = 1, c = 'rgba(238,238,238,1)', s = 'solid') => ({
    borderWidth: w,
    borderColor: c
    // borderStyle: s
  })
};
