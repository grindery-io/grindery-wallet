import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBoxFilters from "./SearchBoxFilters";

const value = "";
const onChange = () => {};

describe("SearchBoxFilters", () => {
  it("opens the filters menu when the filters button is clicked", () => {
    render(<SearchBoxFilters value={value} onChange={onChange} />);
    const filtersButton = screen.getByTestId("search-box-filters-button");
    fireEvent.click(filtersButton);
  });

  it("closes the filters menu when the close button is clicked", () => {
    render(<SearchBoxFilters value={value} onChange={onChange} />);
    const filtersButton = screen.getByTestId("search-box-filters-button");
    fireEvent.click(filtersButton);
    const closeButton = screen.getByTestId("search-box-filters-close-button");
    fireEvent.click(closeButton);
  });
});
