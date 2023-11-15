import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Banner from "./Banner";

describe("Banner", () => {
  it("renders the banner when visible is true", () => {
    render(<Banner visible={true}>Test Banner</Banner>);
    expect(screen.getByText("Test Banner")).toBeInTheDocument();
  });

  it("does not render the banner when visible is false", () => {
    render(<Banner visible={false}>Test Banner</Banner>);
    expect(screen.queryByText("Test Banner")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Banner visible={true} onClose={handleClose}>
        Test Banner
      </Banner>
    );
    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
