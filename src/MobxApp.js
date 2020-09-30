import React from "react";
import { Provider } from "mobx-react";

import "./styles.css";
import MobxContainer from "./MobxContainer";
import dataStore from "./mobxStore";

const stores = {
  dataStore,
};

export default function MobxApp() {
  return (
    <Provider {...stores}>
      <MobxContainer />
    </Provider>
  );
}
