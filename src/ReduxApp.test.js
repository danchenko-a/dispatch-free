import React from "react";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";

import ReduxApp from "./ReduxApp";

jest.mock("./services", () => {
  return {
    fetchData: jest.fn().mockImplementation(() => {
      return Promise.resolve(["apricot", "banana"]);
    }),
  };
});

describe("ReduxApp integration", () => {
  it("should handle successfull data loading", async () => {
    render(<ReduxApp />);

    expect(screen.getByText("Loading is done!")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();

    fireEvent.click(screen.getByText(/load team members/i));

    await waitFor(() => screen.getByText("Loading is done!"), {
      timeout: 3000,
    });

    ["apricot", "banana"].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
