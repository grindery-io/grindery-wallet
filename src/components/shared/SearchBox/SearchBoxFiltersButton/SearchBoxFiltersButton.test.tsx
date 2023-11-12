import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SearchBoxFiltersButton from "./SearchBoxFiltersButton";
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

describe("SearchBoxFiltersButton", () => {
  const handleClick = jest.fn();

  afterEach(() => {
    handleClick.mockClear();
  });

  it("renders the button with the correct icon", () => {
    const { getByTestId } = render(
      <SearchBoxFiltersButton
        value=""
        onChange={() => {}}
        handleClick={handleClick}
      />
    );

    expect(getByTestId("search-box-filters-button")).toBeInTheDocument();
    expect(getByTestId("search-box-filters-button")).toContainHTML("<svg");
  });

  it("calls the handleClick function when clicked", () => {
    const { getByTestId } = render(
      <SearchBoxFiltersButton
        value=""
        onChange={() => {}}
        handleClick={handleClick}
      />
    );

    fireEvent.click(getByTestId("search-box-filters-button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays the badge with the correct count when filters are active", () => {
    const { getByTestId, queryByTestId } = render(
      <SearchBoxFiltersButton
        value=""
        onChange={() => {}}
        filters={mockedFilters}
        handleClick={handleClick}
      />
    );

    expect(getByTestId("search-box-filters-badge")).toHaveTextContent("2");
  });

  it("does not display the badge when there are no active filters", () => {
    const { queryByTestId } = render(
      <SearchBoxFiltersButton
        value=""
        onChange={() => {}}
        filters={mockedFilters.map((f) => ({ ...f, isActive: false }))}
        handleClick={handleClick}
      />
    );

    expect(queryByTestId("search-box-filters-badge")).toContainHTML(
      "MuiBadge-invisible"
    );
  });

  it("does not display the badge when hideBadge prop is true", () => {
    const { queryByTestId } = render(
      <SearchBoxFiltersButton
        value=""
        onChange={() => {}}
        filters={mockedFilters.map((f) => ({ ...f, isActive: true }))}
        hideBadge={true}
        handleClick={handleClick}
      />
    );

    expect(queryByTestId("search-box-filters-badge")).toContainHTML(
      "MuiBadge-invisible"
    );
  });
});
