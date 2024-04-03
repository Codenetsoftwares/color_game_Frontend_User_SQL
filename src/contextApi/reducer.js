import strings from "../utils/constant/stringConstant";
import {
  getUserInitialState,
  getUserWalletInitialState,
} from "../utils/getInitiateState";

export const reducer = (state, action) => {
  switch (action.type) {
    case strings.LOG_IN:
      debugger;
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

    case strings.UserWallet:
      
      debugger
      return {
        ...state,
        user: getUserInitialState({
          ...state.user,
          wallet: action.payload,
        }),
      };

    default:
      return state;
  }
};
