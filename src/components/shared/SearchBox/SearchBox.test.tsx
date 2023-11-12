import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders the input field", () => {
    const { getByTestId } = render(
      <SearchBox value={""} onChange={() => {}} />
    );
    expect(getByTestId("search-box-input")).toBeInTheDocument();
  });
});
