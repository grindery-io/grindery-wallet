import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBoxInput from "./SearchBoxInput";

describe("SearchBoxInput", () => {
  const placeholder = "Search...";
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it("renders with a placeholder", () => {
    render(
      <SearchBoxInput value="" placeholder={placeholder} onChange={onChange} />
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("renders with a value", () => {
    const value = "test";
    render(
      <SearchBoxInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const value = "test";
    render(
      <SearchBoxInput value="" placeholder={placeholder} onChange={onChange} />
    );
    const input = screen.getByPlaceholderText(placeholder);
    userEvent.type(input, value);
    expect(onChange).toHaveBeenCalledTimes(value.length);
  });

  it("clears input value when clear button is clicked", () => {
    const value = "test";
    render(
      <SearchBoxInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
    const clearButton = screen.getByLabelText("clear input");
    userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith("");
  });
});
