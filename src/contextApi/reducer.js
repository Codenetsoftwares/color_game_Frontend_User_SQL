import strings from '../global/constant/stringConstant';
import { getUserInitialState } from '../utils/getInitiateState';

export const reducer = (state, action) => {
  switch (action.type) {
    case strings.LOG_IN:
      return { ...state, user: getUserInitialState(action.payload) };
    case strings.LOG_OUT:
      return {
        ...state,
        user: getUserInitialState({ isLogin: false }),
      };

    case strings.Name:
      return {
        ...state,
        user: action.payload,
      };

    case strings.Announcement:
      return {
        ...state,
        announcement: action.payload,
      };

    default:
      return state;
  }
};
