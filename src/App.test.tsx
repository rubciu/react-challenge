import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Repos from "../src/components/repos/repos";

const expected = [
  "freeCodeCamp - 🌟 325354 - 🍴 25087",
  "vue - 🌟 184781 - 🍴 28638",
  "react - 🌟 170327 - 🍴 32954",
];
const mockSetSearch = jest.fn();

describe("<App />", () => {
  describe("with repos", () => {
    test("should display a list of repos", async () => {
      const { getAllByTestId } = render(
        <Repos
          search="language:javascript stars:>1600"
          setSearch={mockSetSearch}
        />
      );
      const repos = await waitFor(() =>
        getAllByTestId("repo").map((repo) => repo.textContent)
      );
      expect(repos).toEqual(expected);
    });
  });

  describe("with no repos", () => {
    test("should display no repos found message", async () => {
      const { getByText } = render(
        <Repos search="" setSearch={mockSetSearch} />
      );

      await waitFor(() => {
        expect(
          getByText(/Sorry we couldn't find any repository/i)
        ).toBeInTheDocument();
      });
    });
  });
});
