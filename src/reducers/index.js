import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
