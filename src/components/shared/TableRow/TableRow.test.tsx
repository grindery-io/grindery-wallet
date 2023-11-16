import "@testing-library/jest-dom";
import TableRow from "./TableRow";
import { render } from "@testing-library/react";

describe("TableRow", () => {
  it("renders label and value", () => {
    const { getByText } = render(<TableRow label="Label" value="Value" />);
    expect(getByText("Label")).toBeInTheDocument();
    expect(getByText("Value")).toBeInTheDocument();
  });

  it("renders icon", () => {
    const { getByTestId } = render(
      <TableRow label="Label" value="Value" icon={<div data-testid="icon" />} />
    );
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onValueClick when value is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <TableRow label="Label" value="Value" onValueClick={handleClick} />
    );
    getByText("Value").click();
    expect(handleClick).toHaveBeenCalled();
  });
});
