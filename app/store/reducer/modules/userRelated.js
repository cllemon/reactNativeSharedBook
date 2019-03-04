import { GET_USER_INFO } from '../../types/user';

const initialState = {
  type: 'user'
};

const userRelated = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userRelated;
