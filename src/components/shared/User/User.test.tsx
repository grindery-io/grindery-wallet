import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import User, { UserContext } from "./User";
import { mockedUser } from "./mockedUser";

describe("User", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <User user={mockedUser}>
        <div>Child component</div>
      </User>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });

  it("provides the user context", () => {
    const { getByText } = render(
      <User user={mockedUser}>
        <UserContext.Consumer>
          {(value) => <div>{value?.userName}</div>}
        </UserContext.Consumer>
      </User>
    );

    expect(getByText(mockedUser.userName)).toBeInTheDocument();
  });
});
