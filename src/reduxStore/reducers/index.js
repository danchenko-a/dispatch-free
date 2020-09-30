import { combineReducers } from "redux";
import { createAction } from "redux-actions";

export const requestData = createAction("REQUEST_DATA");
export const requestSuccess = createAction("REQUEST_SUCCESS");
export const requestFail = createAction("REQUEST_FAIL");

const loading = (state = false, action) => {
  switch (action.type) {
    case String(requestData):
      return true;
    case String(requestSuccess):
    case String(requestFail):
      return false;
    default:
      return state;
  }
};

const data = (state = [], action) => {
  switch (action.type) {
    case String(requestSuccess):
      return action.payload;
    case String(requestFail):
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  data
});
