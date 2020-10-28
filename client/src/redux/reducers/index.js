import { combineReducers } from "redux";
import {
  userDetailsReducer,
  userSigninReducer,
  userSignupReducer,
} from "./userReducers";

export default combineReducers({
  userDetails: userDetailsReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
});
