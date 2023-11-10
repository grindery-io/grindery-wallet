import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Token, { TokenContext } from "./Token";
import { mockedToken } from "../../../utils/mockedToken";

describe("Token", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Token token={mockedToken}>
        <div>Child component</div>
      </Token>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });

  it("provides the token context", () => {
    const { getByText } = render(
      <Token token={mockedToken}>
        <TokenContext.Consumer>
          {(value) => <div>{value.symbol}</div>}
        </TokenContext.Consumer>
      </Token>
    );

    expect(getByText("G1")).toBeInTheDocument();
  });
});
