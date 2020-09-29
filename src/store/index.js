import { createStore as create, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const logger = createLogger({ collapsed: false });

const createStore = () => {
  const middlewares = [thunk, logger];

  return create(reducers, compose(applyMiddleware(...middlewares)));
};

export default createStore;
