import { combineReducers } from "redux";
import {errorSnackbar} from "./common"
import bookmark from "./bookmark"
import book from "./book"

export default combineReducers({
  errorSnackbar,
  bookmark,
  book,
});
