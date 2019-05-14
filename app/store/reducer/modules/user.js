import { GET_USER_INFO, SET_GET_USER_INFO_STATE } from '../../types/user';

const initialState = {
  type: 'user',
  loading: false
};

const userRelated = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    case SET_GET_USER_INFO_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userRelated;
