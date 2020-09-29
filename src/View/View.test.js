import { render, screen } from "@testing-library/react";

import View from "./index";

describe("View", () => {
  it("should render correctly when not loading", () => {
    render(<View data={[]} loading={false} />);

    expect(screen.getByText("Loading is done!")).toBeInTheDocument();
  });
});
