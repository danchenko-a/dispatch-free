import React from "react";
import { Provider } from "react-redux";

import "./styles.css";
import createStore from "./reduxStore";
import ReduxContainer from "./ReduxContainer";

export default function ReduxApp() {
  const store = createStore();
  return (
    <Provider store={store}>
      <ReduxContainer />
    </Provider>
  );
}
