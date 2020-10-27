import { combineReducers } from "redux";
import {
  userDetailsReducer,
  userSigninReducer,
  userSignupReducer,
} from "./userReducers";

export default combineReducers({
  userDetailsReducer,
  userSigninReducer,
  userSignupReducer,
});
