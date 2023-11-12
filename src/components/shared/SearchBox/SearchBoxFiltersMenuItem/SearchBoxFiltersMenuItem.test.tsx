import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBoxFiltersMenuItem from "./SearchBoxFiltersMenuItem";
import { Filter } from "../SearchBox";

const mockOnChange = jest.fn();

const mockedFilters: Filter[] = [
  {
    isActive: true,
    key: "1",
    label: "Filter 1",
    value: "",
    type: "checkbox",
    onChange: mockOnChange,
  },
  {
    isActive: false,
    key: "2",
    label: "Filter 2",
    value: "",
    type: "radio",
    onChange: mockOnChange,
  },
  {
    isActive: true,
    key: "3",
    label: "Filter 3",
    value: "",
    type: "checkbox",
    onChange: mockOnChange,
  },
];

describe("SearchBoxFiltersMenuItem", () => {
  const filter = mockedFilters[0];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders a checkbox filter", () => {
    render(
      <SearchBoxFiltersMenuItem
        filter={mockedFilters[0]}
        value=""
        onChange={() => {}}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText(mockedFilters[0].label)).toBeInTheDocument();
  });

  it("renders a radio filter", () => {
    render(
      <SearchBoxFiltersMenuItem
        filter={mockedFilters[1]}
        value=""
        onChange={() => {}}
      />
    );
    const radio = screen.getByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(screen.getByText(mockedFilters[1].label)).toBeInTheDocument();
  });

  it("calls the onChange function when checkbox is clicked", () => {
    render(
      <SearchBoxFiltersMenuItem filter={filter} value="" onChange={() => {}} />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(filter.onChange).toHaveBeenCalledTimes(1);
  });

  it("calls the onChange function when radio is clicked", () => {
    render(
      <SearchBoxFiltersMenuItem
        filter={mockedFilters[1]}
        value=""
        onChange={() => {}}
      />
    );
    const radio = screen.getByRole("radio");
    fireEvent.click(radio);
    expect(filter.onChange).toHaveBeenCalledTimes(1);
  });
});
