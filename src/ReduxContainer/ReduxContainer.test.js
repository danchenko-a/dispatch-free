import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import ReduxContainer from "./index";
import createStore from "../reduxStore";

jest.mock("../View", () => {
  return () => <div>View mock</div>;
});

describe("ReduxContainer", () => {
  it("should render wrapped component", () => {
    render(
      <Provider store={createStore()}>
        <ReduxContainer />
      </Provider>
    );

    expect(screen.getByText(/view mock/i)).toBeInTheDocument();
  });
});
