import React from "react";
import { Provider } from "react-redux";

import "./styles.css";
import createStore from "./store";
import ReduxContainer from "./ReduxContainer";

export default function App() {
  const store = createStore();
  return (
    <Provider store={store}>
      <ReduxContainer />
    </Provider>
  );
}
