import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import View from "./index";

describe("View", () => {
  it("should render correctly when not loading", () => {
    render(<View data={[]} loading={false} />);

    expect(screen.getByText("Loading is done!")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should render correctly when loading", () => {
    render(<View data={[]} loading />);

    expect(screen.getByText("Loading is in process!")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render correctly without data", () => {
    render(<View data={[]} />);

    expect(screen.getByText("empty...")).toBeInTheDocument();
  });

  it("should render correctly with data", () => {
    const data = ["apricot", "banana", "cherry", "durian"];
    render(<View data={data} />);

    data.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should trigger a callback", () => {
    const loadData = jest.fn();
    render(<View loadData={loadData} />);

    fireEvent.click(screen.getByText(/load team members/i));

    expect(loadData).toBeCalledTimes(1);
  });
});
