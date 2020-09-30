import React from "react";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";

import ReduxApp from "./ReduxApp";
import MobxApp from "./MobxApp";

jest.mock("./services", () => {
  return {
    fetchData: jest.fn().mockImplementation(() => {
      return Promise.resolve(["apricot", "banana"]);
    }),
  };
});

const integrationTest = (provider, App) => {
  describe(`${provider}App integration`, () => {
    it("should handle successfull data loading", async () => {
      render(<App />);

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
};

integrationTest("Redux", ReduxApp);
integrationTest("Mobx", MobxApp);
