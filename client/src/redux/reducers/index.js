import { combineReducers } from 'redux';

import usersReducer from './users';
import ordersReducer from './orders';

export default combineReducers({
  usersState: usersReducer,
  ordersState: ordersReducer,
});
