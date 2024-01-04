import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Order from "./Order";
import { mockedOrder } from "./mockedOrder";

describe("Order", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Order order={mockedOrder}>
        <div>Child component</div>
      </Order>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });
});
