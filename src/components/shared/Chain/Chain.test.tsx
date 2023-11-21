import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Chain, { ChainContext, ChainType } from "./Chain";
import { mockedChain } from "./mockedChain";
import { CHAINS } from "../../../constants";

describe("Chain", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Chain chain={mockedChain}>
        <div>Child component</div>
      </Chain>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });

  it("provides the chain context", () => {
    const { getByText } = render(
      <Chain chain={mockedChain}>
        <ChainContext.Consumer>
          {(value) => <div>{value?.name}</div>}
        </ChainContext.Consumer>
      </Chain>
    );

    expect(getByText(mockedChain.name)).toBeInTheDocument();
  });

  it("sets the state with the provided chain prop", () => {
    const { getByText } = render(
      <Chain chain={mockedChain}>
        <ChainContext.Consumer>
          {(value) => <div>{value?.name}</div>}
        </ChainContext.Consumer>
      </Chain>
    );

    expect(getByText(mockedChain.name)).toBeInTheDocument();
  });

  it("sets the state with the chain matching the provided id prop", () => {
    const id = "123";
    const { getByText } = render(
      <Chain id={id}>
        <ChainContext.Consumer>
          {(value) => <div>{value?.name}</div>}
        </ChainContext.Consumer>
      </Chain>
    );

    const matchingChain = CHAINS.find((chain: ChainType) => chain.id === id);
    const expectedName = matchingChain ? matchingChain.name : "unknown";

    expect(getByText(expectedName)).toBeInTheDocument();
  });

  it("sets the state with the default chain when id prop is provided but chain prop is not", () => {
    const id = "123";
    const { getByText } = render(
      <Chain id={id}>
        <ChainContext.Consumer>
          {(value) => <div>{value?.name}</div>}
        </ChainContext.Consumer>
      </Chain>
    );

    const defaultChain = {
      id: "000",
      caipId: "000",
      name: "unknown",
      logo: "",
      label: "Unknown",
    };

    expect(getByText(defaultChain.name)).toBeInTheDocument();
  });
});
