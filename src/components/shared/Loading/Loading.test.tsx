import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/testUtils";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Loading />);
  });

  it("applies custom styles", () => {
    const customStyles = { color: "red" };
    const { getByTestId } = renderWithProviders(<Loading sx={customStyles} />);

    expect(getByTestId("loading")).toHaveStyle("color: red");
  });
});
