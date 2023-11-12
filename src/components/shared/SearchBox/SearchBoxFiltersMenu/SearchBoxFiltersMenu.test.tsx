import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBoxFiltersMenu from "./SearchBoxFiltersMenu";
import { Filter } from "../SearchBox";

const mockedFilters: Filter[] = [
  {
    isActive: true,
    key: "1",
    label: "Filter 1",
    value: "",
    type: "checkbox",
    onChange: () => {},
  },
  {
    isActive: false,
    key: "2",
    label: "Filter 2",
    value: "",
    type: "checkbox",
    onChange: () => {},
  },
  {
    isActive: true,
    key: "3",
    label: "Filter 3",
    value: "",
    type: "checkbox",
    onChange: () => {},
  },
];

describe("SearchBoxFiltersMenu", () => {
  it("renders a menu with a list of filters and a close button", () => {
    const handleClose = jest.fn();
    const anchorEl = document.createElement("div");
    const { getByTestId, getAllByRole } = render(
      <SearchBoxFiltersMenu
        placeholder="Placeholder"
        filters={mockedFilters}
        open={true}
        handleClose={handleClose}
        anchorEl={anchorEl}
        value=""
        onChange={() => {}}
      />
    );

    expect(getByTestId("search-box-filters-menu")).toBeInTheDocument();
    expect(getByTestId("search-box-filters-close-button")).toBeInTheDocument();
    expect(getAllByRole("menuitem")).toHaveLength(mockedFilters.length + 1);
  });

  it("calls handleClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    const anchorEl = document.createElement("div");
    render(
      <SearchBoxFiltersMenu
        placeholder="Placeholder"
        filters={mockedFilters}
        open={true}
        handleClose={handleClose}
        anchorEl={anchorEl}
        value=""
        onChange={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId("search-box-filters-close-button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
