import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MobxApp from "./MobxApp";
import ReduxApp from "./ReduxApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Redux</Link>
          </li>
          <li>
            <Link to="/mobx">MobX</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/mobx">
          <MobxApp />
        </Route>
        <Route path="/">
          <ReduxApp />
        </Route>
      </Switch>
    </div>
  </Router>,
  rootElement
);
