import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogSelect, { DialogSelectProps } from "./DialogSelect";

const mockedItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const mockedItem = ({ data, index, style }: any) => (
  <div key={data[index].id} style={style}>
    {data[index].name}
  </div>
);

const mockedSearch = {
  value: "",
  onChange: jest.fn(),
};

const mockedProps: DialogSelectProps = {
  open: true,
  onClose: jest.fn(),
  items: mockedItems,
  item: mockedItem,
  itemSize: 50,
  search: mockedSearch,
};

describe("DialogSelect", () => {
  it("renders the dialog with items", () => {
    render(<DialogSelect {...mockedProps} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders the search box", () => {
    render(<DialogSelect {...mockedProps} />);
    expect(screen.getByPlaceholderText("Search token")).toBeInTheDocument();
  });

  it("calls the search onChange function", () => {
    render(<DialogSelect {...mockedProps} />);
    const searchInput = screen.getByPlaceholderText("Search token");
    userEvent.type(searchInput, "Item 1");
    expect(mockedSearch.onChange).toHaveBeenCalledTimes(6);
  });

  it("calls the onClose function when the dialog is closed", async () => {
    render(<DialogSelect {...mockedProps} />);
    fireEvent.keyDown(screen.getByText("Item 1"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    expect(mockedProps.onClose).toHaveBeenCalled();
  });
});
